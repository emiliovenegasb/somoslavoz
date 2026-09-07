import Image from "next/image"
import { Facebook } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RAICES_FACEBOOK_URL } from "@/lib/site"


const RAICES_PARAGRAPHS = [
  "Raíces es el espacio para hombres y mujeres de nuestra iglesia que desean seguir creciendo en fe, comunión y propósito en esta etapa de la vida.",
  "Nos reunimos para adorar, aprender de la palabra de Dios y compartir experiencias que fortalecen el alma y el vínculo entre hermanos.",
  "Creemos que cada temporada tiene bendición: aquí encontrarás acompañamiento, oración y oportunidades para servir con el corazón dispuesto.",
]

export default function SegmentoRaicesPage() {
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
                Segmento Raíces
              </span>
              <h1
                className="mt-4 mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Raíces
              </h1>

              <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
                {RAICES_PARAGRAPHS.map((paragraph) => (
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
                  <li>• Enseñanza bíblica y momentos de adoración en compañerismo.</li>
                  <li>• Oración y compañía para caminar juntos en la fe.</li>
                  <li>• Actividades que fortalecen la unión y el servicio en la iglesia.</li>
                  <li>• Espacios para compartir vida, testimonio y esperanza en Cristo.</li>
                </ul>
              </div>

              {RAICES_FACEBOOK_URL ? (
                <div className="mt-10">
                  <h2
                    className="text-xl font-semibold text-foreground mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Síguenos
                  </h2>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={RAICES_FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook Raíces TC"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              ) : null}
            </article>

            <aside className="lg:sticky lg:top-24">
              <figure className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/raices.webp"
                    alt="Hombres y mujeres del segmento Raíces en oración"
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-4 text-sm text-muted-foreground">
                  Raíces: fe que profundiza y compañerismo que sostiene.
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
