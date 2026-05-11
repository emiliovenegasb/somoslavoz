import Link from "next/link"
import Image from "next/image"
import { APPLE_STORE_URL, GOOGLE_PLAY_URL } from "@/lib/site"

const APP_SLIDES = [
  "/images/app-slides/slide-1.webp",
  "/images/app-slides/slide-2.webp",
  "/images/app-slides/slide-3.webp",
  "/images/app-slides/slide-4.webp",
  "/images/app-slides/slide-5.webp",
  "/images/app-slides/slide-6.webp",
  "/images/app-slides/slide-7.webp",
  "/images/app-slides/slide-8.webp",
  "/images/app-slides/slide-9.webp",
]
const SLIDE_SECONDS = 3.2
const TOTAL_ANIMATION_SECONDS = APP_SLIDES.length * SLIDE_SECONDS

export function AppDownloadSection() {
  return (
    <section id="app" className="scroll-mt-24 bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm border border-zinc-300/70 bg-neutral-200">
          <div className="relative grid gap-10 px-8 py-12 md:grid-cols-2 md:items-center md:gap-12 md:px-14">
            <div className="mx-auto md:mx-0 md:justify-self-start">
              <div className="relative h-[390px] w-[202px] -rotate-[5deg] rounded-[2.65rem] border-[5px] border-zinc-800/95 bg-zinc-950 p-[5px] shadow-2xl sm:h-[410px] sm:w-[212px]">
                <div className="app-phone-glow absolute inset-0 rounded-[2.45rem]" />
                <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] bg-zinc-950">
                  {/* Dynamic Island */}
                  <div className="absolute left-1/2 top-3 z-10 h-7 w-[5.5rem] -translate-x-1/2 rounded-full bg-black" />

                  <div className="relative h-full w-full bg-[#1b4dbf]">
                    {APP_SLIDES.map((slide, index) => (
                      <div
                        key={slide}
                        className="app-phone-slide absolute inset-0"
                        style={{
                          animationDelay: `${index * SLIDE_SECONDS}s`,
                          animationDuration: `${TOTAL_ANIMATION_SECONDS}s`,
                        }}
                      >
                        <Image
                          src={slide}
                          alt=""
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-black/55" />
                      </div>
                    ))}

                    <div className="absolute inset-0 flex min-h-0 flex-1 flex-col items-center justify-end px-5 pb-11 pt-14 text-center">
                      <div className="mb-5 shrink-0 rounded-full p-[2px] ring-2 ring-white/90">
                        <Image
                          src="/alef-clean.webp"
                          alt="Logo Somos la Voz"
                          width={88}
                          height={88}
                          className="h-[5.5rem] w-[5.5rem] rounded-full object-cover shadow-sm"
                        />
                      </div>
                      <p
                        className="text-[1.2rem] font-semibold uppercase leading-tight tracking-[0.14em] text-white sm:text-[1.32rem]"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                      >
                        Somos la voz
                      </p>
                      <p className="mt-2 max-w-[11rem] font-sans text-[0.58rem] font-medium uppercase leading-snug tracking-[0.38em] text-white/90">
                        Templo central
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto max-w-md md:mx-0">
              <h3
                className="mb-3 text-3xl font-semibold text-zinc-800"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Descarga la App
              </h3>
              <p className="mb-6 text-base leading-relaxed text-zinc-600">
                Mantente conectado con nuestra iglesia: transmisiones, mensajes, recursos y
                novedades en la palma de tu mano.
              </p>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                <Link
                  href={APPLE_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                  aria-label="Descargar en App Store"
                >
                  <Image
                    src="/badge-app-store-clean.webp"
                    alt=""
                    width={638}
                    height={214}
                    className="pointer-events-none h-12 w-auto"
                  />
                </Link>
                <Link
                  href={GOOGLE_PLAY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                  aria-label="Descargar en Google Play"
                >
                  <Image
                    src="/badge-google-play-clean.webp"
                    alt=""
                    width={424}
                    height={141}
                    className="pointer-events-none h-12 w-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
