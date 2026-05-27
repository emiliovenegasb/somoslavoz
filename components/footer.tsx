import Link from "next/link"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import { Facebook, Instagram, Youtube, Twitter, Podcast, MapPin, Phone, Mail } from "lucide-react"
import { UbicacionAnchor } from "@/components/ubicacion-link"
import { FooterFormDialog } from "@/components/footer-form-dialog"
import { SegmentRouteLink } from "@/components/segment-route-link"
import { UBICACION_ID } from "@/lib/anchors"
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  SITE_ADDRESS,
  SITE_NAME,
  SITE_TAGLINE,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_SPOTIFY_URL,
  SOCIAL_TIKTOK_URL,
  SOCIAL_X_URL,
  SOCIAL_YOUTUBE_URL,
} from "@/lib/site"

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

type SocialNavItem = {
  icon: LucideIcon | typeof TikTokIcon
  label: string
  href: string
}

const footerLinks = {
  about: [
    { label: "Nuestra historia", href: "/nuestra-historia" },
    { label: "Nuestros pastores", href: "/nuestros-lideres" },
    { label: "Lo que creemos", href: "/lo-que-creemos" },
    { label: "Liderazgo", href: "/liderazgo" },
  ],
  connect: [
    { label: "Planifica tu visita", href: `#${UBICACION_ID}` },
    { label: "Ver en línea", href: "#watch" },
    { label: "Petición de oración", href: "#prayer" },
    { label: "Contáctanos", href: "#contact" },
  ],
  segmentos: [
    { label: "Niños", href: "/segmentos/ninos" },
    { label: "Jóvenes", href: "/segmentos/jovenes" },
    { label: "Jóvenes adultos", href: "/segmentos/jovenes-adultos" },
    { label: "Escogidas", href: "/segmentos/escogidas" },
    { label: "Red de Hombres", href: "/segmentos/red-hombres" },
    { label: "Raíces", href: "/segmentos/raices" },
  ],
}

function footerResourceLinks() {
  return [
    { label: "Sermones", href: "/#messages" },
    { label: "Prédicas", href: SOCIAL_SPOTIFY_URL || "#podcasts" },
    { label: "Radio", href: "/#radio" },
    { label: "App", href: "/#app" },
  ] as const
}

const socialNav: SocialNavItem[] = [
  { icon: Facebook, label: "Facebook", href: SOCIAL_FACEBOOK_URL },
  { icon: Instagram, label: "Instagram", href: SOCIAL_INSTAGRAM_URL },
  { icon: Youtube, label: "YouTube", href: SOCIAL_YOUTUBE_URL },
  { icon: TikTokIcon, label: "TikTok", href: SOCIAL_TIKTOK_URL },
  { icon: Podcast, label: "Spotify", href: SOCIAL_SPOTIFY_URL },
  { icon: Twitter, label: "X", href: SOCIAL_X_URL },
].filter((item) => item.href.length > 0)

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Logo & Info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/alef-clean.webp"
                  alt="Logo Somos la Voz"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              {SITE_TAGLINE}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>{SITE_ADDRESS}</span>
              </div>
              {CONTACT_PHONE ? (
                <div className="flex items-center gap-3 text-primary-foreground/70">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <a href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`} className="hover:text-primary-foreground transition-colors">
                    {CONTACT_PHONE}
                  </a>
                </div>
              ) : null}
              {CONTACT_EMAIL ? (
                <div className="flex items-center gap-3 text-primary-foreground/70">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary-foreground transition-colors break-all">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Nosotros</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Conecta</h4>
            <ul className="space-y-2">
              {footerLinks.connect.map((link) => (
                <li key={link.label}>
                  {link.href === `#${UBICACION_ID}` ? (
                    <UbicacionAnchor className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                      {link.label}
                    </UbicacionAnchor>
                  ) : link.href === "#prayer" ? (
                    <FooterFormDialog variant="prayer" />
                  ) : link.href === "#contact" ? (
                    <FooterFormDialog variant="contact" />
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Segmentos</h4>
            <ul className="space-y-2">
              {footerLinks.segmentos.map((link) => (
                <li key={link.label}>
                  <SegmentRouteLink
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </SegmentRouteLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Recursos</h4>
            <ul className="space-y-2">
              {footerResourceLinks().map((link) => (
                <li key={link.label}>
                  {/^https?:\/\//i.test(link.href) ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              &copy; {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
            </p>
            
            {/* Social Links */}
            {socialNav.length > 0 ? (
              <div className="flex items-center gap-4">
                {socialNav.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
