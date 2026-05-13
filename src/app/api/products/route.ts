import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(*)')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const adminEmail = process.env.ADMIN_EMAIL
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Nepovolen přístup' }, { status: 401 })
  }

  const body = await request.json()
  const { images, ...productData } = body

  const supabase = createAdminClient()

  const { data: product, error } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (images && images.length > 0) {
    const imageRecords = images.map((url: string, index: number) => ({
      product_id: product.id,
      url,
      is_primary: index === 0,
      order_index: index,
    }))
    await supabase.from('product_images').insert(imageRecords)
  }

  return NextResponse.json(product)
}

export async function DELETE(request: NextRequest) {
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Nepovolen přístup' }, { status: 401 })
  }

  const { id } = await request.json()
  const supabase = createAdminClient()

  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
