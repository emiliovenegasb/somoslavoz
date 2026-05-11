/**
 * Configuración pública del sitio.
 * Define valores en `.env.local` con prefijo `NEXT_PUBLIC_` para usarlos en el navegador.
 * @see https://nextjs.org/docs/app/guides/environment-variables
 */

const trim = (v: string | undefined) => v?.trim()

/** Si en .env pusiste solo el usuario o @handle, arma la URL correcta */
function normalizeSocialUrl(
  raw: string | undefined,
  kind: "facebook" | "instagram" | "youtube" | "x" | "spotify",
): string {
  const v = trim(raw)
  if (!v) return ""
  if (/^https?:\/\//i.test(v)) return v
  if (/\.spotify\.com/i.test(v)) return `https://${v.replace(/^\/+/, "")}`

  switch (kind) {
    case "facebook":
      return `https://www.facebook.com/${v.replace(/^\/+/, "").replace(/^facebook\.com\//i, "")}`
    case "instagram": {
      const user =
        v
          .replace(/^@/, "")
          .split("/")
          .filter(Boolean)
          .pop() ?? v.replace(/^@/, "")
      return `https://www.instagram.com/${user}/`
    }
    case "youtube": {
      const h = v.replace(/^@/, "").trim()
      if (/^(channel\/|c\/|user\/)/i.test(h)) {
        return `https://www.youtube.com/${h}`
      }
      return `https://www.youtube.com/@${h}`
    }
    case "x": {
      const u = v.replace(/^@/, "").replace(/^(x\.com|twitter\.com)\//i, "")
      return `https://x.com/${u}`
    }
    case "spotify": {
      if (/^(show|episode)\//i.test(v)) {
        return `https://open.spotify.com/${v}`
      }
      return `https://open.spotify.com/user/${v.replace(/^user\//i, "")}`
    }
    default:
      return v
  }
}

const FALLBACK_DONATE =
  "https://www.flow.cl/app/web/pagarBtnPago.php?token=eohyyvl"

/** URL de Flow para ofrendas */
export const DONATE_FLOW_URL =
  trim(process.env.NEXT_PUBLIC_DONATE_FLOW_URL) || FALLBACK_DONATE

/** Enlace App Store (sección "Descarga la App") */
export const APPLE_STORE_URL =
  trim(process.env.NEXT_PUBLIC_APPLE_STORE_URL) ||
  "https://apps.apple.com/cl/app/somos-la-voz/id6593660269"

/** Enlace Google Play (sección "Descarga la App") */
export const GOOGLE_PLAY_URL = trim(process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL) || "#"

/** Nombre del ministerio / sitio */
export const SITE_NAME =
  trim(process.env.NEXT_PUBLIC_SITE_NAME) || "Somos la Voz Templo Central"

/** Descripción corta (SEO, meta) */
export const SITE_DESCRIPTION =
  trim(process.env.NEXT_PUBLIC_SITE_DESCRIPTION) ||
  "Iglesia Somos la Voz — Templo Central. Cultos, comunidad y esperanza."

/** Dirección (pie de página, bloque “ubicación”) */
export const SITE_ADDRESS =
  trim(process.env.NEXT_PUBLIC_SITE_ADDRESS) ||
  "Tacora 2573, Independencia, Santiago, Chile"

/** Eslogan corto bajo el nombre en el footer */
export const SITE_TAGLINE =
  trim(process.env.NEXT_PUBLIC_SITE_TAGLINE) ||
  "Un lugar donde la fe cobra vida, la comunidad se construye y todos son bienvenidos."

/** Teléfono de contacto (visible si no está vacío) */
export const CONTACT_PHONE = trim(process.env.NEXT_PUBLIC_CONTACT_PHONE) || ""

/** Correo de contacto (visible si no está vacío) */
export const CONTACT_EMAIL = trim(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || ""

/** Redes sociales (solo se muestran iconos con URL definida, tras normalizar) */
export const SOCIAL_FACEBOOK_URL = normalizeSocialUrl(
  process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL,
  "facebook",
)
export const SOCIAL_INSTAGRAM_URL = normalizeSocialUrl(
  process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL,
  "instagram",
)
export const SOCIAL_YOUTUBE_URL = normalizeSocialUrl(
  process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE_URL,
  "youtube",
)
export const SOCIAL_X_URL = normalizeSocialUrl(
  process.env.NEXT_PUBLIC_SOCIAL_X_URL,
  "x",
)
/** Spotify: usa URL completa desde “Compartir”, o el id de usuario/podcast según .env.example */
export const SOCIAL_SPOTIFY_URL = normalizeSocialUrl(
  process.env.NEXT_PUBLIC_SOCIAL_SPOTIFY_URL,
  "spotify",
)

/**
 * Enlace del programa de radio (banner «Chile para Cristo», botón Escuchar).
 * URL completa (streaming, TuneIn, Spotify del programa, etc.).
 */
const radioListenRaw = trim(process.env.NEXT_PUBLIC_RADIO_LISTEN_URL) ?? ""
export const RADIO_LISTEN_URL =
  radioListenRaw.replace(/^["']|["']$/g, "") || ""

/** Miniaturas por defecto (predica 1…3, orden izquierda → derecha) */
const RECENT_MESSAGE_DEFAULT_THUMBNAILS = [
  "/images/predica-1.webp",
  "/images/predica-2.webp",
  "/images/predica-3.webp",
] as const

export type RecentMessageCardConfig = {
  title: string
  speaker: string
  date: string
  duration: string
  /** Ruta bajo `/public`, ej. `/images/predica-1.webp` */
  thumbnail: string
  /** Vacío = miniatura sin enlace */
  youtubeUrl: string
}

/**
 * Tarjetas “Mensajes recientes” (orden izquierda → derecha).
 * Título, orador, fecha y duración: `NEXT_PUBLIC_RECENT_MESSAGE_{1|2|3}_{TITLE|SPEAKER|DATE|DURATION}` (opcionales; vacíos = solo miniatura).
 * Imagen: `NEXT_PUBLIC_RECENT_MESSAGE_{1|2|3}_IMAGE` (opcional).
 * Video: `NEXT_PUBLIC_RECENT_MESSAGE_VIDEO_{1|2|3}_URL`.
 *
 * Usar esta función (no un array estático) para que `.env` se aplique en cada request.
 */
export function getRecentMessageCards(): RecentMessageCardConfig[] {
  return [
    {
      title: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_1_TITLE) || "",
      speaker: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_1_SPEAKER) || "",
      date: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_1_DATE) || "",
      duration: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_1_DURATION) || "",
      thumbnail:
        trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_1_IMAGE) ||
        RECENT_MESSAGE_DEFAULT_THUMBNAILS[0],
      youtubeUrl: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_VIDEO_1_URL) || "",
    },
    {
      title: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_2_TITLE) || "",
      speaker: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_2_SPEAKER) || "",
      date: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_2_DATE) || "",
      duration: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_2_DURATION) || "",
      thumbnail:
        trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_2_IMAGE) ||
        RECENT_MESSAGE_DEFAULT_THUMBNAILS[1],
      youtubeUrl: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_VIDEO_2_URL) || "",
    },
    {
      title: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_3_TITLE) || "",
      speaker: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_3_SPEAKER) || "",
      date: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_3_DATE) || "",
      duration: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_3_DURATION) || "",
      thumbnail:
        trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_3_IMAGE) ||
        RECENT_MESSAGE_DEFAULT_THUMBNAILS[2],
      youtubeUrl: trim(process.env.NEXT_PUBLIC_RECENT_MESSAGE_VIDEO_3_URL) || "",
    },
  ]
}

/**
 * Enlaces a mapas (misma dirección que SITE_ADDRESS).
 * Puedes fijar una URL exacta del lugar en .env; si no, se arma desde la dirección.
 */
export const MAPS_GOOGLE_URL =
  trim(process.env.NEXT_PUBLIC_MAPS_GOOGLE_URL) ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_ADDRESS)}`

export const MAPS_WAZE_URL =
  trim(process.env.NEXT_PUBLIC_MAPS_WAZE_URL) ||
  `https://waze.com/ul?q=${encodeURIComponent(SITE_ADDRESS)}`

/** Nombres de los pastores (sección de bienvenida) */
export const PASTORS_NAMES =
  trim(process.env.NEXT_PUBLIC_PASTORS_NAMES) ||
  "Felix Fuentes y Maria Ester Bravo"

/** Cargo bajo los nombres (ej. Pastores principales) */
export const PASTORS_TITLE =
  trim(process.env.NEXT_PUBLIC_PASTORS_TITLE) || "Pastores principales"
