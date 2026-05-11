import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Twitter, Podcast, MapPin, Phone, Mail } from "lucide-react"
import { UbicacionAnchor } from "@/components/ubicacion-link"
import { FooterFormDialog } from "@/components/footer-form-dialog"
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
  SOCIAL_X_URL,
  SOCIAL_YOUTUBE_URL,
} from "@/lib/site"

const footerLinks = {
  about: [
    { label: "Nuestra historia", href: "/nuestra-historia" },
    { label: "Nuestros pastores", href: "/nuestros-lideres" },
    { label: "Lo que creemos", href: "/lo-que-creemos" },
    { label: "Liderazgo", href: "#leadership" },
  ],
  connect: [
    { label: "Planifica tu visita", href: `#${UBICACION_ID}` },
    { label: "Ver en línea", href: "#watch" },
    { label: "Petición de oración", href: "#prayer" },
    { label: "Contáctanos", href: "#contact" },
  ],
  ministries: [
    { label: "Niños", href: "#kids" },
    { label: "Jóvenes", href: "#youth" },
    { label: "Jóvenes adultos", href: "#young-adults" },
    { label: "Misiones", href: "#missions" },
    { label: "Alcance", href: "#outreach" },
  ],
  resources: [
    { label: "Sermones", href: "#sermons" },
    { label: "Podcasts", href: "#podcasts" },
    { label: "Devocionales", href: "#devotionals" },
    { label: "App", href: "#app" },
  ],
}

const socialNav = [
  { icon: Facebook, label: "Facebook", href: SOCIAL_FACEBOOK_URL },
  { icon: Instagram, label: "Instagram", href: SOCIAL_INSTAGRAM_URL },
  { icon: Youtube, label: "YouTube", href: SOCIAL_YOUTUBE_URL },
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
                  src="/alef-clean.png"
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
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Ministerios</h4>
            <ul className="space-y-2">
              {footerLinks.ministries.map((link) => (
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
            <h4 className="font-semibold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Recursos</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
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
