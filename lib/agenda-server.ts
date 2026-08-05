import { unstable_cache } from "next/cache"
import { isAfter, parseISO, startOfDay } from "date-fns"
import { fetchCalendarFromWebApp } from "@/lib/agenda-apps-script"
import { fetchGoogleCalendarEvents } from "@/lib/agenda-google"
import { buildMockEvents, sortEventos, type EventoAgenda } from "@/lib/agenda"

export type AgendaSource = "mock" | "google" | "fallback"

export type AgendaLoadResult = {
  eventos: EventoAgenda[]
  source: AgendaSource
  error?: string
}

async function loadEventosFromSource(): Promise<AgendaLoadResult> {
  const webappUrl = process.env.GOOGLE_CALENDAR_WEBAPP_URL?.trim()
  const icalUrl = process.env.GOOGLE_CALENDAR_ICAL_URL?.trim()

  if (webappUrl) {
    try {
      const eventos = sortEventos(await fetchCalendarFromWebApp(webappUrl))
      return { eventos, source: "google" }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("No se pudo leer calendario vía Apps Script:", message)
      return { eventos: [], source: "fallback", error: message }
    }
  }

  if (icalUrl) {
    try {
      const eventos = sortEventos(await fetchGoogleCalendarEvents(icalUrl))
      return { eventos, source: "google" }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.error("No se pudo leer Google Calendar iCal:", message)
      return { eventos: [], source: "fallback", error: message }
    }
  }

  if (process.env.AGENDA_USE_MOCK === "true") {
    return { eventos: sortEventos(buildMockEvents()), source: "mock" }
  }

  return {
    eventos: [],
    source: "mock",
    error:
      "Calendario no configurado. Despliega doGet() en Apps Script «Solicitudes» y añade GOOGLE_CALENDAR_WEBAPP_URL en .env.local.",
  }
}

function getCachedAgenda() {
  const cacheKey = [
    process.env.GOOGLE_CALENDAR_WEBAPP_URL ?? "",
    process.env.GOOGLE_CALENDAR_ICAL_URL ?? "",
  ].join("|") || "sin-calendario"

  return unstable_cache(loadEventosFromSource, ["agenda-eventos", cacheKey, "sin-mock", "tz-v3"], {
    revalidate: 300,
  })()
}

export async function getAgendaLoadResult(): Promise<AgendaLoadResult> {
  return getCachedAgenda()
}

export async function getAllEventos(): Promise<EventoAgenda[]> {
  return (await getAgendaLoadResult()).eventos
}

export async function getUpcomingEventos(limit?: number): Promise<EventoAgenda[]> {
  const today = startOfDay(new Date())
  const upcoming = (await getAllEventos()).filter((e) => {
    const eventDay = startOfDay(parseISO(e.fecha))
    return !isAfter(today, eventDay)
  })
  return limit ? upcoming.slice(0, limit) : upcoming
}
