import type { Metadata, MetadataRoute } from "next"
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  MAPS_GOOGLE_URL,
  SERVICE_HOURS_LABEL,
  SERVICE_SCHEDULE,
  SITE_ADDRESS,
  SITE_NAME,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_SPOTIFY_URL,
  SOCIAL_TIKTOK_URL,
  SOCIAL_X_URL,
  SOCIAL_YOUTUBE_URL,
} from "@/lib/site"

const DEFAULT_SITE_URL = "https://www.somoslavoz.cl"

/** URL canónica. En producción es https://www.somoslavoz.cl (el apex redirige a www). */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return DEFAULT_SITE_URL
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  return withProtocol.replace(/\/+$/, "")
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith("/") ? path : `/${path}`
  if (normalized === "/") return getSiteUrl()
  return `${getSiteUrl()}${normalized}`
}

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>

type PageSeo = {
  path: string
  /** Fragmento del <title>. En el home se arma como “Nombre | Inicio”. */
  title: string
  absoluteTitle?: boolean
  description: string
  image: string
  changeFrequency: ChangeFrequency
  priority: number
}

export const PAGE_SEO = {
  home: {
    path: "/",
    title: "Inicio",
    absoluteTitle: true,
    description: `Iglesia Somos la Voz, Templo Central en Independencia, Santiago. Cultos: ${SERVICE_HOURS_LABEL}`,
    image: "/og/inicio.jpg",
    changeFrequency: "weekly",
    priority: 1,
  },
  agenda: {
    path: "/agenda",
    title: "Agenda",
    description:
      "Agenda de Somos la Voz Templo Central: próximas actividades, cultos y reuniones de los segmentos en Independencia.",
    image: "/og/agenda.jpg",
    changeFrequency: "daily",
    priority: 0.9,
  },
  historia: {
    path: "/nuestra-historia",
    title: "Nuestra historia",
    description:
      "Nuestra historia en Somos la Voz Templo Central: el origen de la iglesia en 1956 y el camino hasta el templo de Independencia.",
    image: "/og/historia.jpg",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  lideres: {
    path: "/nuestros-lideres",
    title: "Nuestros pastores",
    description:
      "Nuestros pastores en Somos la Voz Templo Central: Félix Fuentes y María Ester Bravo, liderazgo pastoral en Independencia.",
    image: "/og/pastores.jpg",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  creemos: {
    path: "/lo-que-creemos",
    title: "Lo que creemos",
    description:
      "Lo que creemos en Somos la Voz Templo Central: un solo Dios, Jesucristo, la Biblia, el bautismo en el nombre de Jesús y el Espíritu Santo.",
    image: "/og/creemos.jpg",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  liderazgo: {
    path: "/liderazgo",
    title: "Liderazgo",
    description:
      "Liderazgo pastoral de Somos la Voz Templo Central, iglesia en Independencia, Santiago.",
    image: "/og/liderazgo.jpg",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  kids: {
    path: "/segmentos/kids",
    title: "Kids",
    description:
      "Kids de Somos la Voz Templo Central: los niños aprenden el amor de Dios en un ambiente divertido, seguro y lleno de alegría.",
    image: "/og/kids.jpg",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  teens: {
    path: "/segmentos/teens",
    title: "Teens",
    description:
      "Teens de Somos la Voz Templo Central: adolescentes que crecen en la fe, forman amistades y descubren su propósito.",
    image: "/og/teens.jpg",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  jovenes: {
    path: "/segmentos/jovenes",
    title: "Jóvenes",
    description:
      "Jóvenes de Somos la Voz Templo Central: fundamento bíblico, relaciones sanas y participación activa en la iglesia.",
    image: "/og/jovenes.jpg",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  escogidas: {
    path: "/segmentos/escogidas",
    title: "Escogidas",
    description:
      "Escogidas, el segmento de mujeres de Somos la Voz Templo Central: comunión, fe y crecimiento espiritual.",
    image: "/og/escogidas.jpg",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  redHombres: {
    path: "/segmentos/red-hombres",
    title: "Red de Hombres",
    description:
      "Red de Hombres de Somos la Voz Templo Central: un espacio para crecer en fe, compañerismo y propósito.",
    image: "/og/red-hombres.jpg",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  raices: {
    path: "/segmentos/raices",
    title: "Raíces",
    description:
      "Raíces de Somos la Voz Templo Central: comunión, enseñanza y adoración para seguir creciendo en fe.",
    image: "/og/raices.jpg",
    changeFrequency: "monthly",
    priority: 0.8,
  },
} as const satisfies Record<string, PageSeo>

export type PageSeoKey = keyof typeof PAGE_SEO

export function pageTitle(key: PageSeoKey): string {
  const page = PAGE_SEO[key]
  if (page.absoluteTitle) return `${SITE_NAME} | ${page.title}`
  return `${page.title} | ${SITE_NAME}`
}

export function pageMetadata(key: PageSeoKey): Metadata {
  const page = PAGE_SEO[key]
  const title = pageTitle(key)
  const url = absoluteUrl(page.path)
  const image = absoluteUrl(page.image)

  return {
    title: page.absoluteTitle ? { absolute: title } : page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_CL",
      url,
      siteName: SITE_NAME,
      title,
      description: page.description,
      images: [
        {
          url: image,
          secureUrl: image,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [image],
    },
  }
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  return Object.values(PAGE_SEO).map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}

function postalAddress() {
  const parts = SITE_ADDRESS.split(",")
    .map((part) => part.trim())
    .filter(Boolean)
  const country = parts[3] ?? "CL"

  return {
    "@type": "PostalAddress" as const,
    streetAddress: parts[0] ?? SITE_ADDRESS,
    addressLocality: parts[1] ?? "Independencia",
    addressRegion: parts[2] ?? "Santiago",
    addressCountry: /chile/i.test(country) ? "CL" : country,
  }
}

/** JSON-LD de la iglesia: dirección, horarios publicados y redes configuradas. */
export function churchJsonLd() {
  const sameAs = [
    SOCIAL_FACEBOOK_URL,
    SOCIAL_INSTAGRAM_URL,
    SOCIAL_YOUTUBE_URL,
    SOCIAL_TIKTOK_URL,
    SOCIAL_SPOTIFY_URL,
    SOCIAL_X_URL,
  ].filter((url) => url.length > 0)

  const url = getSiteUrl()

  return {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${url}/#iglesia`,
    name: SITE_NAME,
    description: PAGE_SEO.home.description,
    url,
    image: absoluteUrl(PAGE_SEO.home.image),
    logo: absoluteUrl("/alef-clean.webp"),
    address: postalAddress(),
    hasMap: MAPS_GOOGLE_URL,
    areaServed: "Independencia, Santiago, Chile",
    inLanguage: "es-CL",
    ...(CONTACT_PHONE ? { telephone: CONTACT_PHONE } : {}),
    ...(CONTACT_EMAIL ? { email: CONTACT_EMAIL } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    openingHoursSpecification: SERVICE_SCHEDULE.map((service) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: service.dayOfWeek,
      opens: service.time,
      description: service.description,
    })),
  }
}
