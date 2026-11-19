"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type FooterFormDialogVariant = "prayer" | "contact"

type FooterFormDialogProps = {
  variant: FooterFormDialogVariant
  className?: string
}

const COPY = {
  prayer: {
    trigger: "Petición de oración",
    title: "Petición de oración",
    description:
      "Comparte tu petición con nosotros. Estaremos orando por ti y tu familia.",
    success: "Tu petición fue enviada correctamente. Estaremos orando por ti.",
    messageLabel: "Tu petición",
    messagePlaceholder: "Escribe aquí tu petición de oración...",
    submit: "Enviar petición",
  },
  contact: {
    trigger: "Contáctanos",
    title: "Contáctanos",
    description:
      "Déjanos tu mensaje y te responderemos a la brevedad.",
    success: "Tu mensaje fue enviado correctamente. Gracias por contactarnos.",
    messageLabel: "Mensaje",
    messagePlaceholder: "¿En qué te podemos ayudar?",
    submit: "Enviar mensaje",
  },
} as const

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? ""

declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string
      remove: (widgetId: string) => void
    }
  }
}

function safeFormError(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback
  const text = value.replace(/[<>]/g, "").trim()
  if (!text || text.length > 180) return fallback
  return text
}

export function FooterFormDialog({ variant, className }: FooterFormDialogProps) {
  const [open, setOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState("")
  const captchaRef = useRef<HTMLDivElement>(null)
  const copy = COPY[variant]

  useEffect(() => {
    if (!open || sent || !TURNSTILE_SITE_KEY) return
    let widgetId = ""
    let cancelled = false

    const render = () => {
      if (cancelled || !captchaRef.current || !window.turnstile || widgetId) return
      widgetId = window.turnstile.render(captchaRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(""),
        "error-callback": () => setCaptchaToken(""),
      })
    }

    const script = document.querySelector<HTMLScriptElement>(
      'script[src*="challenges.cloudflare.com/turnstile"]',
    )
    if (window.turnstile) {
      render()
    } else if (script) {
      script.addEventListener("load", render)
    } else {
      const created = document.createElement("script")
      created.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
      created.async = true
      created.addEventListener("load", render)
      document.head.appendChild(created)
    }

    return () => {
      cancelled = true
      script?.removeEventListener("load", render)
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId)
      setCaptchaToken("")
    }
  }, [open, sent])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get(`${variant}-name`) ?? "").trim(),
      email: String(formData.get(`${variant}-email`) ?? "").trim(),
      phone: String(formData.get(`${variant}-phone`) ?? "").trim(),
      message: String(formData.get(`${variant}-message`) ?? "").trim(),
      captchaToken,
    }

    try {
      const response = await fetch(
        variant === "prayer" ? "/api/prayer-request" : "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      )
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string
        }
        throw new Error(
          safeFormError(
            data.error,
            variant === "prayer"
              ? "No se pudo enviar la petición."
              : "No se pudo enviar el mensaje.",
          ),
        )
      }

      setSent(true)
      form.reset()
    } catch (error) {
      let message: string
      if (error instanceof TypeError && error.message.includes("fetch")) {
        message = "Sin conexión. Comprueba tu red e intenta de nuevo."
      } else {
        const fallback =
          variant === "prayer"
            ? "No se pudo enviar tu petición por ahora. Intenta nuevamente."
            : "No se pudo enviar tu mensaje por ahora. Intenta nuevamente."
        message = error instanceof Error ? error.message : fallback
      }
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) {
      setTimeout(() => {
        setSent(false)
        setErrorMessage("")
        setIsSubmitting(false)
      }, 150)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors text-left",
            className,
          )}
        >
          {copy.trigger}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="rounded-md border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-foreground">
            {copy.success}
          </div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label htmlFor={`${variant}-name`} className="text-sm font-medium">
                Nombre
              </label>
              <Input id={`${variant}-name`} name={`${variant}-name`} required />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={`${variant}-email`} className="text-sm font-medium">
                Correo
              </label>
              <Input id={`${variant}-email`} name={`${variant}-email`} type="email" required />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={`${variant}-phone`} className="text-sm font-medium">
                Teléfono (opcional)
              </label>
              <Input id={`${variant}-phone`} name={`${variant}-phone`} />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={`${variant}-message`} className="text-sm font-medium">
                {copy.messageLabel}
              </label>
              <Textarea
                id={`${variant}-message`}
                name={`${variant}-message`}
                required
                className="min-h-24"
                placeholder={copy.messagePlaceholder}
              />
            </div>
            {TURNSTILE_SITE_KEY ? (
              <div ref={captchaRef} className="min-h-16" />
            ) : null}
            {errorMessage ? (
              <p className="text-sm text-red-500">{errorMessage}</p>
            ) : null}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || (Boolean(TURNSTILE_SITE_KEY) && !captchaToken)}
            >
              {isSubmitting ? "Enviando..." : copy.submit}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
