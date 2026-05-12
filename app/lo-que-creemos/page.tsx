import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BELIEFS_PARAGRAPHS } from "@/lib/beliefs"
import { LO_QUE_CREEMOS_IMAGE } from "@/lib/site"

function isRemoteImageSrc(src: string) {
  return /^https?:\/\//i.test(src)
}

export default function LoQueCreemosPage() {
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
                Fundamentos de fe
              </span>
              <h1
                className="mt-4 mb-8 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Lo que creemos
              </h1>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {BELIEFS_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  {isRemoteImageSrc(LO_QUE_CREEMOS_IMAGE) ? (
                    <img
                      src={LO_QUE_CREEMOS_IMAGE}
                      alt="Culto y alabanza — nuestra fe en Jesucristo"
                      className="absolute inset-0 size-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <Image
                      src={LO_QUE_CREEMOS_IMAGE}
                      alt="Culto y alabanza — nuestra fe en Jesucristo"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  )}
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Nuestra fe está centrada en Jesucristo y en la Palabra de Dios.
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
