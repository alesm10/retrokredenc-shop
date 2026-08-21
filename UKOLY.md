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

## 0. ⚠ Tajný klíč Supabase natvrdo ve skriptu — přednostní

**Nalezeno 20. 8. 2026.** Soubor `scripts/migrate-products.mjs` (rozdělaná
práce, nikdy nezapsaná do gitu) má **tajný klíč k Supabase napsaný přímo
v kódu**, ne v `.env.local`.

**Proč to spěchá i přes malou hodnotu webu:** tenhle repozitář je na GitHubu
**veřejný** a `.gitignore` ten soubor nepokrývá. Jediné `git add -A` a klíč je
venku pro kohokoli. Ověřeno, že se to zatím nestalo — v historii gitu soubor
není. A klíč platí pro **celý projekt v Supabase**, ne jen pro tenhle web.

**Co udělat, v tomhle pořadí:**

1. **Zneplatnit klíč v Supabase** (Project Settings → API → rotace klíče).
   Smazat soubor nestačí — klíč platí, dokud ho nezruší ten, kdo ho vydal.
2. Rozhodnout, co se skriptem: převod dat ze Supabase na PostgreSQL už
   proběhl, takže je nejspíš k ničemu → **smazat**. Když má ještě dobíhat,
   přepsat ho tak, aby klíč bral z `process.env`, a přidat do `.gitignore`.
3. Ověřit, jestli projekt v Supabase ještě existuje a jestli v něm nezůstala
   data. Když nezůstala, **zrušit ho celý** — nebude co unikat a odpadne
   i bod 2.

⚠ Do vyřešení **nepouštět `git add -A`** v tomhle repozitáři.

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

## 3. Mapa webu čte ze staré `products.json` místo z databáze

**Nalezeno 20. 8. 2026. Dopad: Google nevidí nové zboží.**

`src/app/sitemap.ts` importuje `getProducts` z `@/data/products`, což je
statická vrstva z doby před databází (`src/data/products.json`). Zbytek webu
přitom čte z PostgreSQL přes `src/lib/supabase-server.ts`.

**Co udělat:**

1. Přepsat `sitemap.ts`, ať bere zboží ze stejného zdroje jako zbytek webu
   (`getProducts` z `@/lib/supabase-server`, je `async`).
2. Ověřit `/sitemap.xml` po sestavení — musí obsahovat produkt přidaný
   přes administraci.
3. Teprve pak zvážit smazání `src/data/products.json` a `products.ts`.

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
