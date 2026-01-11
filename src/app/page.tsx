import Link from 'next/link'
import ProductGrid from '@/components/ProductGrid'
import HeroImage from '@/components/HeroImage'
import { getProducts } from '@/data/products'

export default function Home() {
  const allProducts = getProducts()
  const featuredProducts = allProducts.slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="retro-gradient text-white py-8 md:py-12 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative w-full">
          {/* Obrázek kredencu - pravý horní roh s kulatým pozadím */}
          <div className="absolute right-4 top-0 md:right-8 md:-top-2 w-32 md:w-48 lg:w-64 z-0">
            <HeroImage />
          </div>

          {/* Textový obsah - centrovaný */}
          <div className="relative z-10 text-center py-4 md:py-8">
            <div className="max-w-3xl mx-auto px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-3 md:mb-4 drop-shadow-lg">
                Krása starých časů
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-serif mb-3 md:mb-4 text-white/95 italic drop-shadow-md">
                Poklady které nezestárly
              </p>
              <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-6 text-white/90 drop-shadow-md">
                Objevte původní československý porcelán z let 1950-1989
              </p>
              <div className="flex justify-center">
                <Link href="/produkty" className="btn-secondary text-base md:text-lg px-6 md:px-8 py-2 md:py-3 inline-block hover:bg-opacity-90 transition-all shadow-lg">
                  Prohlédnout katalog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Vybrané kousky
          </h2>
          <ProductGrid products={featuredProducts} />
          <div className="text-center mt-12">
            <Link href="/produkty" className="btn-primary text-lg">
              Zobrazit všechny produkty
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            O nás
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Specializujeme se na prodej autentického československého porcelánu z období 50. až 80. let. 
            Každý kousek v naší nabídce je pečlivě vybraný a představuje kus historie, který přináší 
            krásu a eleganci do vašeho domova.
          </p>
          <Link href="/o-nas" className="btn-primary">
            Více o nás
          </Link>
        </div>
      </section>
    </div>
  )
}
