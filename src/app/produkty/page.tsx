import { Metadata } from 'next'
import ProductGrid from '@/components/ProductGrid'
import { createAdminClient } from '@/lib/supabase-server'

export const metadata: Metadata = {
  title: 'Produkty | Retro Kredenc - Československý porcelán',
  description: 'Prohlédněte si naši nabídku autentického československého porcelánu z let 1950-1989. Hrnečky, talířky a další retro kousky.',
  openGraph: {
    title: 'Produkty | Retro Kredenc',
    description: 'Prohlédněte si naši nabídku autentického československého porcelánu',
  },
}

export const revalidate = 60

export default async function ProduktyPage() {
  const supabase = createAdminClient()
  const { data: products } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .eq('available', true)
    .order('created_at', { ascending: false })

  const mapped = (products || []).map((p: any) => ({
    id: p.product_number,
    name: p.name,
    price: p.price,
    category: p.category,
    year: p.year,
    description: p.description,
    available: p.available,
    image: p.product_images?.find((i: any) => i.is_primary)?.url || p.product_images?.[0]?.url || '',
    images: p.product_images?.map((i: any) => i.url) || [],
  }))

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-center mb-12">
          Naše produkty
        </h1>
        {mapped.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Momentálně nemáme žádné produkty k dispozici.</p>
        ) : (
          <ProductGrid products={mapped} />
        )}
      </div>
    </div>
  )
}
