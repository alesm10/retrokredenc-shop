import { NextRequest, NextResponse } from 'next/server'
import { zapisNavstevu, souhrn } from '@/lib/navstevy'
import { overAdmina } from '@/lib/overeni'

// POST volá prohlížeč při otevření stránky, GET čte souhrn (jen s heslem).

export async function POST(request: NextRequest) {
  const { cesta } = (await request.json().catch(() => ({}))) as { cesta?: string }
  await zapisNavstevu({
    cesta,
    referer: request.headers.get('referer'),
    ua: request.headers.get('user-agent'),
  })
  // Odpověď je prázdná — stránce na ní nezáleží
  return new NextResponse(null, { status: 204 })
}

export async function GET(request: NextRequest) {
  const zamitnuto = await overAdmina(request)
  if (zamitnuto) return zamitnuto
  return NextResponse.json(await souhrn(30))
}
