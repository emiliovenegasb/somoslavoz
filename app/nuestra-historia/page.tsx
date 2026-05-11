import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HISTORY_PARAGRAPHS } from "@/lib/history"

export default function NuestraHistoriaPage() {
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
                Legado de fe
              </span>
              <h1
                className="mt-4 mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Nuestra historia
              </h1>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {HISTORY_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/fundadores.png"
                    alt="Fundadores José Ignacio Fuentes y Graciela Donoso"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Fundadores: Apóstol José Ignacio Fuentes y su esposa Graciela Donoso.
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
