# Úkoly — retrokredenc

> Věci, které jsou známé a odložené. Když se něco vyřeší, škrtnout a napsat
> kdy. Nálezy bez rozhodnutí patří do `GOTCHAS.md`, ne sem.
>
> **Tenhle seznam je jediné místo, kde tyhle úkoly žijí.** V AIOS se
> nepřipomínají — patří k webu, ne do druhého mozku.

## Jak se na ten web dívat (rozhodnuto 18. 9. 2026)

**Web bude žít.** Verča na něj postupně vkládá zboží — na mobilu nafotí,
v administraci napíše popisky a vloží fotky. Aleš web udržuje sám s pomocí
Clauda; pronajatý e-shop (Shoptet a pod.) byl zvážen a odmítnut.

Z toho plyne: administrace se musí dát pohodlně používat **z telefonu**
a údržba (aktualizace Next.js) se dělá průběžně, ne jednou za rok.

Do 18. 9. platilo rozhodnutí z 21. 8. — web se nepoužívá, předělá se najednou
při kompletní revizi. Ta revize proběhla 18. 9. (bod 6).

---

## Otevřené

### 8. Propagace webu — nápad, zatím se nestaví

Automatizovat se to dá (na VPS už běží n8n): nové zboží samo na Facebook
a Instagram, soubor s nabídkou (feed) pro Zboží.cz a Heureku, bezplatné
výpisy v Google Shopping. **Smysl to má, až bude zboží.**

K zvážení: retro porcelán se prodává hlavně ve facebookových skupinách, na
Vintedu a Aukru. Web pak může být katalog a automat rozesílá tam, kde jsou
kupci.

Předtím levný krok: přihlásit web do **Google Search Console** a odeslat mapu
webu. Jestli už přihlášený je, nikdo neověřoval.

### 9. Drobnosti, na které se narazilo — neurgentní

- Heslo do administrace si telefon pamatuje v prohlížeči (`localStorage`),
  dokud se neodhlásí. Vědomě ponecháno — Verča se nemusí přihlašovat pořád.
- Mapa webu se obnovuje jednou za hodinu — nový produkt se v ní objeví se
  zpožděním.
- V popisu repozitáře na GitHubu (About) visí odkaz na `retrokredenc-shop.vercel.app`,
  kde nic neběží.
- `.env.local` na Macu je z 13. 5. 2026 a má staré hodnoty. Pro práci nevadí
  (na Macu se web plně nesestaví, viz `GOTCHAS.md`).

---

## Hotové

### 10. ✅ Úklid repozitáře — 18. 9. 2026

Smazáno, co popisovalo nebo obsluhovalo staré podoby webu: `navody/` (29 návodů
k Vercelu, NASu, GitHub Pages a ruční úpravě `products.json`), `scripts/`
(kopírování fotek z Google Drive), fotky tří ukázkových produktů
v `public/products/` a `public/images/KAM_VLOZIT_KREDENC.md` (ležel veřejně na
webu). `README.md` a `env.example` přepsány podle skutečnosti. V historii gitu
všechno zůstává.

Na serveru smazáno 6 zkušebních souborů z 11. 6. (na žádný neukazoval produkt,
ověřeno v databázi) a prázdná `public/products/`. Fotky zboží jsou jen v `uploads/`.

### 7. ✅ Fotky z opravdového telefonu — 18. 9. 2026

