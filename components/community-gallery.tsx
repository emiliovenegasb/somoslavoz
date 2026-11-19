import Image from "next/image"

const photos = [
  {
    src: "/images/comunidad/culto.webp",
    alt: "Persona de la congregación con las manos en alto durante el culto, frente a la pantalla que dice Jesús.",
    caption: "Culto",
  },
  {
    src: "/images/comunidad/congregacion.webp",
    alt: "Personas de la congregación de pie, cantando y aplaudiendo durante la reunión.",
    caption: "La congregación",
  },
  {
    src: "/images/comunidad/alabanza.webp",
    alt: "Tres mujeres del equipo de alabanza cantando en el escenario.",
    caption: "Alabanza",
  },
  {
    src: "/images/comunidad/musica.webp",
    alt: "Músico tocando el bajo durante el culto.",
    caption: "Música",
  },
  {
    src: "/images/comunidad/kids.webp",
    alt: "Niños sentados en la sala de Kids, acompañados por una maestra.",
    caption: "Kids",
  },
  {
    src: "/images/comunidad/ninos.webp?v=2",
    alt: "Un niño pinta una hoja que dice Jesús me enseña a perdonar, en la mesa de Kids.",
    caption: "Los niños",
  },
] as const

export function CommunityGallery() {
  return (
    <section className="bg-background py-20 lg:py-28" id="comunidad">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <span
            className="text-sm font-semibold uppercase tracking-widest text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Nuestra familia
          </span>
          <h2
            className="mt-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Así se vive en Templo Central
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Cultos y actividades de la iglesia, con la gente que ya es parte.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {photos.map((photo) => (
            <figure key={photo.src} className="group relative overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent px-4 pb-4 pt-16 text-sm font-semibold text-primary-foreground">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
