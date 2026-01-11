import productsData from './products.json'

export interface Product {
  id: string
  name: string
  category: string
  year: string
  price: number
  description: string
  image: string // hlavní fotka (pro kompatibilitu)
  images?: string[] // pole více fotek (volitelné)
  available: boolean
}

// Pomocná funkce pro získání všech fotek produktu
export function getProductImages(product: Product): string[] {
  // Pokud má pole images, použij ho
  if (product.images && product.images.length > 0) {
    return product.images
  }
  // Jinak použij hlavní image
  return [product.image]
}

export function getProducts(): Product[] {
  return productsData.products
}

export function getProductById(id: string): Product | undefined {
  return productsData.products.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return productsData.products.filter(product => product.category === category)
}

export function getAvailableProducts(): Product[] {
  return productsData.products.filter(product => product.available)
}