První skutečný produkt („Broušená váza", 20:12) přidaný z telefonu s Androidem:
3 fotky po 80–145 kB, zmenšování v telefonu funguje.

Při té zkoušce Aleš našel: **u uloženého produktu nešlo fotky smazat ani
přeřadit** — jen smazat celý produkt a vystavit znovu. Opraveno týž večer:
při úpravě má každá fotka tlačítka ◀ ✕ ▶, první je hlavní (ukazuje se
v katalogu). Odebraná fotka se smaže z databáze i z disku až po „Uložit změny".

### 6. ✅ Revize webu — 18. 9. 2026

Audit celého kódu a opravy nasazené na VPS týž den. Každá část vyzkoušená na
serveru ve zkušební kopii vedle živého webu, pak nasazená a ověřená zvenku.

| Co | Jak |
|---|---|
| **Fotky z mobilu padaly** | nginx pouštěl jen 1 MB, fotka z telefonu má 3–5 MB. Admin teď fotku **zmenší v telefonu** na 1600 px (≈ 150 kB) a nginx má limit 20 MB jako pojistku. |
| **Next.js 14 → 16**, React 19 | kritické díry v Next.js; `npm audit` hlásí 0 |
| nodemailer 10, sharp 0.35.4 | známé díry |
| **Úprava zboží, „Označit jako prodané"** | dřív šlo zboží jen přidat a smazat |
| Ochrana proti hádání hesla | bod 2 |
| Mapa webu z databáze, neznámé ID → 404 | bod 3 |
| Úklid po Supabase a GitHub Pages | bod 4 |
| Kanonická adresa | každá stránka tvrdila Googlu, že je kopií titulní — produkty by se nezařadily |
| Náhled pro sdílení | adresy fotek jsou úplné (`metadataBase`) |
| Nahrávání | jen obrázky, max. 15 MB, bezpečný název souboru |
| Úprava produktu přes API | jen povolené sloupce |
| Smazání produktu | smaže i jeho nahrané fotky z disku |
| Kontaktní formulář | past na roboty (skryté pole), chyba neshodí server |
| Administrace | políčko s fotkami se po uložení vyčistí; seznam čitelný na mobilu; staré uložené heslo se samo zahodí |

### 1. ✅ Heslo do administrace — vyměněno 21. 8. 2026

Aleš ho zadal přímo na serveru, přes Clauda neprošlo. **Tady to zůstalo jako
otevřené až do 18. 9.** — ověřeno porovnáním otisků, že heslo na serveru není
to, které uniklo.

### 2. ✅ Ochrana proti hádání hesla — 18. 9. 2026

Po 5 špatných pokusech z jedné adresy je administrace pro tu adresu na
15 minut zamčená, každý špatný pokus navíc trvá sekundu. Podrobnosti
a podmínka, na které to stojí, v `GOTCHAS.md`.

### 3. ✅ Mapa webu a neexistující produkty — 18. 9. 2026

`sitemap.ts` bere zboží z databáze. Adresa produktu, která není číslo
(`/produkty/kralovsky1`), vrací 404 místo chyby serveru.

### 4. ✅ Zbytky po Supabase a GitHub Pages — 18. 9. 2026

Smazáno: `src/lib/supabase.ts`, balíčky `@supabase/*`, `src/data/`,
`.github/` (workflow pro GitHub Pages), statický export `retrokredenc/`,
`index.html`. `supabase-server.ts` přejmenován na `src/lib/produkty.ts`.
GitHub Pages v nastavení repozitáře vypnuté (Aleš, 18. 9.) — **na
`alesm10.github.io/retrokredenc-shop` visela veřejně stará kopie e-shopu.**

### 0. ✅ Tajný klíč Supabase — 21. 8. 2026

Klíč ve `scripts/migrate-products.mjs` už nic neodemykal (projekt v Supabase
neexistuje). Skript smazán. Poučení: **mrtvý klíč vypadá pro nálezce stejně
jako živý.**

### 1b. ✅ WEDOS Global Protection — 21. 8. 2026: NEPLATIT

Doména ukazuje přímo na VPS, ochrana není v cestě provozu. Výzvu k platbě
neuhradit; služba se 25. 9. vypne a nic se nestane. Kdyby ochrana někdy byla
potřeba, Cloudflare umí totéž zdarma.

### 5. ✅ Záloha na NAS — 21. 8. 2026

NAS si zálohy stahuje z VPS sám (denně v 10:00), Mac nezávisle ve 20:00.
Kontrola: NAS `Projekty/Retrokredenc/zaloha-z-vps.log`, Mac
`tail -5 ~/Data/_zalohy/stahovani.log`. Nastavení: AIOS →
`infrastruktura/VYSTUPY/nas-stahuje-zalohy-z-vps.md`.
