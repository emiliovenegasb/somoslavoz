"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UbicacionAnchor } from "@/components/ubicacion-link"
import { SOCIAL_YOUTUBE_URL } from "@/lib/site"
import { Play } from "lucide-react"

const VER_EN_VIVO_HREF = SOCIAL_YOUTUBE_URL || "/#radio"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-worship.webp"
          alt="Servicio de adoración"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center pt-24">
        <p className="text-primary/80 text-sm sm:text-base font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
          Bienvenidos a Templo Central
        </p>
        
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight text-balance"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Descubre esperanza.<br />
          <span className="text-accent">Vive su amor.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
          Acompáñanos este domingo y sé parte de una comunidad donde la fe cobra vida.
          Tu historia importa aquí.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg font-semibold"
            asChild
          >
            <UbicacionAnchor>Planifica tu visita</UbicacionAnchor>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground px-8 py-6 text-lg"
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
        <div className="mt-16 inline-flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-6 py-3 border border-primary-foreground/20">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-primary-foreground/90 text-sm font-medium">Acompáñanos presencialmente o en línea</span>
          </div>
          <span className="text-primary-foreground/60">|</span>
          <span className="text-primary-foreground text-sm font-semibold">Miércoles 19:30 y domingo 10:30 AM</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-primary-foreground/50" />
        </div>
      </div>
    </section>
  )
}
