"use client"

import Link from "next/link"
import type { ComponentProps } from "react"
import { markReturnToMinistriesSection } from "@/lib/home-scroll"

/** Enlace a una página de ministerio: al volver a inicio se restaura el scroll a #ministries. */
export function MinistryRouteLink(props: ComponentProps<typeof Link>) {
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
          markReturnToMinistriesSection()
        }
        onClick?.(e)
      }}
    />
  )
}
