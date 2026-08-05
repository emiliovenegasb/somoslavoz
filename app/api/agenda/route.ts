import { NextResponse } from "next/server"
import { eventosInVisibleWindow } from "@/lib/agenda"
import { getAgendaLoadResult, getUpcomingEventos } from "@/lib/agenda-server"

export const revalidate = 300

export async function GET() {
  try {
    const { source, error } = await getAgendaLoadResult()
    const eventos = eventosInVisibleWindow(await getUpcomingEventos())
    return NextResponse.json({ eventos, source, ...(error ? { calendarError: error } : {}) })
  } catch (error) {
    console.error("Error en GET /api/agenda:", error)
    return NextResponse.json({ error: "No se pudo cargar la agenda." }, { status: 500 })
  }
}
