import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const MIME: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg',
  png: 'image/png', webp: 'image/webp',
  gif: 'image/gif', avif: 'image/avif',
}

export async function GET(_: NextRequest, { params }: { params: { filename: string } }) {
  const filename = path.basename(params.filename)
  const filePath = path.join(process.cwd(), 'uploads', filename)

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const contentType = MIME[ext] || 'application/octet-stream'
  const buffer = fs.readFileSync(filePath)

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=2592000',
    },
  })
}
