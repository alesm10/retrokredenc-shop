'use client'

import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (images.length === 0) return null

  return (
    <div>
      <div className="relative h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={images[selectedImage]}
          alt={`${productName} - fotka ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

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
              <img
                src={img}
                alt={`${productName} - náhled ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
