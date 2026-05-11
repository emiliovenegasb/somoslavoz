import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const YOUNG_ADULTS_AGE_RANGE = "18 a 25 años"

const YOUNG_ADULTS_PARAGRAPHS = [
  "En el Ministerio de Jóvenes adultos buscamos acompañar esta etapa con fundamento bíblico, guía espiritual y propósito para la vida diaria.",
  "Promovemos la construcción de relaciones sanas, el crecimiento en carácter y la participación activa en la iglesia, aprendiendo a servir con amor.",
  "Nuestro deseo es que cada joven adulto afiance su fe, descubra dones y encuentre oportunidades para impactar su entorno con la esperanza de Cristo."
]

export default function MinisterioJovenesAdultosPage() {
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
                Ministerio de jóvenes adultos
              </span>
              <h1
                className="mt-4 mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Jóvenes adultos
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
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/jovenes-adultos.webp"
                    alt="Jóvenes adultos en comunidad"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Para jóvenes de {YOUNG_ADULTS_AGE_RANGE}. Fe que se vive, propósito que se construye.
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

