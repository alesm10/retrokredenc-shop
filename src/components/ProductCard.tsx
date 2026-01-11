import Link from 'next/link'
import Image from 'next/image'
import { Product, getProductImages } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const images = getProductImages(product)
  const mainImage = images[0]

  return (
    <Link href={`/produkty/${product.id}`} className="card block">
      <div className="relative h-64 bg-gray-100">
        <Image
          src={`/products/${mainImage}`}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-serif mb-2 text-text">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">Rok: {product.year}</p>
        <p className="text-xl font-semibold text-primary">{product.price} Kč</p>
      </div>
    </Link>
  )
}
