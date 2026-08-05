const AGENDA_TIMEZONE = process.env.AGENDA_TIMEZONE?.trim() || "America/Santiago"

const fechaFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: AGENDA_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
})

const horaFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: AGENDA_TIMEZONE,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
})

/** Fecha del evento en zona horaria de la iglesia (yyyy-MM-dd). */
export function formatFechaAgenda(date: Date): string {
  return fechaFormatter.format(date)
}

/** Hora del evento en zona horaria de la iglesia (HH:mm). */
export function formatHoraAgenda(date: Date): string {
  return horaFormatter.format(date)
}

export function getAgendaTimezone(): string {
  return AGENDA_TIMEZONE
}
