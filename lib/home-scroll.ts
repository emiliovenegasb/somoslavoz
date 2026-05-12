/** Scroll al volver a inicio desde páginas de ministerio */

export const HOME_SCROLL_Y_KEY = "somoslavoz:home-scroll-y"

export const HOME_SCROLL_ANCHOR_KEY = "somoslavoz:home-scroll-anchor"

export const HOME_SCROLL_ANCHOR_MINISTRIES = "ministries"

export function markReturnToMinistriesSection() {
  try {
    if (typeof window === "undefined") return
    sessionStorage.setItem(HOME_SCROLL_ANCHOR_KEY, HOME_SCROLL_ANCHOR_MINISTRIES)
  } catch {
    /* private mode / quota */
  }
}
