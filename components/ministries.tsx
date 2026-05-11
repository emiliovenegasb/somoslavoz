import Image from "next/image"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const ministries = [
  {
    title: "Ministerio de niños",
    description: "Un ambiente divertido y seguro donde los niños descubren el amor de Dios mediante enseñanzas y actividades apropiadas para su edad.",
    image: "/images/kids-ministry.webp",
    href: "#kids",
    color: "bg-[#F97316]",
  },
  {
    title: "Ministerio juvenil",
    description: "Impulsamos a los adolescentes a crecer en la fe, formar amistades significativas y generar impacto en su generación.",
    image: "/images/youth-ministry.webp",
    href: "#youth",
    color: "bg-primary",
  },
  {
    title: "Grupos de comunidad",
    description: "Conecta con otras personas en grupos pequeños donde puedes construir relaciones duraderas y crecer juntos en la fe.",
    image: "/images/community.webp",
    href: "#groups",
    color: "bg-accent",
  },
  {
    title: "Equipos de voluntariado",
    description: "Descubre tu propósito sirviendo a otros. Hay un lugar para que cada persona use sus dones únicos.",
    image: "/images/volunteers.webp",
    href: "#volunteers",
    color: "bg-[#10B981]",
  },
]

export function Ministries() {
  return (
    <section className="py-20 lg:py-32 bg-muted" id="ministries">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span 
            className="text-primary text-sm font-semibold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Involúcrate
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Nuestros ministerios
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hay un lugar para todos en Templo Central. Explora nuestros ministerios y encuentra dónde perteneces.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ministries.map((ministry) => (
            <Link 
              key={ministry.title}
              href={ministry.href}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={ministry.image}
                  alt={ministry.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className={`inline-block ${ministry.color} text-white text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
                  {ministry.title}
                </div>
                <p className="text-primary-foreground/90 text-sm leading-relaxed line-clamp-2">
                  {ministry.description}
                </p>
                <div className="flex items-center gap-2 text-accent mt-4 font-semibold text-sm group-hover:gap-3 transition-all">
                  Ver más
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
