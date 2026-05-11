"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const STORAGE_KEY = "somoslavoz:home-scroll-y"

function clampScrollY(y: number) {
  if (typeof document === "undefined") return y
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  return Math.min(Math.max(0, y), max)
}

/**
 * Guarda el scroll mientras estás en `/` (ref + sessionStorage en cada scroll).
 * Así no perdemos la posición si Next pone scroll=0 justo antes de desmontar.
 * Al volver a `/` restaura con varios reintentos (layout / imágenes).
 */
export function HomeScrollRestore() {
  const pathname = usePathname()
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (pathname !== "/") return

    lastScrollY.current = window.scrollY

    const persist = () => {
      sessionStorage.setItem(STORAGE_KEY, String(lastScrollY.current))
    }

    const onScroll = () => {
      lastScrollY.current = window.scrollY
      persist()
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      persist()
    }
  }, [pathname])

  useLayoutEffect(() => {
    if (pathname !== "/") return

    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw == null) return

    const parsed = Number.parseInt(raw, 10)
    if (!Number.isFinite(parsed) || parsed < 0) {
      sessionStorage.removeItem(STORAGE_KEY)
      return
    }

    const apply = () => {
      const y = clampScrollY(parsed)
      window.scrollTo({ top: y, left: 0, behavior: "auto" })
      lastScrollY.current = y
      sessionStorage.setItem(STORAGE_KEY, String(y))
    }

    apply()
    requestAnimationFrame(() => apply())
    requestAnimationFrame(() => requestAnimationFrame(() => apply()))

    const onLoad = () => apply()
    if (document.readyState === "complete") {
      apply()
    } else {
      window.addEventListener("load", onLoad, { once: true })
    }

    const delays = [50, 150, 300, 600, 1200]
    const timeouts = delays.map((ms) => window.setTimeout(apply, ms))
    const finalId = window.setTimeout(() => {
      apply()
      sessionStorage.removeItem(STORAGE_KEY)
    }, 1300)

    return () => {
      window.removeEventListener("load", onLoad)
      timeouts.forEach(clearTimeout)
      clearTimeout(finalId)
    }
  }, [pathname])

  return null
}
