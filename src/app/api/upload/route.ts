import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'

export async function POST(request: NextRequest) {
  if (request.headers.get('x-admin-key') !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Nepovolen přístup' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) return NextResponse.json({ error: 'Žádný soubor' }, { status: 400 })

  const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`
  const uploadDir = path.join(process.cwd(), 'public', 'products')
  await fs.mkdir(uploadDir, { recursive: true })

  const bytes = await file.arrayBuffer()
  await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(bytes))

  return NextResponse.json({ url: `/products/${fileName}` })
}
