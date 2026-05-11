import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site'
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
  title: {
    default: `${SITE_NAME} | Inicio`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png' }],
    apple: [{ url: '/apple-icon.png', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
