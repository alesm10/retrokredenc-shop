import { NextRequest, NextResponse } from 'next/server'
import { overAdmina } from '@/lib/overeni'

export async function GET(request: NextRequest) {
  const zamitnuto = await overAdmina(request)
  if (zamitnuto) return zamitnuto
  return NextResponse.json({ ok: true })
}
