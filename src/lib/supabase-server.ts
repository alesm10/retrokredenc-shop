import pool from './db'

export type ProductImage = {
  id: string
  product_id: string
  url: string
  is_primary: boolean
  order_index: number
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
  product_number: number
  product_images: ProductImage[]
}

const PRODUCT_WITH_IMAGES = `
  SELECT p.*,
    COALESCE(
      json_agg(pi.* ORDER BY pi.order_index) FILTER (WHERE pi.id IS NOT NULL),
      '[]'
    ) AS product_images
  FROM products p
  LEFT JOIN product_images pi ON pi.product_id = p.id
`

export async function getProducts(availableOnly = false, limit?: number): Promise<Product[]> {
  const where = availableOnly ? 'WHERE p.available = true' : ''
  const limitClause = limit ? `LIMIT ${limit}` : ''
  const { rows } = await pool.query(
    `${PRODUCT_WITH_IMAGES} ${where} GROUP BY p.id ORDER BY p.created_at DESC ${limitClause}`
  )
  return rows
}

export async function getProductByNumber(productNumber: number): Promise<Product | null> {
  const { rows } = await pool.query(
    `${PRODUCT_WITH_IMAGES} WHERE p.product_number = $1 GROUP BY p.id`,
    [productNumber]
  )
  return rows[0] || null
}

export async function getProductName(productNumber: number): Promise<{ name: string; product_number: number } | null> {
  const { rows } = await pool.query(
    'SELECT name, product_number FROM products WHERE product_number = $1',
    [productNumber]
  )
  return rows[0] || null
}
