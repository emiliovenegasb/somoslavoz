import Image from "next/image"
import { Facebook, Instagram, Youtube } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  KIDS_MINISTRY_FACEBOOK_URL,
  KIDS_MINISTRY_INSTAGRAM_URL,
  KIDS_MINISTRY_YOUTUBE_URL,
} from "@/lib/site"

const KIDS_AGE_RANGE = "4 a 12 años"

const KIDS_PARAGRAPHS = [
  "En el segmento Kids, los pequeños aprenden el amor de Dios en un ambiente divertido, seguro y lleno de alegría.",
  "A través de historias bíblicas adaptadas a su edad, descubrimos quién es Jesús y cómo su palabra guía su vida diaria.",
  "Nuestro propósito es que cada niño crezca en fe, desarrolle hábitos espirituales y viva en comunión con confianza.",
]

const KIDS_SOCIAL_LINKS = [
  { icon: Instagram, label: "Instagram Kids TC", href: KIDS_MINISTRY_INSTAGRAM_URL },
  { icon: Facebook, label: "Facebook Kids TC", href: KIDS_MINISTRY_FACEBOOK_URL },
  { icon: Youtube, label: "YouTube Kids TC", href: KIDS_MINISTRY_YOUTUBE_URL },
].filter((item) => item.href.length > 0)

export default function SegmentoKidsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-28 pb-20 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <article>
              <span
                className="text-primary text-sm font-semibold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Segmento Kids
              </span>
              <h1
                className="mt-4 mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Kids
              </h1>

              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
                  Rango de edad: {KIDS_AGE_RANGE}
                </span>
              </div>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {KIDS_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10">
                <h2
                  className="text-xl font-semibold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  ¿Qué hacemos?
                </h2>
                <ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
                  <li>• Enseñanza bíblica con actividades acordes a su edad.</li>
                  <li>• Momentos de alabanza y oración en un ambiente de confianza.</li>
                  <li>• Manualidades, juegos y aprendizaje práctico.</li>
                  <li>• Acompañamiento para que conozcan a Jesús y crezcan en comunidad.</li>
                </ul>
              </div>

              {KIDS_SOCIAL_LINKS.length > 0 ? (
                <div className="mt-10">
                  <h2
                    className="text-xl font-semibold text-foreground mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Síguenos
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    {KIDS_SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/kids.webp"
                    alt="Segmento Kids"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Kids ({KIDS_AGE_RANGE}): un lugar donde la fe se aprende y se vive.
                </figcaption>
              </figure>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
