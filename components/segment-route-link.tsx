"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import { markReturnToSegmentosSection } from "@/lib/home-scroll"

/** Enlace a una página de segmento: al volver a inicio se restaura el scroll a #segmentos. */
export function SegmentRouteLink(props: ComponentProps<typeof Link>) {
  const { onClick, ...rest } = props
  return (
    <Link
      {...rest}
      onClick={(e) => {
        if (
          !e.metaKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey &&
          e.button === 0
        ) {
          markReturnToSegmentosSection()
        }
        onClick?.(e)
      }}
    />
  )
}
