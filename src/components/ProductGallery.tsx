'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (images.length === 0) {
    return null
  }

  const mainImage = images[selectedImage]

  return (
    <div>
      {/* Hlavní velká fotka */}
      <div className="relative h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden mb-4">
        <Image
          src={`/products/${mainImage}`}
          alt={`${productName} - fotka ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority={selectedImage === 0}
        />
      </div>
      
      {/* Thumbnail galerie - pokud je více fotek */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 bg-gray-100 rounded overflow-hidden transition-all ${
                selectedImage === index
                  ? 'ring-2 ring-primary ring-offset-2'
                  : 'hover:opacity-75'
              }`}
              aria-label={`Zobrazit fotku ${index + 1}`}
            >
              <Image
                src={`/products/${img}`}
                alt={`${productName} - náhled ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
