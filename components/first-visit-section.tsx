import { BookOpen, MapPin, Shirt, Users } from "lucide-react"
import Link from "next/link"
import { UbicacionAnchor } from "@/components/ubicacion-link"
import { PRIMERA_VISITA_ID } from "@/lib/anchors"

const items = [
  {
    icon: BookOpen,
    title: "Cómo es el culto",
    body: "Cantamos, oramos y escuchamos un mensaje de la Biblia. Puedes participar como quieras; nadie te va a pedir nada.",
  },
  {
    icon: Shirt,
    title: "Cómo vestir",
    body: "Ven como estás. No hay código de vestimenta: la mayoría llega con ropa de todos los días.",
  },
  {
    icon: Users,
    title: "Los niños",
    body: "Tus hijos tienen Kids, un espacio divertido y seguro donde descubren el amor de Dios. Puedes conocer el segmento antes de llegar.",
    action: { href: "/segmentos/kids", label: "Conocer Kids" },
  },
  {
    icon: MapPin,
    title: "Estacionamiento",
    body: "Hay calles cercanas donde dejar el auto. Mira el mapa más abajo.",
    map: true,
  },
] as const

export function FirstVisitSection() {
  return (
    <section
      id={PRIMERA_VISITA_ID}
      className="scroll-mt-28 bg-background py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span
            className="text-sm font-semibold uppercase tracking-widest text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tu primera vez
          </span>
          <h2
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ¿Qué esperar en tu primera visita?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Llegas, te recibimos y participas a tu ritmo.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 sm:p-7"
            >
              <item.icon className="mb-4 h-8 w-8 text-accent" aria-hidden="true" />
              <h3
                className="mb-2 text-xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {item.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">{item.body}</p>
              {"action" in item ? (
                <Link
                  href={item.action.href}
                  className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
                >
                  {item.action.label}
                </Link>
              ) : null}
              {"map" in item ? (
                <UbicacionAnchor className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline">
                  Ver el mapa
                </UbicacionAnchor>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
