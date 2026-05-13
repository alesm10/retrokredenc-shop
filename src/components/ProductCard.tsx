import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  price: number
  year?: string
  image?: string
  available?: boolean
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/produkty/${product.id}`} className="card block">
      <div className="relative h-64 bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Bez fotky
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-serif mb-2 text-text">{product.name}</h3>
        {product.year && <p className="text-sm text-gray-600 mb-2">Rok: {product.year}</p>}
        <p className="text-xl font-semibold text-primary">{product.price} Kč</p>
      </div>
    </Link>
  )
}
