import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  if (request.headers.get('x-admin-key') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Nepovolen přístup' }, { status: 401 })
  }

  const body = await request.json()
  const fields = Object.keys(body)
  if (fields.length === 0) return NextResponse.json({ success: true })

  const setClauses = fields.map((f, i) => `${f} = $${i + 1}`).join(', ')
  const values = fields.map((f) => body[f])

  try {
    await pool.query(
      `UPDATE products SET ${setClauses} WHERE id = $${fields.length + 1}`,
      [...values, params.id]
    )
    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
