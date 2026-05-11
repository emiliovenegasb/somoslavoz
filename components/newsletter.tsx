"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, CheckCircle2 } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
    }
  }

  return (
    <section className="py-20 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-6">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            
            <h2 
              className="text-2xl sm:text-3xl font-bold text-foreground mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mantente en contacto
            </h2>
            <p className="text-muted-foreground mb-8">
              Recibe inspiración semanal, novedades de eventos y mensajes de ánimo en tu correo.
            </p>

            {isSubmitted ? (
              <div className="flex items-center justify-center gap-3 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
                <span className="font-semibold">¡Gracias por suscribirte!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Suscribirme
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
