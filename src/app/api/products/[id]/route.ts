import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'
import { overAdmina } from '@/lib/overeni'

// Jen tyhle sloupce se smí měnit — název sloupce jde přímo do SQL
const POVOLENA_POLE = ['name', 'description', 'price', 'category', 'year', 'available']

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const zamitnuto = await overAdmina(request)
  if (zamitnuto) return zamitnuto

  const { id } = await params
  const { images, ...body } = await request.json()
  const fields = Object.keys(body).filter((f) => POVOLENA_POLE.includes(f))

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    if (fields.length > 0) {
      const setClauses = fields.map((f, i) => `${f} = $${i + 1}`).join(', ')
      await client.query(
        `UPDATE products SET ${setClauses} WHERE id = $${fields.length + 1}`,
        [...fields.map((f) => body[f]), id]
      )
    }

    // Nové fotky se přidají za ty, které produkt už má
    if (Array.isArray(images) && images.length > 0) {
      const { rows } = await client.query(
        'SELECT COUNT(*)::int AS pocet, COALESCE(MAX(order_index), -1) AS posledni FROM product_images WHERE product_id = $1',
        [id]
      )
      for (let i = 0; i < images.length; i++) {
        await client.query(
          'INSERT INTO product_images (product_id, url, is_primary, order_index) VALUES ($1, $2, $3, $4)',
          [id, images[i], rows[0].pocet === 0 && i === 0, rows[0].posledni + 1 + i]
        )
      }
    }

    await client.query('COMMIT')
    return NextResponse.json({ success: true })
  } catch (e: any) {
    await client.query('ROLLBACK')
    return NextResponse.json({ error: e.message }, { status: 500 })
  } finally {
    client.release()
  }
}
