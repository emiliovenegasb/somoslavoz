"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { persistScrollY, restoreHomeScrollAsync } from "@/lib/home-scroll"

/**
 * En layout raíz: conserva scroll en `/` y al volver desde segmentos
 * (p. ej. /segmentos/kids) restaura #segmentos de forma asíncrona.
 */
export function HomeScrollRestore() {
  const pathname = usePathname()
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (pathname !== "/") return

    const controller = new AbortController()

    void restoreHomeScrollAsync(controller.signal)

    return () => {
      controller.abort()
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== "/") return

    lastScrollY.current = window.scrollY

    const persist = () => {
      persistScrollY(lastScrollY.current)
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

  return null
}
