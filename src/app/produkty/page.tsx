import { Metadata } from 'next'
import ProductGrid from '@/components/ProductGrid'
import { getAvailableProducts } from '@/data/products'

export const metadata: Metadata = {
  title: 'Produkty | Retro Kredenc - Československý porcelán',
  description: 'Prohlédněte si naši nabídku autentického československého porcelánu z let 1950-1989. Hrnečky, talířky a další retro kousky.',
  openGraph: {
    title: 'Produkty | Retro Kredenc',
    description: 'Prohlédněte si naši nabídku autentického československého porcelánu',
  },
}

export default function ProduktyPage() {
  const products = getAvailableProducts()

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">
          Naše produkty
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
