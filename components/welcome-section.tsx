import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PASTORS_NAMES, PASTORS_TITLE } from "@/lib/site"

export function WelcomeSection() {
  return (
    <section className="py-20 lg:py-32 bg-background" id="about">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image — ancho acotado para que la altura (4/5) no estire tanto la sección */}
          <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto lg:mx-0">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/pastor-couple.webp"
                alt={PASTORS_NAMES}
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full -z-10" />
          </div>

          {/* Content */}
          <div id="pastors" className="scroll-mt-28">
            <span 
              className="text-primary text-sm font-semibold tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mensaje de bienvenida
            </span>
            
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Unas palabras de
              <br />
              <span className="text-primary">nuestros pastores</span>
            </h2>
            
            <blockquote className="text-lg text-muted-foreground leading-relaxed mb-6 border-l-4 border-primary pl-6 italic">
              &ldquo;Creemos que cada persona tiene un propósito, y estamos aquí para ayudarte a descubrir el tuyo. En Templo Central encontrarás un lugar al que pertenecer, donde tu fe puede crecer y donde puedes marcar una diferencia.&rdquo;
            </blockquote>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Ya sea que estés dando tus primeros pasos en la fe o buscando una comunidad a la que llamar hogar,
              te invitamos a unirte a nosotros. Juntos estamos construyendo algo hermoso: una familia
              comprometida con amar a Dios y amar a las personas.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <div>
                <p className="font-semibold text-foreground" style={{ fontFamily: 'var(--font-heading)' }}>
                  {PASTORS_NAMES}
                </p>
                <p className="text-sm text-muted-foreground">{PASTORS_TITLE}</p>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
              <Link href="/nuestros-lideres">Conócenos más</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
