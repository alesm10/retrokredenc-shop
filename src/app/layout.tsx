import type { Metadata } from 'next'
import '../styles/globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Pocitadlo from '@/components/Pocitadlo'

export const metadata: Metadata = {
  metadataBase: new URL('https://retrokredenc.cz'),
  title: 'Retro Kredenc — československý porcelán a retro keramika z let 1950–1989',
  description: 'Originální československý porcelán, retro keramika a sklo z let 1950–1989 — hrnky, talíře, vázy, džbány i celé soupravy. Každý kus je originál, pečlivě vybraný a vyfocený.',
  keywords: 'retro porcelán, československý porcelán, retro keramika, retro hrnky, retro talíře, vintage porcelán, ČSSR porcelán, Ditmar Urbach, Kera Vitral, Dubí, Horní Slavkov',
  authors: [{ name: 'Retro Kredenc' }],
  openGraph: {
    title: 'Retro Kredenc — československý porcelán a retro keramika',
    description: 'Originální československý porcelán, keramika a sklo z let 1950–1989. Každý kus je originál.',
    type: 'website',
    locale: 'cs_CZ',
    siteName: 'Retro Kredenc',
  },
  robots: {
    index: true,
    follow: true,
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
        <Pocitadlo />
      </body>
    </html>
  )
}
