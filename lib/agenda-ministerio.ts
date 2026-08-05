import type { MinisterioAgenda } from "@/lib/agenda"

const MINISTERIO_PREFIX = /^\[([^\]]+)\]\s*/i

const MINISTERIO_ALIASES: Record<string, MinisterioAgenda> = {
  cultos: "Cultos",
  "red de hombres": "Red de Hombres",
  hombres: "Red de Hombres",
  mujeres: "Mujeres",
  escogidas: "Mujeres",
  jóvenes: "Jóvenes",
  jovenes: "Jóvenes",
  kids: "Kids",
  niños: "Kids",
  ninos: "Kids",
  teens: "Teens",
  especiales: "Especiales",
  especial: "Especiales",
}

function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
}

export function inferMinisterioFromTitle(title: string): MinisterioAgenda {
  const t = normalizeForMatch(title)

  if (/\bred de hombres\b|\bhombres presencial\b|\bhombres online\b/.test(t)) {
    return "Red de Hombres"
  }
  if (/\bescogidas\b|\bmujeres\b/.test(t)) return "Mujeres"
  if (/\bjovenes\b|\bred de jovenes\b|\bnuevas generaciones\b/.test(t)) return "Jóvenes"
  if (/\bteens\b/.test(t)) return "Teens"
  if (/\bkids\b|\bninos\b/.test(t)) return "Kids"
  if (
    /\bculto\b|\badoracion\b|\bcelebracion\b|\balabanza\b|\bdomingo\b|\bmiercoles de formacion\b|\bformacion\b/.test(
      t,
    )
  ) {
    return "Cultos"
  }
  if (/\bvigilia\b|\boracion\b|\bfocus\b|\bespecial\b/.test(t)) return "Especiales"

  return "Especiales"
}

export function parseMinisterio(summary: string): { ministerio: MinisterioAgenda; titulo: string } {
  const match = summary.match(MINISTERIO_PREFIX)
  if (match) {
    const key = match[1].toLowerCase().trim()
    const ministerio = MINISTERIO_ALIASES[key] ?? inferMinisterioFromTitle(summary)
    const titulo = summary.replace(MINISTERIO_PREFIX, "").trim()
    return { ministerio, titulo: titulo || summary }
  }

  return { ministerio: inferMinisterioFromTitle(summary), titulo: summary }
}

export function isDestacado(ministerio: MinisterioAgenda): boolean {
  return ministerio === "Cultos" || ministerio === "Especiales"
}
