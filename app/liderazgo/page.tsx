import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const BIO_PARAGRAPHS = [
  "Con más de 40 años sirviendo al Señor, el Pastor Juan León ha dedicado su vida al ministerio, acompañando, guiando y edificando a personas y familias a través del mensaje transformador de Jesucristo.",
  "Junto a su esposa, Viviana Méndez, ha desarrollado una labor pastoral basada en el amor de Dios, la fe y el servicio, siendo un ejemplo de compromiso y fidelidad para la iglesia. Su caminar ministerial ha estado marcado por la confianza en la dirección de Dios y el deseo constante de ver vidas restauradas y fortalecidas en Cristo.",
  "Como familia, junto a sus hijas Siboney y Marcela León, continúan sirviendo con pasión y dedicación, creyendo firmemente en el poder de Dios para transformar corazones y traer esperanza a cada generación.",
  "Su visión sigue siendo clara: anunciar el evangelio, fortalecer la fe de las personas y contribuir al crecimiento espiritual de la iglesia, inspirando a otros a vivir una relación genuina con Jesucristo.",
]

export default function LiderazgoPage() {
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
                Equipo pastoral
              </span>
              <h1
                className="mt-4 mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Liderazgo
              </h1>

              <blockquote className="mb-8 border-l-4 border-primary pl-6 text-base leading-relaxed text-muted-foreground italic">
                <p>
                  &ldquo;Porque yo sé los planes que tengo para ustedes&rdquo;, declara el
                  Señor, &ldquo;planes de bienestar y no de calamidad, a fin de darles un
                  futuro y una esperanza.&rdquo;
                </p>
                <cite className="mt-3 block text-sm font-semibold not-italic text-foreground">
                  Jeremías 29:11
                </cite>
              </blockquote>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {BIO_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <p
                className="mt-8 text-base font-semibold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Pastor Juan León y Familia
              </p>
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/images/liderazgo.webp"
                    alt="Pastor Juan León y su esposa Viviana Méndez"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="space-y-2 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                  <p>Pastor Juan León y su esposa Viviana Méndez</p>
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
