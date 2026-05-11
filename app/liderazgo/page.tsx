import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const LIDERAZGO_PARAGRAPHS = [
  "Nuestro liderazgo se apoya en el llamado de Dios, la Palabra y el servicio con humildad. Pastores y esposas caminan juntos para pastorear la iglesia con amor y fidelidad.",
  "Creemos en un liderazgo que edifica, acompaña y fortalece a la familia de la fe, impulsando a cada persona a crecer en Cristo y a vivir el evangelio en lo cotidiano.",
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

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {LIDERAZGO_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/liderazgo.webp"
                    alt="Pastores Juan Leon, Viviana Mendes, Jose I. Caceres y Magdalena Ripton"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <figcaption className="space-y-2 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
                  <p>Pastores Juan Leon y su esposa Viviana Mendes</p>
                  <p>Jose I. Caceres y su esposa Magdalena Ripton</p>
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
