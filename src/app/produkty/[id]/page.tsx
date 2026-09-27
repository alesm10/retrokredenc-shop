import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductByNumber } from '@/lib/produkty'
import ContactForm from '@/components/ContactForm'
import ProductGallery from '@/components/ProductGallery'
import { obdobi } from '@/lib/obdobi'

const WEB = 'https://retrokredenc.cz'

// Údaje pro Google: doprava a vracení. ⚠ Musí sedět s obchodními podmínkami —
// poštovné 89–130 Kč podle dopravce + balné 60 Kč, osobní odběr zdarma.
const DOPRAVA = {
  '@type': 'OfferShippingDetails',
  shippingRate: {
    '@type': 'MonetaryAmount',
    minValue: 149,
    maxValue: 190,
    currency: 'CZK',
  },
  shippingDestination: {
    '@type': 'DefinedRegion',
    addressCountry: 'CZ',
  },
  deliveryTime: {
    '@type': 'ShippingDeliveryTime',
    handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
    transitTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 4, unitCode: 'DAY' },
  },
}

// 14 dnů na odstoupení, zboží posílá kupující zpět na vlastní náklady
// (§ 5 obchodních podmínek, § 1829 občanského zákoníku)
const VRACENI = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: 'CZ',
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: 14,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/ReturnShippingFees',
}

export const revalidate = 60

interface Props {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  // Adresa s čímkoli jiným než číslem (třeba stará kralovsky1) = nenalezeno
  if (!/^\d+$/.test(id)) return null
  return getProductByNumber(parseInt(id))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).id)
  if (!product) return { title: 'Produkt nenalezen | Retro Kredenc' }
  return {
    title: `${product.name} | Retro Kredenc`,
    description: product.description,
    alternates: { canonical: `/produkty/${product.product_number}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.product_images?.map((i) => i.url) || [],
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct((await params).id)
  if (!product) notFound()

  const images = product.product_images
    ?.sort((a, b) => a.order_index - b.order_index)
    .map((i) => i.url) || []

  const adresa = `${WEB}/produkty/${product.product_number}`
  const obdobiVyroby = obdobi(product.year)

  // Údaje pro Google (karta Nákupy, Merchant Center): úplné adresy, použité zboží
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: images.map((url) => (url.startsWith('http') ? url : WEB + url)),
    url: adresa,
    sku: String(product.product_number),
    offers: {
      '@type': 'Offer',
      url: adresa,
      price: product.price,
      priceCurrency: 'CZK',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      shippingDetails: DOPRAVA,
      hasMerchantReturnPolicy: VRACENI,
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
            <ProductGallery images={images} productName={product.name} />
            <div>
              <h1 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h1>
              <div className="space-y-4 mb-6">
                {obdobiVyroby && <p className="text-lg text-gray-600">Období: {obdobiVyroby}</p>}
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
            <ContactForm productId={String(product.product_number)} />
          </div>
        </div>
      </div>
    </>
  )
}
