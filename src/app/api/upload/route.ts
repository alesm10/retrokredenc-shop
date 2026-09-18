import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs/promises'
import { overAdmina } from '@/lib/overeni'

const MAX_VELIKOST = 15 * 1024 * 1024

export async function POST(request: NextRequest) {
  const zamitnuto = await overAdmina(request)
  if (zamitnuto) return zamitnuto

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) return NextResponse.json({ error: 'Žádný soubor' }, { status: 400 })
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Soubor není obrázek' }, { status: 400 })
  }
  if (file.size > MAX_VELIKOST) {
    return NextResponse.json({ error: 'Fotka je moc velká' }, { status: 413 })
  }

  // Jen bezpečné znaky — název nesmí vést mimo složku uploads
  const bezpecnyNazev = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, '_')
  const fileName = `${Date.now()}-${bezpecnyNazev}`
  const uploadDir = path.join(process.cwd(), 'uploads')
  await fs.mkdir(uploadDir, { recursive: true })

  const bytes = await file.arrayBuffer()
  await fs.writeFile(path.join(uploadDir, fileName), Buffer.from(bytes))

  return NextResponse.json({ url: `/api/files/${fileName}` })
}
