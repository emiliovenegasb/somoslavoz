import Image from "next/image"
import { Instagram } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { JOVENES_INSTAGRAM_URL } from "@/lib/site"

const YOUNG_ADULTS_AGE_RANGE = "18 años en adelante"

const YOUNG_ADULTS_PARAGRAPHS = [
  "En el segmento Jóvenes buscamos acompañar esta etapa con fundamento bíblico, guía espiritual y propósito para la vida diaria.",
  "Promovemos la construcción de relaciones sanas, el crecimiento en carácter y la participación activa en la iglesia, aprendiendo a servir con amor.",
  "Nuestro deseo es que cada joven afiance su fe, descubra dones y encuentre oportunidades para impactar su entorno con la esperanza de Cristo.",
]

export default function SegmentoJovenesPage() {
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
                Segmento Jóvenes
              </span>
              <h1
                className="mt-4 mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Jóvenes
              </h1>

              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
                  Rango de edad: {YOUNG_ADULTS_AGE_RANGE}
                </span>
              </div>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {YOUNG_ADULTS_PARAGRAPHS.map((paragraph) => (
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
                  <li>• Enseñanza bíblica aplicada a decisiones y desafíos de la vida.</li>
                  <li>• Tiempos de alabanza, oración y edificación mutua.</li>
                  <li>• Mentoría y acompañamiento para fortalecer la vida espiritual.</li>
                  <li>• Servicio en la iglesia para desarrollar dones y pertenencia.</li>
                </ul>
              </div>

              {JOVENES_INSTAGRAM_URL ? (
                <div className="mt-10">
                  <h2
                    className="text-xl font-semibold text-foreground mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Síguenos
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={JOVENES_INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram Jóvenes TC"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ) : null}
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/jovenes.webp"
                    alt="Jóvenes en comunidad"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Jóvenes ({YOUNG_ADULTS_AGE_RANGE}): fe que se vive, propósito que se construye.
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
