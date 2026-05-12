"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import {
  HOME_SCROLL_ANCHOR_KEY,
  HOME_SCROLL_ANCHOR_MINISTRIES,
  HOME_SCROLL_Y_KEY,
} from "@/lib/home-scroll"

function clampScrollY(y: number) {
  if (typeof document === "undefined") return y
  const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  return Math.min(Math.max(0, y), max)
}

function scrollMinistriesIntoView(): boolean {
  const el = document.getElementById("ministries")
  if (!el) return false
  el.scrollIntoView({ behavior: "auto", block: "start" })
  return true
}

function clearMinistriesAnchorAndY() {
  try {
    sessionStorage.removeItem(HOME_SCROLL_ANCHOR_KEY)
    sessionStorage.removeItem(HOME_SCROLL_Y_KEY)
  } catch {
    /* noop */
  }
}

function shouldRestoreMinistriesAnchor() {
  try {
    return sessionStorage.getItem(HOME_SCROLL_ANCHOR_KEY) === HOME_SCROLL_ANCHOR_MINISTRIES
  } catch {
    return false
  }
}

/**
 * En layout raíz: conserva scroll en `/` y al volver desde ministerios lleva a #ministries.
 * No borra la marca del ancla hasta lograr scroll (evita Strict Mode / streaming).
 */
export function HomeScrollRestore() {
  const pathname = usePathname()
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (pathname !== "/") return

    lastScrollY.current = window.scrollY

    const persist = () => {
      try {
        sessionStorage.setItem(HOME_SCROLL_Y_KEY, String(lastScrollY.current))
      } catch {
        /* noop */
      }
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

    if (shouldRestoreMinistriesAnchor()) {
      const tryScroll = () => {
        if (scrollMinistriesIntoView()) {
          clearMinistriesAnchorAndY()
          return true
        }
        return false
      }

      tryScroll()
      requestAnimationFrame(tryScroll)
      requestAnimationFrame(() => requestAnimationFrame(tryScroll))

      const onLoad = () => tryScroll()
      if (document.readyState !== "complete") {
        window.addEventListener("load", onLoad, { once: true })
      }

      const delays = [16, 50, 100, 200, 400, 700, 1100, 1600, 2200, 2800, 3400]
      const timeouts = delays.map((ms) => window.setTimeout(tryScroll, ms))

      const poll = window.setInterval(() => {
        if (tryScroll()) {
          window.clearInterval(poll)
        }
      }, 50)

      const finalId = window.setTimeout(() => {
        window.clearInterval(poll)
        tryScroll()
        clearMinistriesAnchorAndY()
      }, 3600)

      return () => {
        window.removeEventListener("load", onLoad)
        timeouts.forEach(clearTimeout)
        window.clearInterval(poll)
        clearTimeout(finalId)
      }
    }

    const raw = sessionStorage.getItem(HOME_SCROLL_Y_KEY)
    if (raw == null) return

    const parsed = Number.parseInt(raw, 10)
    if (!Number.isFinite(parsed) || parsed < 0) {
      sessionStorage.removeItem(HOME_SCROLL_Y_KEY)
      return
    }

    const apply = () => {
      const y = clampScrollY(parsed)
      window.scrollTo({ top: y, left: 0, behavior: "auto" })
      lastScrollY.current = y
      try {
        sessionStorage.setItem(HOME_SCROLL_Y_KEY, String(y))
      } catch {
        /* noop */
      }
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
      sessionStorage.removeItem(HOME_SCROLL_Y_KEY)
    }, 1300)

    return () => {
      window.removeEventListener("load", onLoad)
      timeouts.forEach(clearTimeout)
      clearTimeout(finalId)
    }
  }, [pathname])

  /** Next puede resetear scroll después del layout; reintenta si el ancla sigue pendiente */
  useEffect(() => {
    if (pathname !== "/") return
    if (!shouldRestoreMinistriesAnchor()) return

    const delays = [0, 100, 250, 500, 1000, 1800, 2600]
    const ids = delays.map((ms) =>
      window.setTimeout(() => {
        if (scrollMinistriesIntoView()) {
          clearMinistriesAnchorAndY()
        }
      }, ms),
    )

    return () => ids.forEach(clearTimeout)
  }, [pathname])

  return null
}
