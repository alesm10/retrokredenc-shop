import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Nepovolen přístup' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'Žádný soubor' }, { status: 400 })

  const supabase = createAdminClient()
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`
  const bytes = await file.arrayBuffer()

  const { error } = await supabase.storage
    .from('product-images')
    .upload(fileName, bytes, { contentType: file.type })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)

  return NextResponse.json({ url: data.publicUrl })
}
