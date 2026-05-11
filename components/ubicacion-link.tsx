"use client"

import * as React from "react"
import { UBICACION_ID } from "@/lib/anchors"

export function scrollToUbicacion() {
  const el = document.getElementById(UBICACION_ID)
  if (!el) return
  el.scrollIntoView({ behavior: "smooth", block: "start" })
}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * Enlace a la ubicación: Next.js App Router a veces no hace scroll con `<Link href="#...">`;
 * aquí forzamos scroll con scrollIntoView.
 * No añadimos `#ubicacion` a la URL para que al refrescar la página no se quede fijo abajo.
 */
export const UbicacionAnchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  function UbicacionAnchor({ className, onClick, children, ...props }, ref) {
    return (
      <a
        ref={ref}
        href={`#${UBICACION_ID}`}
        className={className}
        onClick={(e) => {
          e.preventDefault()
          scrollToUbicacion()
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </a>
    )
  },
)
