import ical, { type VEvent } from "node-ical"
import { addMonths, startOfDay, startOfMonth } from "date-fns"
import type { EventoAgenda } from "@/lib/agenda"
import { isDestacado, parseMinisterio } from "@/lib/agenda-ministerio"
import { formatFechaAgenda, formatHoraAgenda, getTodayAgendaDateStr } from "@/lib/agenda-timezone"

function icalText(value: unknown): string {
  if (value == null) return ""
  if (typeof value === "string") return value.trim()
  if (typeof value === "object" && "val" in value) {
    return String((value as { val: unknown }).val).trim()
  }
  return String(value).trim()
}

function toEventoAgenda(
  id: string,
  start: Date,
  end: Date | undefined,
  summary: string,
  location: string,
  description: string,
  isFullDay: boolean,
): EventoAgenda {
  const { ministerio, titulo } = parseMinisterio(summary)

  return {
    id,
    titulo,
    fecha: formatFechaAgenda(start, isFullDay),
    hora: isFullDay ? "Todo el día" : formatHoraAgenda(start),
    horaFin: end && !isFullDay ? formatHoraAgenda(end) : undefined,
    lugar: location || "Templo Central",
    ministerio,
    descripcion: description || undefined,
    destacado: isDestacado(ministerio),
  }
}

function expandEvent(event: VEvent, rangeEnd: Date): Array<{ start: Date; evento: EventoAgenda }> {
  const summary = icalText(event.summary)
  const location = icalText(event.location)
  const description = icalText(event.description)

  if (event.rrule) {
    const todayStr = getTodayAgendaDateStr()
    const instances = ical.expandRecurringEvent(event, {
      from: new Date(`${todayStr}T00:00:00.000Z`),
      to: rangeEnd,
    })

    return instances.map((instance, index) => ({
      start: instance.start,
      evento: toEventoAgenda(
        `${event.uid}-${instance.start.toISOString()}-${index}`,
        instance.start,
        instance.end,
        icalText(instance.summary) || summary,
        location,
        description,
        instance.isFullDay,
      ),
    }))
  }

  const isFullDay = event.datetype === "date"
  const todayStr = getTodayAgendaDateStr()
  const eventDateStr = formatFechaAgenda(event.start, isFullDay)

  if (eventDateStr < todayStr || event.start > rangeEnd) {
    return []
  }

  return [
    {
      start: event.start,
      evento: toEventoAgenda(
        event.uid,
        event.start,
        event.end,
        summary,
        location,
        description,
        isFullDay,
      ),
    },
  ]
}

export async function fetchGoogleCalendarEvents(icalUrl: string): Promise<EventoAgenda[]> {
  const url = icalUrl.trim()
  validateGoogleCalendarIcalUrl(url)

  const response = await fetch(url, {
    headers: { "User-Agent": "SomosLaVoz-Agenda/1.0" },
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    throw new Error(
      `Google Calendar respondió ${response.status}. Verifica la URL iCal y que el calendario permita acceso por enlace.`,
    )
  }

  const ics = await response.text()
  if (!ics.includes("BEGIN:VCALENDAR")) {
    throw new Error("La URL no devolvió un calendario iCal válido.")
  }

  const calendar = ical.sync.parseICS(ics)
  const today = startOfDay(new Date())
  const rangeEnd = addMonths(startOfMonth(today), 4)

  const rows: Array<{ start: Date; evento: EventoAgenda }> = []

  for (const item of Object.values(calendar)) {
    if (!item || item.type !== "VEVENT") continue
    rows.push(...expandEvent(item, rangeEnd))
  }

  if (rows.length === 0) {
    throw new Error("El calendario iCal no tiene eventos próximos en los próximos meses.")
  }

  return rows.sort((a, b) => a.start.getTime() - b.start.getTime()).map((row) => row.evento)
}

export function validateGoogleCalendarIcalUrl(icalUrl: string): void {
  const url = icalUrl.trim()

  if (!url.includes("calendar.google.com/calendar/ical/")) {
    throw new Error("La URL debe ser un enlace iCal de Google Calendar.")
  }

  if (!url.includes("/private-") && !url.includes("/public/")) {
    throw new Error(
      "URL incompleta: copia la URL secreta completa desde Google Calendar → Configuración del calendario → Integrar calendario → «URL secreta en formato iCal». Debe incluir /private-.../ o /public/ antes de basic.ics.",
    )
  }
}
