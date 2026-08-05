import type { EventoAgenda } from "@/lib/agenda"
import { isDestacado, parseMinisterio } from "@/lib/agenda-ministerio"

type RawCalendarEvent = {
  id?: string
  titulo?: string
  title?: string
  fecha?: string
  hora?: string
  horaFin?: string
  lugar?: string
  ministerio?: EventoAgenda["ministerio"]
  descripcion?: string
}

export async function fetchCalendarFromWebApp(webappUrl: string): Promise<EventoAgenda[]> {
  const url = webappUrl.trim()
  if (!url.includes("script.google.com")) {
    throw new Error("GOOGLE_CALENDAR_WEBAPP_URL debe ser una URL de Google Apps Script (/macros/s/.../exec).")
  }

  const response = await fetch(url, {
    headers: { "User-Agent": "SomosLaVoz-Agenda/1.0" },
    next: { revalidate: 900 },
  })

  if (!response.ok) {
    throw new Error(`Apps Script respondió ${response.status}. Verifica que la app web esté desplegada con acceso público.`)
  }

  const data = (await response.json()) as { eventos?: RawCalendarEvent[]; error?: string }
  if (data.error) {
    throw new Error(data.error)
  }
  if (!Array.isArray(data.eventos)) {
    throw new Error("La respuesta del Apps Script no incluye un arreglo «eventos».")
  }

  const eventos = data.eventos
    .map((raw, index) => mapRawEvent(raw, index))
    .filter((evento): evento is EventoAgenda => evento !== null)

  if (eventos.length === 0) {
    throw new Error("El calendario no tiene eventos próximos.")
  }

  return eventos
}

function mapRawEvent(raw: RawCalendarEvent, index: number): EventoAgenda | null {
  const title = (raw.titulo ?? raw.title ?? "").trim()
  const fecha = raw.fecha?.trim()
  const hora = raw.hora?.trim()

  if (!title || !fecha || !hora) return null

  const { ministerio, titulo } = parseMinisterio(title)

  return {
    id: raw.id?.trim() || `webapp-${fecha}-${index}`,
    titulo,
    fecha,
    hora,
    horaFin: raw.horaFin?.trim() || undefined,
    lugar: raw.lugar?.trim() || "Templo Central",
    ministerio: raw.ministerio ?? ministerio,
    descripcion: raw.descripcion?.trim() || undefined,
    destacado: isDestacado(raw.ministerio ?? ministerio),
  }
}
