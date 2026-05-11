import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const ESCOGIDAS_AGE_RANGE = "18 años en adelante"

const ESCOGIDAS_PARAGRAPHS = [
  "Escogidas es el ministerio de mujeres donde crecemos en comunión, fe y propósito a la luz de la Palabra de Dios.",
  "A través de enseñanza, tiempos de oración y actividades espirituales, acompañamos a cada mujer para fortalecer su identidad en Cristo.",
  "Queremos que cada integrante aprenda a vivir su llamado con amor, madurez y servicio dentro de la iglesia y su entorno."
]

export default function MinisterioEscogidasPage() {
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
                Ministerio de mujeres
              </span>
              <h1
                className="mt-4 mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Escogidas
              </h1>

              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
                  Rango de edad: {ESCOGIDAS_AGE_RANGE}
                </span>
              </div>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {ESCOGIDAS_PARAGRAPHS.map((paragraph) => (
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
                  <li>• Enseñanza bíblica para la vida diaria y el carácter.</li>
                  <li>• Oración y tiempos de crecimiento espiritual en comunidad.</li>
                  <li>• Actividades que fortalecen la unidad y el acompañamiento.</li>
                  <li>• Servicio en la iglesia para vivir el propósito con amor.</li>
                </ul>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/escogidas.webp"
                    alt="Mujeres del ministerio Escogidas en comunidad"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Para mujeres de {ESCOGIDAS_AGE_RANGE}. Un espacio para crecer en fe y
                  compañía.
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

