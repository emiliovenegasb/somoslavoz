"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UbicacionAnchor } from "@/components/ubicacion-link"
import { SOCIAL_YOUTUBE_URL } from "@/lib/site"
import { Play } from "lucide-react"

const VER_EN_VIVO_HREF = SOCIAL_YOUTUBE_URL || "/#radio"
const HERO_IMAGE = "/images/fondo_main.webp"

export function Hero() {
  const [heroLoaded, setHeroLoaded] = useState(false)

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-foreground">
        <Image
          src={HERO_IMAGE}
          alt="Servicio de adoración"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
          className={`object-cover object-[center_30%] sm:object-center transition-opacity duration-700 ease-out ${
            heroLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setHeroLoaded(true)}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/55 to-foreground/85 transition-opacity duration-700 ease-out ${
            heroLoaded ? "opacity-100" : "opacity-90"
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-20 text-center sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/90 sm:mb-4 sm:text-sm sm:tracking-widest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Bienvenidos a Templo Central
        </p>

        <h1
          className="mb-5 text-[1.75rem] font-bold leading-[1.15] text-primary-foreground sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="block">Descubre esperanza.</span>
          <span className="block text-accent">Vive su amor.</span>
        </h1>

        <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:mb-8 sm:text-lg md:text-xl">
          Acompáñanos este domingo y sé parte de una familia donde la fe cobra vida. Tu historia
          importa aquí.
        </p>

        <div className="mx-auto flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
          <Button
            size="lg"
            className="bg-accent px-6 py-5 text-base font-semibold text-accent-foreground hover:bg-accent/90 sm:px-8 sm:py-6 sm:text-lg"
            asChild
          >
            <UbicacionAnchor>Planifica tu visita</UbicacionAnchor>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent px-6 py-5 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:px-8 sm:py-6 sm:text-lg"
            asChild
          >
            <a
              href={VER_EN_VIVO_HREF}
              {...(VER_EN_VIVO_HREF.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Play className="mr-2 h-5 w-5 fill-current" />
              Ver en vivo
            </a>
          </Button>
        </div>

        {/* Service Times Badge */}
        <div className="mx-auto mt-8 flex w-fit max-w-full flex-col items-center justify-center gap-2 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-3 backdrop-blur-sm sm:mt-16 sm:flex-row sm:gap-4 sm:rounded-full sm:px-6">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 shrink-0 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-primary-foreground/90 sm:text-sm">
              Acompáñanos presencialmente o en línea
            </span>
          </div>
          <span className="hidden text-primary-foreground/60 sm:inline">|</span>
          <span className="text-center text-xs font-semibold leading-snug text-primary-foreground sm:text-sm">
            Miércoles 19:30 hrs. y domingo 10:30 hrs.
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 animate-bounce sm:block">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-primary-foreground/30 p-2">
          <div className="h-2 w-1 rounded-full bg-primary-foreground/50" />
        </div>
      </div>
    </section>
  )
}
