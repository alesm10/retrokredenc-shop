'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Ohlásí zobrazení stránky počítadlu. Bez cookies, bez IP — viz `src/lib/navstevy.ts`.
// ⚠ Zobrazení se hlásí po vykreslení, takže roboti, kteří nespouštějí skripty,
// se nezapočítají. To je záměr: chceme počet lidí, ne počet požadavků.
export default function Pocitadlo() {
  const cesta = usePathname()

  useEffect(() => {
    // Administrace není návštěva obchodu
    if (cesta?.startsWith('/admin')) return
    const t = setTimeout(() => {
      fetch('/api/navsteva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cesta }),
        keepalive: true,
      }).catch(() => { /* na nezapsané návštěvě nezáleží */ })
    }, 1500) // 1,5 s — kdo hned odskočí, se nepočítá
    return () => clearTimeout(t)
  }, [cesta])

  return null
}
