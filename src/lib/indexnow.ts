// Ohlášení změny vyhledávačům, které podporují protokol IndexNow.
// ⛔ Google mezi nimi NENÍ a jeho vlastní rozhraní (Indexing API) se smí
// používat jen pro pracovní inzeráty a živé přenosy — pro nás je cesta
// k Googlu jedině mapa webu. Tohle míří hlavně na Seznam.cz (ověřeno
// 27. 10. 2026 v soupisu na indexnow.org/searchengines.json: bing, yandex,
// seznam, naver, yep, internetarchive, amazonbot).

const KLIC = 'd4c67b7efdae8bd5e208c71bd51cae45'
const WEB = 'https://retrokredenc.cz'

// Ohlásí adresy. Nikdy nevyhazuje výjimku a na nic se nečeká — když
// vyhledávač neodpoví, je to jeho věc, uložení produktu to nesmí shodit.
export function ohlasZmenu(cesty: string[]): void {
  // ⚠ Bez `Set` schválně — rozbalení `Set` neprojde kontrolou typů (TS2802)
  const vsechny = ['/', '/produkty'].concat(cesty)
  const urlList = vsechny
    .filter((c, i) => vsechny.indexOf(c) === i)
    .map((c) => `${WEB}${c === '/' ? '' : c}`)

  fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'retrokredenc.cz',
      key: KLIC,
      keyLocation: `${WEB}/${KLIC}.txt`,
      urlList,
    }),
  })
    .then((r) => console.log(`[indexnow] ${r.status} pro ${urlList.length} adres`))
    .catch((e) => console.log(`[indexnow] neohlášeno: ${e.message}`))
}
