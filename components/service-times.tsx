import { Clock, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UBICACION_ID } from "@/lib/anchors"
import { MAPS_GOOGLE_URL, MAPS_WAZE_URL, SITE_ADDRESS } from "@/lib/site"

const services = [
  {
    day: "Miércoles",
    times: ["19:30"],
    description: "De formación",
    icon: Clock,
  },
  {
    day: "Domingo",
    times: ["10:30 AM"],
    description: "Celebración",
    icon: Calendar,
  },
]

export function ServiceTimes() {
  return (
    <section className="py-14 lg:py-20 bg-foreground text-primary-foreground" id="visit">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
          <span 
            className="text-accent text-sm font-semibold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Acompáñanos
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Horarios de reunión
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-base sm:text-lg leading-snug">
            Nos encantaría conocerte. Acompáñanos presencialmente o mira en línea desde cualquier lugar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto mb-8">
          {services.map((service) => (
            <div 
              key={service.day}
              className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-colors"
            >
              <service.icon className="h-9 w-9 text-accent mb-3" />
              <h3 
                className="text-xl sm:text-2xl font-bold mb-1.5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {service.day}
              </h3>
              <p className="text-primary-foreground/60 mb-3 text-sm sm:text-base">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.times.map((time) => (
                  <span 
                    key={time}
                    className="bg-accent/20 text-accent px-3 py-1.5 rounded-full text-sm font-semibold"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Location — ancla para “Planifica tu visita” (header / hero) */}
        <div
          id={UBICACION_ID}
          className="scroll-mt-28 bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-12 w-12 shrink-0 rounded-full bg-accent/20 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 
                  className="text-xl font-bold"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Nuestra ubicación
                </h3>
                <p className="text-primary-foreground/60">{SITE_ADDRESS}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <Button variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <a href={MAPS_GOOGLE_URL} target="_blank" rel="noopener noreferrer">
                  Ver en Google Maps
                </a>
              </Button>
              <Button variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <a href={MAPS_WAZE_URL} target="_blank" rel="noopener noreferrer">
                  Waze
                </a>
              </Button>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Planifica tu visita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
