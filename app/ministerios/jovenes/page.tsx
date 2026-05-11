import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const YOUTH_AGE_RANGE = "14 a 17 años"

const YOUTH_PARAGRAPHS = [
  "En el Ministerio de Jóvenes fortalecemos la fe con enseñanzas bíblicas, tiempos de alabanza y actividades que ayudan a los jóvenes a crecer con propósito.",
  "Acompañamos el proceso espiritual en cada etapa: aprendemos a tomar decisiones con base en la Palabra de Dios y a construir amistades sanas en comunidad.",
  "Nuestro objetivo es que cada joven conozca a Jesús, desarrolle una relación personal con Él y descubra cómo servir en la iglesia."
]

export default function MinisterioJovenesPage() {
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
                Ministerio juvenil
              </span>
              <h1
                className="mt-4 mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Jóvenes
              </h1>

              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
                  Rango de edad: {YOUTH_AGE_RANGE}
                </span>
              </div>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {YOUTH_PARAGRAPHS.map((paragraph) => (
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
                  <li>• Predicación y enseñanza bíblica enfocada en su etapa.</li>
                  <li>• Momentos de alabanza, oración y conversación guiada.</li>
                  <li>• Actividades que promueven compañerismo y crecimiento personal.</li>
                  <li>• Oportunidades para servir y generar impacto en su comunidad.</li>
                </ul>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/youth-ministry.webp"
                    alt="Ministerio juvenil"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Para jóvenes de {YOUTH_AGE_RANGE}. Crecemos en fe, aprendemos a servir y
                  caminamos juntos.
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

