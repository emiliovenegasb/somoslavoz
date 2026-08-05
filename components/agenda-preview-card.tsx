import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import type { EventoAgenda } from "@/lib/agenda"
import {
  MINISTERIO_COLORS,
  formatDiaNumero,
  formatHoraEvento,
} from "@/lib/agenda"

function formatDiaCorto(fecha: string): string {
  return format(parseISO(fecha), "EEE", { locale: es }).toUpperCase()
}

export function AgendaPreviewCard({ evento }: { evento: EventoAgenda }) {
  return (
    <article className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-muted px-3 py-2 min-w-[4rem]">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
          {formatDiaCorto(evento.fecha)}
        </span>
        <span
          className="text-2xl font-bold text-foreground leading-none"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {formatDiaNumero(evento.fecha)}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold mb-1.5 ${MINISTERIO_COLORS[evento.ministerio]}`}
        >
          {evento.ministerio}
        </span>
        <h3 className="font-semibold text-foreground truncate" style={{ fontFamily: "var(--font-heading)" }}>
          {evento.titulo}
        </h3>
        <p className="text-sm text-muted-foreground">
          {formatHoraEvento(evento.hora, evento.horaFin)} · {evento.lugar}
        </p>
      </div>
    </article>
  )
}
