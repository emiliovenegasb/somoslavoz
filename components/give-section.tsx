import { Church, Globe, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DONATE_FLOW_URL } from "@/lib/site"

const impactStats = [
  {
    icon: Church,
    stat: "75+",
    label: "Iglesias en Chile, Argentina y Perú",
  },
  {
    icon: Globe,
    stat: "100+",
    label: "Aliados globales",
  },
  {
    icon: Users,
    stat: "200+",
    label: "Familias atendidas al mes",
  },
]

export function GiveSection() {
  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground" id="give">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span 
            className="text-accent text-sm font-semibold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Generosidad
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Tu ofrenda hace la diferencia
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-8">
            Cada ofrenda nos ayuda a alcanzar a más personas con esperanza, servir a nuestra comunidad
            y compartir el mensaje del amor de Dios al mundo.
          </p>

          <blockquote className="mx-auto mb-10 max-w-2xl border-l-4 border-accent/50 pl-5 text-left sm:pl-6">
            <p className="text-primary-foreground/90 text-base leading-relaxed italic sm:text-lg">
              <span className="not-italic font-semibold text-primary-foreground">15 </span>
              ¿Y cómo predicarán si no fueren enviados? Como está escrito: ¡Cuán hermosos son los pies
              de los que anuncian la paz, de los que anuncian buenas nuevas!
            </p>
            <cite className="mt-3 block text-sm font-medium not-italic text-primary-foreground/65">
              Romanos 10:15 — Reina-Valera 1960
            </cite>
          </blockquote>

          <div className="flex justify-center mb-16">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8" asChild>
              <a href={DONATE_FLOW_URL} target="_blank" rel="noopener noreferrer">
                Ofrenda ahora
              </a>
            </Button>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {impactStats.map((item) => (
            <div 
              key={item.label}
              className="text-center p-6 bg-primary-foreground/10 rounded-2xl"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-accent/20 mb-4">
                <item.icon className="h-7 w-7 text-accent" />
              </div>
              <div 
                className="text-4xl font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {item.stat}
              </div>
              <div className="text-primary-foreground/70">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
