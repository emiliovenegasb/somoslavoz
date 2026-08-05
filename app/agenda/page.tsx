import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AgendaPageClient } from "@/components/agenda-page-client"
import { eventosInVisibleWindow } from "@/lib/agenda"
import { getAgendaLoadResult, getUpcomingEventos } from "@/lib/agenda-server"

export const revalidate = 900

export default async function AgendaPage() {
  const { source, error } = await getAgendaLoadResult()
  const initialEventos = eventosInVisibleWindow(await getUpcomingEventos())
  const showCalendarNotice = source === "mock" || source === "fallback"
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-20 lg:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <span
            className="text-primary text-sm font-semibold tracking-widest uppercase"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Actividades
          </span>
          <h1
            className="mt-4 mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Agenda
          </h1>
          <p className="mb-10 text-base leading-relaxed text-muted-foreground">
            Próximas actividades en Templo Central. Filtra por ministerio para encontrar lo que te
            interesa.
          </p>

          {showCalendarNotice ? (
            <p className="mb-8 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-950 dark:text-amber-100">
              {source === "mock"
                ? "El calendario de Google aún no está conectado a la web."
                : "No pudimos cargar el calendario de Google en este momento."}
              {error ? (
                <span className="mt-2 block text-xs opacity-80">{error}</span>
              ) : null}
            </p>
          ) : null}

          <AgendaPageClient initialEventos={initialEventos} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
