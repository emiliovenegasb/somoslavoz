import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AgendaPreviewCard } from "@/components/agenda-preview-card"
import { getUpcomingEventos } from "@/lib/agenda-server"

export async function ThisWeekSection() {
  const eventos = await getUpcomingEventos(4)

  if (eventos.length === 0) return null

  return (
    <section className="py-16 lg:py-24 bg-muted/40" id="agenda">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span
              className="text-primary text-sm font-semibold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Agenda
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold text-foreground mt-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Esta semana en Templo Central
            </h2>
          </div>
          <Button variant="outline" className="shrink-0" asChild>
            <Link href="/agenda" className="inline-flex items-center gap-2">
              Ver agenda completa
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {eventos.map((evento) => (
            <AgendaPreviewCard key={evento.id} evento={evento} />
          ))}
        </div>
      </div>
    </section>
  )
}
