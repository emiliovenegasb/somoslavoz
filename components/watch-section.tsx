"use client"

import { Headphones, Calendar, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { RecentMessageCardConfig } from "@/lib/site"
import { RADIO_LISTEN_URL } from "@/lib/site"

const thumbnailFrameClass =
  "relative aspect-video rounded-xl overflow-hidden mb-4 block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function isRemoteImageSrc(src: string) {
  return /^https?:\/\//i.test(src)
}

/** URLs externas (p. ej. Cloudinary): `<img>` evita fallos de layout con `fill` + remoto. */
function MessageThumbnail({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className: string
}) {
  if (isRemoteImageSrc(src)) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 size-full ${className}`}
        loading="lazy"
        decoding="async"
      />
    )
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 768px) 100vw, 33vw"
    />
  )
}

export function WatchSection({
  messages,
}: {
  messages: RecentMessageCardConfig[]
}) {
  return (
    <section className="py-20 lg:py-32 bg-background" id="watch">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Programa de radio — Chile para Cristo */}
        <div id="radio" className="scroll-mt-24 rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden bg-foreground">
          <div className="absolute inset-0">
            <Image
              src="/images/chileParaCristo.webp"
              alt="Chile para Cristo — programa de radio"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-foreground/55" aria-hidden />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Headphones className="h-5 w-5 text-accent" aria-hidden />
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Radio
                </span>
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Escucha nuestro programa &quot;Chile para Cristo&quot;
              </h3>
              <p className="text-primary-foreground/85">
                Todos los domingos, 8:00 a 9:00 hrs.
              </p>
            </div>
            {RADIO_LISTEN_URL ? (
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href={RADIO_LISTEN_URL} target="_blank" rel="noopener noreferrer">
                  <Headphones className="mr-2 h-5 w-5" />
                  Escuchar ahora
                </a>
              </Button>
            ) : (
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled>
                <Headphones className="mr-2 h-5 w-5" />
                Escuchar ahora
              </Button>
            )}
          </div>
        </div>

        {/* Recent Messages — ancla #messages (Sermones en footer, Mensajes anteriores en menú) */}
        <div id="messages" className="scroll-mt-24">
          <div className="text-center mb-12">
            <span
              className="text-primary text-sm font-semibold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Cuando quieras
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Mensajes recientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
          {messages.map((message, index) => (
            <div
              key={`${message.thumbnail}-${index}`}
              className="group"
            >
              {/* Thumbnail — enlace al capítulo en YouTube (URLs en .env) */}
              {message.youtubeUrl ? (
                <a
                  href={message.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={thumbnailFrameClass}
                  aria-label={
                    message.title
                      ? `Ver en YouTube: ${message.title}`
                      : "Ver mensaje en YouTube"
                  }
                >
                  <MessageThumbnail
                    src={message.thumbnail}
                    alt=""
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
                      <Play className="h-6 w-6 text-accent-foreground fill-current ml-1" />
                    </div>
                  </div>
                </a>
              ) : (
                <div className={`${thumbnailFrameClass} cursor-default`}>
                  <MessageThumbnail
                    src={message.thumbnail}
                    alt={message.title || "Mensaje reciente"}
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center">
                      <Play className="h-6 w-6 text-accent-foreground fill-current ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {message.title || message.speaker || message.date || message.duration ? (
                <div className="mt-4">
                  {message.title ? (
                    <h3
                      className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {message.title}
                    </h3>
                  ) : null}
                  {message.speaker ? (
                    <p className="text-muted-foreground text-sm mb-2">{message.speaker}</p>
                  ) : null}
                  {message.date || message.duration ? (
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      {message.date ? (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" aria-hidden />
                          {message.date}
                        </span>
                      ) : null}
                      {message.duration ? (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden />
                          {message.duration}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}
