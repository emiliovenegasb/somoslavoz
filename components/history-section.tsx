import Link from "next/link"
import Image from "next/image"
import { HISTORY_PARAGRAPHS } from "@/lib/history"

export function HistorySection() {
  const previewParagraphs = HISTORY_PARAGRAPHS.slice(0, 2)

  return (
    <section className="py-20 lg:py-28 bg-muted/40" id="story">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <span
              className="text-primary text-sm font-semibold tracking-widest uppercase"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Legado de fe
            </span>
            <h2
              className="mt-4 mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Nuestra historia
            </h2>

            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              {previewParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/nuestra-historia"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Leer historia completa
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/fundadores.webp"
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
  )
}
