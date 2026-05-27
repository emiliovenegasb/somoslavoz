import { Button } from "@/components/ui/button"
import { DONATE_FLOW_URL } from "@/lib/site"

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

          <div className="flex justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8" asChild>
              <a href={DONATE_FLOW_URL} target="_blank" rel="noopener noreferrer">
                Ofrenda ahora
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
