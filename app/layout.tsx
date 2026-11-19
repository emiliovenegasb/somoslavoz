import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ChurchJsonLd } from '@/components/church-json-ld'
import { HomeScrollRestore } from '@/components/home-scroll-restore'
import { getSiteUrl, PAGE_SEO } from '@/lib/seo'
import { SITE_NAME } from '@/lib/site'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({ 
  subsets: ["latin"],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${SITE_NAME} | ${PAGE_SEO.home.title}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: PAGE_SEO.home.description,
  icons: {
    icon: [{ url: '/icon.webp', type: 'image/webp' }],
    apple: [{ url: '/apple-icon.webp', type: 'image/webp' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable} bg-background`}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/fondo_main.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="font-sans antialiased">
        <ChurchJsonLd />
        <HomeScrollRestore />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
