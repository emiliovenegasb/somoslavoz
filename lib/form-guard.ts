import { NextResponse } from "next/server"
import { appendLeadToGoogleSheet, isGoogleSheetWebhookConfigured } from "@/lib/append-lead-to-sheet"
import { parseLeadFromJson, type LeadFormKind } from "@/lib/lead-form"

const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 8
const attempts = new Map<string, number[]>()

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown"
}

function withinLimit(key: string): boolean {
  const now = Date.now()
  const recent = (attempts.get(key) ?? []).filter((time) => now - time < WINDOW_MS)
  if (recent.length >= MAX_ATTEMPTS) {
    attempts.set(key, recent)
    return false
  }
  recent.push(now)
  attempts.set(key, recent)
  return true
}

async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim()
  if (!secret) return process.env.NODE_ENV !== "production"
  if (typeof token !== "string" || token.length < 10 || token.length > 2048) return false

  const body = new URLSearchParams({ secret, response: token })
  if (ip !== "unknown") body.set("remoteip", ip)

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  })
  if (!response.ok) return false
  const data = (await response.json()) as { success?: boolean }
  return data.success === true
}

export async function handleLeadPost(request: Request, kind: LeadFormKind) {
  const ip = clientIp(request)
  if (!withinLimit(`${kind}:${ip}`)) {
    return NextResponse.json(
      { error: "Demasiados envíos. Espera unos minutos e intenta de nuevo." },
      { status: 429 },
    )
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0)
  if (contentLength > 12_000) {
    return NextResponse.json({ error: "El mensaje es demasiado largo." }, { status: 413 })
  }

  let body: Record<string, unknown>
  try {
    const parsed = (await request.json()) as unknown
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "No se pudo leer el formulario." }, { status: 400 })
    }
    body = parsed as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "No se pudo leer el formulario." }, { status: 400 })
  }

  const lead = parseLeadFromJson(body)
  if (!lead.ok) {
    return NextResponse.json({ error: lead.error }, { status: 400 })
  }

  const captchaOk = await verifyTurnstile(body.captchaToken, ip)
  if (!captchaOk) {
    const secret = process.env.TURNSTILE_SECRET_KEY?.trim()
    return NextResponse.json(
      {
        error: secret
          ? "Confirma que no eres un robot e intenta de nuevo."
          : "El formulario no está disponible por ahora.",
      },
      { status: secret ? 400 : 503 },
    )
  }

  if (!isGoogleSheetWebhookConfigured()) {
    return NextResponse.json(
      { error: "El formulario no está disponible por ahora." },
      { status: 503 },
    )
  }

  try {
    await appendLeadToGoogleSheet({ type: kind, ...lead.lead })
  } catch (error) {
    console.error(`Error guardando formulario ${kind}:`, error)
    return NextResponse.json(
      { error: "No se pudo enviar por ahora. Intenta nuevamente." },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
