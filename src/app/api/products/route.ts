import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import pool from '@/lib/db'
import { getProducts } from '@/lib/produkty'
import { overAdmina } from '@/lib/overeni'

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const zamitnuto = await overAdmina(request)
  if (zamitnuto) return zamitnuto

  const body = await request.json()
  const { images, ...productData } = body

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const { rows } = await client.query(
      `INSERT INTO products (name, description, price, category, year, available, product_number)
       VALUES ($1, $2, $3, $4, $5, $6, (SELECT COALESCE(MAX(product_number), 0) + 1 FROM products))
       RETURNING *`,
      [productData.name, productData.description, productData.price, productData.category, productData.year, productData.available ?? true]
    )
    const product = rows[0]

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        await client.query(
          `INSERT INTO product_images (product_id, url, is_primary, order_index) VALUES ($1, $2, $3, $4)`,
          [product.id, images[i], i === 0, i]
        )
      }
    }

    await client.query('COMMIT')
    return NextResponse.json(product)
  } catch (e: any) {
    await client.query('ROLLBACK')
    return NextResponse.json({ error: e.message }, { status: 500 })
  } finally {
    client.release()
  }
}

export async function DELETE(request: NextRequest) {
  const zamitnuto = await overAdmina(request)
  if (zamitnuto) return zamitnuto

  const { id } = await request.json()
  try {
    const { rows } = await pool.query('SELECT url FROM product_images WHERE product_id = $1', [id])
    await pool.query('DELETE FROM products WHERE id = $1', [id])

    // Nahrané fotky smazaného produktu by jinak zůstaly ležet na disku
    for (const { url } of rows) {
      if (!url.startsWith('/api/files/')) continue
      await fs.unlink(path.join(process.cwd(), 'uploads', path.basename(url))).catch(() => {})
    }
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
