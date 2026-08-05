import type { EventoAgenda } from "@/lib/agenda"
import {
  MINISTERIO_COLORS,
  formatDiaNumero,
  formatDiaSemana,
  formatHoraEvento,
  groupEventosByMonth,
} from "@/lib/agenda"

function TimelineEvent({ evento }: { evento: EventoAgenda }) {
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      <div
        className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-primary bg-background"
        aria-hidden
      />
      <div className="absolute left-[5px] top-4 bottom-0 w-px bg-border last:hidden" aria-hidden />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <span
          className="text-xs font-semibold tracking-widest text-primary uppercase"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {formatDiaSemana(evento.fecha)}
        </span>
        <span
          className="text-2xl font-bold text-foreground leading-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {formatDiaNumero(evento.fecha)}
        </span>
      </div>

      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold mb-2 ${MINISTERIO_COLORS[evento.ministerio]}`}
        >
          {evento.ministerio}
        </span>
        <h3
          className="text-lg font-semibold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {evento.titulo}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatHoraEvento(evento.hora, evento.horaFin)} · {evento.lugar}
        </p>
        {evento.descripcion ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{evento.descripcion}</p>
        ) : null}
      </div>
    </div>
  )
}

export function AgendaTimeline({ eventos }: { eventos: EventoAgenda[] }) {
  const meses = groupEventosByMonth(eventos)

  if (meses.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-muted/40 px-6 py-10 text-center text-muted-foreground">
        No hay actividades programadas para este filtro.
      </p>
    )
  }

  return (
    <div className="space-y-10">
      {meses.map((mes) => (
        <section key={mes.key}>
          <h2
            className="mb-6 text-sm font-semibold tracking-widest text-primary uppercase border-b border-border pb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {mes.label}
          </h2>
          <div className="relative border-l border-border ml-1.5">
            {mes.eventos.map((evento) => (
              <TimelineEvent key={evento.id} evento={evento} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
