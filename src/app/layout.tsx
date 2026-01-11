import type { Metadata } from 'next'
import '../styles/globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Retro Kredenc - Krása starých časů | Poklady které nezestárly',
  description: 'Krása starých časů - Poklady které nezestárly. Objevte krásu retro československého porcelánu z let 1950-1989. Originální hrnečky, talířky a další kousky z dob Československa.',
  keywords: 'retro porcelán, československý porcelán, retro hrnečky, retro talířky, vintage porcelán, Československo 50-89, poklady které nezestárly',
  authors: [{ name: 'Retro Kredenc' }],
  openGraph: {
    title: 'Retro Kredenc - Krása starých časů | Poklady které nezestárly',
    description: 'Krása starých časů - Poklady které nezestárly. Objevte krásu retro československého porcelánu z let 1950-1989',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'Retro Kredenc',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://retrokredenc.cz',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="CZ" />
        <meta name="geo.placename" content="Česká republika" />
      </head>
      <body>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
