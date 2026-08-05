import {
  addDays,
  addMonths,
  format,
  nextDay,
  parseISO,
  startOfDay,
  startOfMonth,
} from "date-fns"
import { es } from "date-fns/locale"

export type MinisterioAgenda =
  | "Cultos"
  | "Red de Hombres"
  | "Mujeres"
  | "Jóvenes"
  | "Kids"
  | "Teens"
  | "Especiales"

export type EventoAgenda = {
  id: string
  titulo: string
  fecha: string
  hora: string
  horaFin?: string
  lugar: string
  ministerio: MinisterioAgenda
  destacado?: boolean
  descripcion?: string
}

export const MINISTERIO_FILTERS: Array<MinisterioAgenda | "Todos"> = [
  "Todos",
  "Cultos",
  "Red de Hombres",
  "Mujeres",
  "Jóvenes",
  "Kids",
  "Teens",
  "Especiales",
]

export const MINISTERIO_COLORS: Record<MinisterioAgenda, string> = {
  Cultos: "bg-accent/15 text-accent",
  "Red de Hombres": "bg-[#3B82F6]/15 text-[#3B82F6]",
  Mujeres: "bg-[#EC4899]/15 text-[#EC4899]",
  Jóvenes: "bg-[#7C3AED]/15 text-[#7C3AED]",
  Kids: "bg-[#F97316]/15 text-[#F97316]",
  Teens: "bg-primary/15 text-primary",
  Especiales: "bg-[#B45309]/15 text-[#B45309]",
}

function isoDate(date: Date): string {
  return format(date, "yyyy-MM-dd")
}

/** Genera eventos de ejemplo a partir de hoy (fallback sin calendario configurado). */
export function buildMockEvents(): EventoAgenda[] {
  const today = startOfDay(new Date())
  const wednesday = nextDay(today, 3)
  const saturday = nextDay(today, 6)
  const nextSunday = nextDay(today, 0)

  return [
    {
      id: "1",
      titulo: "Culto de Adoración",
      fecha: isoDate(wednesday),
      hora: "19:30",
      lugar: "Templo Central",
      ministerio: "Cultos",
      destacado: true,
    },
    {
      id: "2",
      titulo: "Red de Jóvenes",
      fecha: isoDate(saturday),
      hora: "18:00",
      lugar: "Templo Central",
      ministerio: "Jóvenes",
    },
    {
      id: "3",
      titulo: "Culto AM",
      fecha: isoDate(nextSunday),
      hora: "10:30",
      lugar: "Templo Central",
      ministerio: "Cultos",
    },
    {
      id: "4",
      titulo: "Culto PM",
      fecha: isoDate(nextSunday),
      hora: "16:30",
      lugar: "Templo Central",
      ministerio: "Cultos",
    },
    {
      id: "5",
      titulo: "Reunión Red de Hombres",
      fecha: isoDate(addDays(today, 10)),
      hora: "19:00",
      lugar: "Templo Central",
      ministerio: "Red de Hombres",
    },
    {
      id: "6",
      titulo: "Escogidas — tiempo de comunión",
      fecha: isoDate(addDays(today, 12)),
      hora: "15:00",
      lugar: "Templo Central",
      ministerio: "Mujeres",
    },
    {
      id: "7",
      titulo: "Actividad especial Kids",
      fecha: isoDate(addDays(today, 14)),
      hora: "11:00",
      lugar: "Templo Central",
      ministerio: "Kids",
    },
    {
      id: "8",
      titulo: "Noche Teens",
      fecha: isoDate(addDays(today, 14)),
      hora: "18:30",
      lugar: "Templo Central",
      ministerio: "Teens",
    },
    {
      id: "9",
      titulo: "Vigilia de oración",
      fecha: isoDate(addDays(today, 21)),
      hora: "22:00",
      lugar: "Templo Central",
      ministerio: "Especiales",
      destacado: true,
    },
    {
      id: "10",
      titulo: "Culto de Adoración",
      fecha: isoDate(addDays(wednesday, 7)),
      hora: "19:30",
      lugar: "Templo Central",
      ministerio: "Cultos",
    },
    {
      id: "11",
      titulo: "Culto dominical",
      fecha: isoDate(addDays(nextSunday, 7)),
      hora: "10:30",
      lugar: "Templo Central",
      ministerio: "Cultos",
    },
  ]
}

export function sortEventos(eventos: EventoAgenda[]): EventoAgenda[] {
  return [...eventos].sort((a, b) => {
    const horaA = a.hora === "Todo el día" ? "00:00" : a.hora
    const horaB = b.hora === "Todo el día" ? "00:00" : b.hora
    const da = parseISO(`${a.fecha}T${horaA}`)
    const db = parseISO(`${b.fecha}T${horaB}`)
    return da.getTime() - db.getTime()
  })
}

export function filterEventos(
  eventos: EventoAgenda[],
  ministerio: MinisterioAgenda | "Todos",
): EventoAgenda[] {
  if (ministerio === "Todos") return eventos
  return eventos.filter((e) => e.ministerio === ministerio)
}

export type MesAgenda = {
  key: string
  label: string
  eventos: EventoAgenda[]
}

export function groupEventosByMonth(eventos: EventoAgenda[]): MesAgenda[] {
  if (eventos.length === 0) return []

  const groups = new Map<string, EventoAgenda[]>()

  for (const evento of eventos) {
    const date = parseISO(evento.fecha)
    const key = format(date, "yyyy-MM")
    const list = groups.get(key) ?? []
    list.push(evento)
    groups.set(key, list)
  }

  return Array.from(groups.entries()).map(([key, items]) => ({
    key,
    label: format(parseISO(`${key}-01`), "MMMM yyyy", { locale: es }).toUpperCase(),
    eventos: items,
  }))
}

export function formatDiaSemana(fecha: string): string {
  return format(parseISO(fecha), "EEEE", { locale: es })
}

export function formatDiaNumero(fecha: string): string {
  return format(parseISO(fecha), "d")
}

export function formatHoraEvento(hora: string, horaFin?: string): string {
  return horaFin ? `${hora} – ${horaFin}` : hora
}

/** Limita la agenda a eventos dentro de los próximos meses. */
export function eventosInVisibleWindow(eventos: EventoAgenda[], monthsAhead = 2): EventoAgenda[] {
  const end = addMonths(startOfMonth(new Date()), monthsAhead + 1)
  return eventos.filter((e) => parseISO(e.fecha) < end)
}
