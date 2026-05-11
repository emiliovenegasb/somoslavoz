import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const RED_HOMBRES_AGE_RANGE = "15 años en adelante"

const RED_HOMBRES_PARAGRAPHS = [
  "La Red de Hombres es un espacio de la iglesia para crecer en fe, compañerismo y propósito según la Palabra de Dios.",
  "Acompañamos el desarrollo espiritual, fortalecemos el carácter y promovemos una vida con propósito para el hogar, la iglesia y la comunidad.",
  "Buscamos que cada hombre afiance su relación con Cristo, aprenda a servir y viva una fe práctica y firme."
]

export default function MinisterioRedHombresPage() {
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
                Red de ministerios
              </span>
              <h1
                className="mt-4 mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Red de Hombres
              </h1>

              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary">
                  Rango de edad: {RED_HOMBRES_AGE_RANGE}
                </span>
              </div>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {RED_HOMBRES_PARAGRAPHS.map((paragraph) => (
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
                  <li>• Enseñanza bíblica y edificación para su vida diaria.</li>
                  <li>• Tiempos de oración, comunión y fortalecimiento espiritual.</li>
                  <li>• Espacios de formación en valores y liderazgo servicial.</li>
                  <li>• Participación en servicio dentro de la iglesia y alcance a otros.</li>
                </ul>
              </div>
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/red-hombres.webp"
                    alt="Hombres conversando en la Red de Hombres"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Para hombres de {RED_HOMBRES_AGE_RANGE}. Un lugar para aprender, servir
                  y crecer juntos.
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

