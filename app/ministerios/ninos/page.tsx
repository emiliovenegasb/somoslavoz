import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const KIDS_AGE_RANGE = "4 a 13 años"

const KIDS_PARAGRAPHS = [
  "En el Ministerio de Niños los pequeños aprenden el amor de Dios en un ambiente divertido, seguro y lleno de alegría.",
  "A través de historias bíblicas adaptadas a su edad, descubrimos quién es Jesús y cómo su Palabra guía su vida diaria.",
  "Nuestro propósito es que cada niño crezca en fe, desarrolle hábitos espirituales y viva la comunión con confianza."
]

export default function MinisterioNinosPage() {
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
                Ministerio de niños
              </span>
              <h1
                className="mt-4 mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Niños
              </h1>

              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-[#F97316]/15 px-4 py-2 text-sm font-semibold text-[#F97316]">
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
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/kids-ministry.webp"
                    alt="Ministerio de niños"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Para niños de {KIDS_AGE_RANGE}. Un lugar donde la fe se aprende y se vive.
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

