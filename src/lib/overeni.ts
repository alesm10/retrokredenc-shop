import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

// Ochrana proti hádání hesla: po 5 špatných pokusech z jedné adresy se na
// 15 minut přestane zkoušet a každý špatný pokus navíc trvá sekundu.
// Počítadlo žije v paměti serveru, restart ho vynuluje.
// Adresu návštěvníka posílá nginx v hlavičce X-Real-IP — bez ní se všichni
// počítají jako jeden (zamkne se celá administrace, ne jen útočník).
const MAX_POKUSU = 5
const ZAMCENO_MS = 15 * 60 * 1000
const pokusy = new Map<string, { pocet: number; od: number }>()

function hesloSedi(zadane: string | null) {
  const spravne = process.env.ADMIN_PASSWORD
  if (!zadane || !spravne) return false
  const a = Buffer.from(zadane)
  const b = Buffer.from(spravne)
  return a.length === b.length && timingSafeEqual(a, b)
}

// Vrací null, když je přístup povolen, jinak odpověď s chybou.
export async function overAdmina(request: NextRequest): Promise<NextResponse | null> {
  const kdo = request.headers.get('x-real-ip') || 'neznama'
  let zaznam = pokusy.get(kdo)
  if (zaznam && Date.now() - zaznam.od > ZAMCENO_MS) {
    pokusy.delete(kdo)
    zaznam = undefined
  }
  if (zaznam && zaznam.pocet >= MAX_POKUSU) {
    return NextResponse.json({ error: 'Příliš mnoho pokusů, zkus to za 15 minut' }, { status: 429 })
  }
  if (hesloSedi(request.headers.get('x-admin-key'))) {
    pokusy.delete(kdo)
    return null
  }
  pokusy.set(kdo, { pocet: (zaznam?.pocet ?? 0) + 1, od: zaznam?.od ?? Date.now() })
  await new Promise(r => setTimeout(r, 1000))
  return NextResponse.json({ error: 'Nepovolen přístup' }, { status: 401 })
}
