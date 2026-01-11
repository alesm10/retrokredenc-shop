'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function HeroImage() {
  const [imageError, setImageError] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Zkusíme různé formáty obrázků v pořadí (PNG má přednost, protože ho máme)
  const imageFormats = [
    '/images/kredenc.png',
    '/images/kredenc.svg',
    '/images/kredenc.jpg',
    '/images/kredenc.jpeg',
  ]

  // Pokud obrázek neexistuje, zobrazíme prázdný prostor (nebo placeholder)
  if (imageError && currentImage >= imageFormats.length - 1) {
    return (
      <div className="relative w-full aspect-[4/3] border-2 border-white/20 flex items-center justify-center opacity-30" style={{ borderRadius: '80px' }}>
        <span className="text-white/40 text-sm">Kredenc obrázek</span>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden" style={{ borderRadius: '80px' }}>
      <Image
        src={imageFormats[currentImage]}
        alt="Retro kredenc s porcelánovou konvičkou"
        fill
        className={`object-contain transition-opacity duration-500 ${
          imageLoaded ? 'opacity-90' : 'opacity-0'
        }`}
        priority
        unoptimized
        sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 256px"
        onLoad={() => {
          console.log('Obrázek načten:', imageFormats[currentImage])
          setImageLoaded(true)
        }}
        onError={(e) => {
          console.log('Chyba načítání obrázku:', imageFormats[currentImage])
          // Zkusíme další formát, pokud tento neexistuje
          if (currentImage < imageFormats.length - 1) {
            setCurrentImage(currentImage + 1)
            setImageLoaded(false)
          } else {
            setImageError(true)
          }
        }}
      />
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-white/40 text-sm">Načítání...</div>
        </div>
      )}
    </div>
  )
}
