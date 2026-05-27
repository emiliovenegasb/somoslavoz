/** Scroll al volver a inicio desde páginas de segmento */

export const HOME_SCROLL_Y_KEY = "somoslavoz:home-scroll-y"

export const HOME_SCROLL_ANCHOR_KEY = "somoslavoz:home-scroll-anchor"

export const HOME_SCROLL_ANCHOR_SEGMENTOS = "segmentos"

export const SEGMENTOS_SECTION_ID = "segmentos"

/** @deprecated Compatibilidad con sesiones guardadas antes del cambio a segmentos */
export const HOME_SCROLL_ANCHOR_MINISTRIES = "ministries"

export function markReturnToSegmentosSection() {
  try {
    if (typeof window === "undefined") return
    sessionStorage.setItem(HOME_SCROLL_ANCHOR_KEY, HOME_SCROLL_ANCHOR_SEGMENTOS)
  } catch {
    /* private mode / quota */
  }
}

/** @deprecated Usar markReturnToSegmentosSection */
export const markReturnToMinistriesSection = markReturnToSegmentosSection

function clampScrollY(y: number) {
  if (typeof document === "undefined") return y
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  return Math.min(Math.max(0, y), max)
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function nextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve())
  })
}

export function shouldRestoreSegmentosAnchor() {
  try {
    const anchor = sessionStorage.getItem(HOME_SCROLL_ANCHOR_KEY)
    return (
      anchor === HOME_SCROLL_ANCHOR_SEGMENTOS ||
      anchor === HOME_SCROLL_ANCHOR_MINISTRIES
    )
  } catch {
    return false
  }
}

export function clearSegmentosScrollState() {
  try {
    sessionStorage.removeItem(HOME_SCROLL_ANCHOR_KEY)
    sessionStorage.removeItem(HOME_SCROLL_Y_KEY)
  } catch {
    /* noop */
  }
}

export function readSavedScrollY(): number | null {
  try {
    const raw = sessionStorage.getItem(HOME_SCROLL_Y_KEY)
    if (raw == null) return null

    const parsed = Number.parseInt(raw, 10)
    if (!Number.isFinite(parsed) || parsed < 0) {
      sessionStorage.removeItem(HOME_SCROLL_Y_KEY)
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function persistScrollY(y: number) {
  try {
    sessionStorage.setItem(HOME_SCROLL_Y_KEY, String(clampScrollY(y)))
  } catch {
    /* noop */
  }
}

type AsyncScrollOptions = {
  signal?: AbortSignal
  maxAttempts?: number
  intervalMs?: number
}

/** Espera a que exista #segmentos y hace scroll de forma asíncrona. */
export async function scrollSegmentosIntoViewAsync(
  options: AsyncScrollOptions = {},
): Promise<boolean> {
  const { signal, maxAttempts = 48, intervalMs = 50 } = options

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (signal?.aborted) return false

    await nextFrame()
    if (signal?.aborted) return false

    const el = document.getElementById(SEGMENTOS_SECTION_ID)
    if (el) {
      el.scrollIntoView({ behavior: "auto", block: "start" })
      return true
    }

    if (attempt < maxAttempts - 1) {
      await sleep(intervalMs)
    }
  }

  return false
}

/** Restaura scroll Y guardado, reintentando hasta que el layout esté listo. */
export async function restoreScrollYAsync(
  y: number,
  options: AsyncScrollOptions = {},
): Promise<boolean> {
  const { signal, maxAttempts = 24, intervalMs = 50 } = options
  const targetY = clampScrollY(y)

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (signal?.aborted) return false

    await nextFrame()
    if (signal?.aborted) return false

    window.scrollTo({ top: targetY, left: 0, behavior: "auto" })

    if (Math.abs(window.scrollY - targetY) <= 2) {
      persistScrollY(targetY)
      sessionStorage.removeItem(HOME_SCROLL_Y_KEY)
      return true
    }

    if (attempt < maxAttempts - 1) {
      await sleep(intervalMs)
    }
  }

  persistScrollY(targetY)
  sessionStorage.removeItem(HOME_SCROLL_Y_KEY)
  return false
}

/** Restaura scroll al volver a `/`: ancla de segmentos o posición guardada. */
export async function restoreHomeScrollAsync(signal?: AbortSignal): Promise<void> {
  await nextFrame()
  if (signal?.aborted) return

  if (shouldRestoreSegmentosAnchor()) {
    const scrolled = await scrollSegmentosIntoViewAsync({ signal })
    if (signal?.aborted) return

    if (scrolled) {
      clearSegmentosScrollState()
      return
    }

    if (document.readyState !== "complete") {
      await new Promise<void>((resolve) => {
        const onLoad = () => {
          window.removeEventListener("load", onLoad)
          resolve()
        }
        window.addEventListener("load", onLoad, { once: true })
      })
    }

    if (signal?.aborted) return

    if (await scrollSegmentosIntoViewAsync({ signal, maxAttempts: 20 })) {
      clearSegmentosScrollState()
    } else {
      clearSegmentosScrollState()
    }
    return
  }

  const savedY = readSavedScrollY()
  if (savedY == null) return

  await restoreScrollYAsync(savedY, { signal })
}
