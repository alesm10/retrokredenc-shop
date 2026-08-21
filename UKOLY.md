# Úkoly — retrokredenc

> Věci, které jsou známé a odložené. Když se něco vyřeší, škrtnout a napsat
> kdy. Nálezy bez rozhodnutí patří do `GOTCHAS.md`, ne sem.
>
> **Tenhle seznam je jediné místo, kde tyhle úkoly žijí.** V AIOS se
> nepřipomínají — patří k webu, ne do druhého mozku.

## Jak se na ten web zatím dívat (rozhodnuto 21. 8. 2026)

Web je veřejně dostupný, ale **Verča ho zatím nepoužívá** a žádný skutečný
provoz na něm neběží. Kdyby se někdo dostal do administrace, škoda by byla
malá — nejsou tam objednávky ani platby, jen zboží a fotky, které existují
i jinde.

Z toho plyne priorita: **body 0 a 1 vyřešit, protože se týkají klíčů, které
platí i mimo tenhle web.** Zbytek počká na **kompletní revizi webu**, kterou
Aleš plánuje, až bude čas. Do té doby se web nepředělává po kouskách.

---

## 0. ✅ Tajný klíč Supabase — vyřešeno 21. 8. 2026

Ve `scripts/migrate-products.mjs` ležel klíč k Supabase v otevřeném textu.
Skript nikdy nebyl v gitu, ale repozitář je veřejný a `.gitignore` ho nekryl.

**Ukázalo se, že klíč už nic neodemyká.** Projekt v Supabase neexistuje —
jeho adresa se nedá ani přeložit (`NXDOMAIN`), a Aleš potvrdil z účtu, že
v organizaci `alesm10's Org` **není ani jeden projekt** a spotřeba je nulová.
Rotovat tedy nebylo co.

**Hotovo:** skript smazán. Ověřeno, že v repozitáři nezůstal žádný zapsaný
klíč — `src/lib/supabase.ts` obsahuje jen názvy proměnných (`process.env`),
ne hodnoty. Živý web na VPS nemá v konfiguraci ani jednu proměnnou Supabase.

Poučení: **mrtvý klíč vypadá pro nálezce stejně jako živý.** Odklidit se má
tak jako tak.

## 1. ⚠ Vyměnit heslo do administrace — přednostní

**Otevřené od 20. 8. 2026.** Heslo leželo v otevřeném textu v poznámkovém
souboru (`gotchas.md` ve složce `Cursor vibecoding`) a při práci s ním se
dostalo i do transkriptu Claude Code na disku. Soubor je smazaný, ale to
heslo nezneplatní.

Je tady i druhý důvod, proč to nenechat ležet: **stejné nebo podobné heslo
se snadno používá i jinde.** Únik z bezvýznamného webu pak přestane být
bezvýznamný.

Postup je v AIOS: `.claude/skills/hesla-a-klice/`. Pořadí je důležité —
nasadit nové na VPS, restartovat `pm2 restart retrokredenc --update-env`,
ověřit, teprve pak zahodit staré.

---

## 2. Administrace nemá ochranu proti hádání hesla

**Otevřené od 18. 8. 2026.** Přihlášení porovná hlavičku `x-admin-key` s
`process.env.ADMIN_PASSWORD` (`src/app/api/admin/route.ts` a dál v
`api/products`, `api/upload`). Neúspěšný pokus **nic nestojí** — dá se hádat
donekonečna a jakkoli rychle.

**Co udělat:** zpoždění po neúspěšném pokusu, případně dočasné zablokování
po několika pokusech za sebou. Stačí jednoduché počítadlo podle IP adresy.

Patří do kompletní revize webu.

## 3. Mapa webu ukazuje na neexistující stránky — a ty vracejí chybu

**Nalezeno 20. 8., rozsah upřesněn 21. 8. 2026.**

`src/app/sitemap.ts` čte zboží ze staré statické vrstvy `src/data/products.json`,
zatímco zbytek webu čte z databáze. A ta dvě místa mají **úplně jiná ID**:

| Kde | Jak vypadá ID |
|---|---|
| `products.json` (mrtvá vrstva) | `kralovsky1`, `oranzovykvet1`, `sadagold1` |
| databáze (skutečnost) | UUID — `7e28bb42-e931-…` |

**Dopad je dvojí a ten druhý je horší:**

1. Google nevidí zboží přidané přes administraci.
2. **Sitemap Googlu nabízí tři adresy, které neexistují.** Při jejich procházení
   se textové ID překládá na číslo, vyjde `NaN`, dotaz do databáze spadne
   a server vrátí chybu. V logu je **92 výskytů**, poslední 21. 8. Chyba serveru
   je pro vyhledávač horší signál než chybějící stránka.

**Co udělat:**

1. Přepsat `sitemap.ts`, ať bere zboží ze stejného zdroje jako zbytek webu
   (`getProducts` z `@/lib/supabase-server`, je `async`).
2. **Ošetřit `/produkty/[id]` na neznámé ID** — má vrátit „nenalezeno" (404),
   ne spadnout. Teď si kdokoli vymyslí adresu a vyrobí chybu v logu.
3. Ověřit `/sitemap.xml` po sestavení — musí obsahovat produkt přidaný přes
   administraci a žádnou z těch tří starých adres.
4. Teprve pak zvážit smazání `src/data/products.json` a `products.ts`.

Kontrola, jestli chyby ustaly:
`ssh alesvps@152.239.117.152 "grep -c NaN ~/.pm2/logs/retrokredenc-error.log"`

⚠ Nasazuje se na VPS, ne přes GitHub — viz `GOTCHAS.md`.

## 4. Uklidit zbytky po přechodu ze Supabase

`src/lib/supabase-server.ts` se Supabase nemluví, balíčky `@supabase/*`
v `package.json` nic nepohánějí a `.github/workflows/deploy.yml` nasazuje na
GitHub Pages, kde web nežije. Podrobně v `GOTCHAS.md`.

## 5. ✅ Záloha na NAS — vyřešeno 21. 8. 2026

Kopie záloh na NAS tři dny (18.–20. 8.) neprošla a nikdo o tom nevěděl.

**Příčina nebyla na NASu.** `Operation not permitted` na síťovém svazku vydává
macOS — programy tam nesmí bez Plného přístupu k disku. Finder ho má, úloha na
pozadí ne.

**Řešení: Mac je z cesty pryč.** NAS si zálohy stahuje z VPS sám (Plánovač úloh
DSM, denně v 10:00, vlastní SSH klíč). Mac si je stahuje nezávisle ve 20:00.
Tři kopie, dvě nezávislé cesty — když jedna vypadne, druhá jede dál.

Ověřeno kontrolními součty: všech 13 souborů na NASu sedí s VPS.

**Kontrola, když bude potřeba:**
- NAS: `Projekty/Retrokredenc/zaloha-z-vps.log`
- Mac: `tail -5 ~/Data/_zalohy/stahovani.log` — a při selhání navíc vyskočí
  systémové upozornění

Nastavení celé úlohy: AIOS → `infrastruktura/VYSTUPY/nas-stahuje-zalohy-z-vps.md`.
