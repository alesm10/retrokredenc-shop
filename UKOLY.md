# Úkoly — retrokredenc

> Věci, které jsou známé a odložené. Když se něco vyřeší, škrtnout a napsat
> kdy. Nálezy bez rozhodnutí patří do `GOTCHAS.md`, ne sem.

## 0. ⚠ Tajný klíč Supabase natvrdo ve skriptu — přednostní

**Nalezeno 20. 8. 2026.** Soubor `scripts/migrate-products.mjs` (rozdělaná
práce, nikdy nezapsaná do gitu) má **tajný klíč k Supabase napsaný přímo
v kódu**, ne v `.env.local`.

**Proč to spěchá:** tenhle repozitář je na GitHubu **veřejný** a soubor
`.gitignore` ho nepokrývá. Jediné `git add -A` a klíč je venku pro kohokoli.
Ověřeno, že se to zatím nestalo — v historii gitu soubor není.

**Co udělat, v tomhle pořadí:**

1. **Zneplatnit klíč v Supabase** (Project Settings → API → rotace klíče).
   Smazat soubor nestačí — klíč platí, dokud ho nezruší ten, kdo ho vydal.
2. Rozhodnout, co se skriptem: převod dat ze Supabase na PostgreSQL už
   proběhl, takže je nejspíš k ničemu → **smazat**. Když má ještě dobíhat,
   přepsat ho tak, aby klíč bral z `process.env`, a přidat do `.gitignore`.
3. Ověřit, jestli projekt v Supabase ještě existuje a jestli v něm nezůstala
   data. Když nezůstala, zrušit ho celý — nebude co unikat.

⚠ Do té doby **nepouštět `git add -A`** v tomhle repozitáři.

## 1. Mapa webu čte ze staré `products.json` místo z databáze

**Nalezeno 20. 8. 2026. Dopad: Google nevidí nové zboží.**

`src/app/sitemap.ts` importuje `getProducts` z `@/data/products`, což je
statická vrstva z doby před databází (`src/data/products.json`). Zbytek webu
přitom čte z PostgreSQL přes `src/lib/supabase-server.ts`.

Důsledek: v mapě webu jsou produkty, které tam byly při posledním ručním
zápisu do JSON — a chybí všechno, co od té doby přibylo přes administraci.

**Co udělat:**

1. Přepsat `sitemap.ts`, ať bere zboží ze stejného zdroje jako zbytek webu
   (`getProducts` z `@/lib/supabase-server`, je `async`).
2. Ověřit `/sitemap.xml` po sestavení — musí obsahovat produkt přidaný
   přes administraci.
3. Teprve pak zvážit smazání `src/data/products.json` a `products.ts`;
   po opravě už na ně nic neukazuje.

⚠ Nasazuje se na VPS, ne přes GitHub — viz `GOTCHAS.md`.

## 2. Administrace nemá ochranu proti hádání hesla

**Otevřené od 18. 8. 2026.**

Přihlášení do administrace porovná hlavičku `x-admin-key` s
`process.env.ADMIN_PASSWORD` (`src/app/api/admin/route.ts` a dál v
`api/products`, `api/upload`). Neúspěšný pokus **nic nestojí** — dá se hádat
donekonečna a jakkoli rychle.

Heslo je krátké, zvolené záměrně kvůli zapamatovatelnosti. Tím spíš rozhoduje
ta druhá půlka ochrany.

**Co udělat:** zpoždění po neúspěšném pokusu, případně dočasné zablokování
po několika pokusech za sebou. Stačí jednoduché počítadlo podle IP adresy.

## 3. Vyměnit heslo do administrace

**Otevřené od 20. 8. 2026.** Heslo leželo v otevřeném textu v poznámkovém
souboru a při práci s ním se dostalo i do transkriptu na disku. Soubor je
smazaný, ale to heslo nezneplatní.

Postup je v AIOS: `.claude/skills/hesla-a-klice/`. Pořadí je důležité —
nasadit nové na VPS, restartovat s `pm2 restart retrokredenc --update-env`,
ověřit, teprve pak zahodit staré.

## 4. Uklidit zbytky po přechodu ze Supabase

**Nespěchá, ale plete to.** `src/lib/supabase-server.ts` se Supabase nemluví,
balíčky `@supabase/*` v `package.json` nic nepohánějí a
`.github/workflows/deploy.yml` nasazuje na GitHub Pages, kde web nežije.
Podrobně v `GOTCHAS.md`.
