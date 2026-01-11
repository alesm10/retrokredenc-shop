import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductById, getProducts, getProductImages } from '@/data/products'
import ContactForm from '@/components/ContactForm'
import ProductGallery from '@/components/ProductGallery'

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const products = getProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductById(params.id)
  
  if (!product) {
    return {
      title: 'Produkt nenalezen | Retro Kredenc',
    }
  }

  const images = getProductImages(product)
  
  return {
    title: `${product.name} | Retro Kredenc`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: images.map(img => `/products/${img}`),
    },
  }
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  const images = getProductImages(product)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: images.map(img => `/products/${img}`),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'CZK',
      availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Hlavní fotka a galerie */}
            <ProductGallery images={images} productName={product.name} />
            <div>
              <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
              <div className="space-y-4 mb-6">
                <p className="text-lg text-gray-600">Rok: {product.year}</p>
                <p className="text-3xl font-semibold text-primary">{product.price} Kč</p>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
              {product.available ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded inline-block mb-6">
                  Dostupné
                </div>
              ) : (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded inline-block mb-6">
                  Vyprodáno
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-12">
            <h2 className="text-2xl font-serif mb-8 text-center">Máte zájem o tento produkt?</h2>
            <ContactForm productId={product.id} />
          </div>
        </div>
      </div>
    </>
  )
}
