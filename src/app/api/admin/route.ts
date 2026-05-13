import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('x-admin-key')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Špatné heslo' }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
