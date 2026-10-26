import { appendFile, mkdir, readFile, readdir } from 'fs/promises'
import path from 'path'

// Počítadlo návštěv bez cookies a bez IP adres. Ukládá jen: čas, kterou
// stránku, z jaké domény člověk přišel a jestli je to mobil nebo počítač.
// ⚠ Volá se z prohlížeče (`Pocitadlo.tsx`), ne ze serverové stránky —
// stránky se kešují (`revalidate = 60`), takže serverový zápis by část
// návštěv minul. Roboti skript ve stránce většinou nespustí.

const SLOZKA = path.join(process.cwd(), 'navstevy')
const ROBOT = /bot|crawl|spider|slurp|facebookexternalhit|preview|monitor|curl|wget|headless|lighthouse|python-requests/i

function souborProMesic(d = new Date()) {
  return path.join(SLOZKA, `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}.jsonl`)
}

/** Doména, odkud návštěvník přišel — ⚠ jen doména, nikdy celá adresa. */
function odkud(referer?: string | null): string | null {
  if (!referer) return null
  try {
    const h = new URL(referer).hostname.replace(/^www\./, '')
    return h === 'retrokredenc.cz' ? 'vlastni' : h.slice(0, 40)
  } catch {
    return null
  }
}

export async function zapisNavstevu(zaznam: {
  cesta?: string
  referer?: string | null
  ua?: string | null
}): Promise<void> {
  try {
    if (ROBOT.test(zaznam.ua || '')) return
    await mkdir(SLOZKA, { recursive: true })
    await appendFile(
      souborProMesic(),
      JSON.stringify({
        kdy: new Date().toISOString(),
        cesta: (zaznam.cesta || '/').slice(0, 80),
        odkud: odkud(zaznam.referer),
        zarizeni: /mobile|android|iphone|ipad/i.test(zaznam.ua || '') ? 'mobil' : 'pocitac',
      }) + '\n',
      'utf8',
    )
  } catch (e: any) {
    // Chyba zápisu nesmí shodit stránku — návštěva se prostě nezapočítá
    console.error('[navstevy] nezapsano:', e.message)
  }
}

type Zaznam = { kdy: string; cesta: string; odkud: string | null; zarizeni: string }

export async function souhrn(dnuZpet = 30) {
  let radky: Zaznam[] = []
  try {
    const soubory = (await readdir(SLOZKA)).filter((f) => f.endsWith('.jsonl')).sort().slice(-2)
    for (const f of soubory) {
      const obsah = await readFile(path.join(SLOZKA, f), 'utf8')
      for (const r of obsah.split('\n')) {
        if (!r) continue
        try { radky.push(JSON.parse(r)) } catch { /* poškozený řádek přeskoč */ }
      }
    }
  } catch {
    return { zobrazeni: 0, mobil: 0, dny: {}, stranky: {}, zdroje: {} }
  }

  const od = Date.now() - dnuZpet * 86400_000
  radky = radky.filter((x) => new Date(x.kdy).getTime() >= od)

  const spocitej = (klic: (x: Zaznam) => string) => {
    const m: Record<string, number> = {}
    for (const x of radky) { const k = klic(x); m[k] = (m[k] || 0) + 1 }
    return Object.fromEntries(Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 15))
  }

  return {
    zobrazeni: radky.length,
    mobil: radky.filter((x) => x.zarizeni === 'mobil').length,
    dny: spocitej((x) => x.kdy.slice(0, 10)),
    stranky: spocitej((x) => x.cesta),
    zdroje: spocitej((x) => x.odkud || 'přímo'),
  }
}
