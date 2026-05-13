import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: string
  year: string
  available: boolean
  created_at: string
  product_images: ProductImage[]
}

export type ProductImage = {
  id: string
  product_id: string
  url: string
  is_primary: boolean
  order_index: number
}
