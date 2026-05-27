import { Clock, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UBICACION_ID } from "@/lib/anchors"
import { MAPS_GOOGLE_URL, MAPS_WAZE_URL, SITE_ADDRESS } from "@/lib/site"

function GoogleMapsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="#EA4335"
      />
      <circle cx="12" cy="9" r="2.75" fill="#B31412" />
      <circle cx="12" cy="9" r="1.75" fill="#fff" />
    </svg>
  )
}

function WazeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#33CCFF" />
      <ellipse cx="9" cy="10.5" rx="1.2" ry="1.6" fill="#000" />
      <ellipse cx="15" cy="10.5" rx="1.2" ry="1.6" fill="#000" />
      <path
        d="M8.5 14.5c1.2 1.6 2.8 2.5 3.5 2.5s2.3-.9 3.5-2.5"
        stroke="#000"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

const services = [
  {
    day: "Miércoles",
    times: ["19:30 hrs."],
    description: "De formación",
    icon: Clock,
  },
  {
    day: "Domingo",
    times: ["10:30 hrs."],
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
            Horarios de reuniones
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
                <a
                  href={MAPS_GOOGLE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <GoogleMapsIcon className="h-4 w-4 shrink-0" />
                  Ver en Google Maps
                </a>
              </Button>
              <Button variant="outline" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <a
                  href={MAPS_WAZE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <WazeIcon className="h-4 w-4 shrink-0" />
                  Waze
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
