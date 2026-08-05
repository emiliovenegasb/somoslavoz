"use client"

import { useMemo, useState } from "react"
import type { EventoAgenda, MinisterioAgenda } from "@/lib/agenda"
import { filterEventos } from "@/lib/agenda"
import { AgendaFilters } from "@/components/agenda-filters"
import { AgendaTimeline } from "@/components/agenda-timeline"

type AgendaPageClientProps = {
  initialEventos: EventoAgenda[]
}

export function AgendaPageClient({ initialEventos }: AgendaPageClientProps) {
  const [ministerio, setMinisterio] = useState<MinisterioAgenda | "Todos">("Todos")

  const eventos = useMemo(() => filterEventos(initialEventos, ministerio), [initialEventos, ministerio])

  return (
    <>
      <div className="mb-10">
        <AgendaFilters value={ministerio} onChange={setMinisterio} />
      </div>
      <AgendaTimeline eventos={eventos} />
    </>
  )
}
