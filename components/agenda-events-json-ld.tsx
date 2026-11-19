import { agendaEventsJsonLd } from "@/lib/seo"
import type { EventoAgenda } from "@/lib/agenda"
import { getAgendaLoadResult } from "@/lib/agenda-server"

/** JSON-LD Event solo cuando los eventos vienen del calendario real. */
export async function AgendaEventsJsonLd({ eventos }: { eventos: EventoAgenda[] }) {
  const { source } = await getAgendaLoadResult()
  if (source !== "google" || eventos.length === 0) return null

  const graph = agendaEventsJsonLd(eventos)
  if (graph.length === 0) return null

  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c")

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  )
}
