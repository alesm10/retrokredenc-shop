'use client'

import { useSyncExternalStore } from 'react'

/**
 * Aktuální rok do patičky.
 *
 * Proč celá komponenta kvůli jednomu číslu (10. 10. 2026): Footer je serverová
 * komponenta a stránky se předgenerují při sestavení, takže `new Date()` v něm
 * zamrzne na roce, kdy se web naposledy nasadil. Doloženo: v sestavení z
 * 27. 9. 2026 byl rok `2026` zapečený natvrdo v HTML, takže po Novém roce
 * by web hlásil loňský copyright, dokud by ho někdo nenasadil znovu.
 *
 * `useSyncExternalStore` je na tohle přímo určený: umí vrátit JINOU hodnotu
 * na serveru (`zaloha`, tedy rok ze sestavení) a jinou v prohlížeči (skutečný
 * rok). Obě vykreslení se tak shodnou a React nehlásí nesoulad.
 *
 * ⚠ Dřívější pokus přes `useState` + `useEffect` dělal totéž, ale lint ho
 * právem odmítl (`set-state-in-effect`): vynucoval druhé vykreslení navíc.
 */
export default function Rok({ zaloha }: { zaloha: number }) {
  const rok = useSyncExternalStore(
    () => () => {},                 // rok se za návštěvy nezmění, není co sledovat
    () => new Date().getFullYear(), // v prohlížeči: skutečný rok
    () => zaloha,                   // na serveru: rok ze sestavení
  )
  return <>{rok}</>
}
