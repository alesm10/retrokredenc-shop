# Retro Kredenc — e-shop s československým porcelánem

> Web **retrokredenc.cz** — prodej autentického porcelánu z let 1950–1989.
> Soukromý rodinný projekt (v AIOS patří pod `soukromi/`), ne pracovní.
> Next.js 14 + PostgreSQL, jednoduchý admin pro přidávání zboží.
>
> **Autor je Aleš Miclík — vyučený soustružník, ne programátor.** Odborný pojem
> vysvětli hned při prvním použití jednou větou.

## ⚠ Živý web běží na VPS a nasazuje se přímo tam

Tenhle projekt má **tři místa, ne dvě**:

| Kde | Co to je |
|---|---|
| **Mac** (`~/Data/retrokredenc`) | tady se píše |
| **GitHub** `alesm10/retrokredenc-shop` | záloha historie — ⚠ **veřejný repozitář** |
| **VPS** `alesvps@152.239.117.152:~/retrokredenc-shop` | ⚠ **živý web zákazníků** |

**Push na GitHub není nasazení. A `git pull` z GitHubu nestačí** — server může
být napřed, protože se do něj sahá i přímo. V červnu 2026 byl Mac o šest
commitů pozadu a nikdo o tom nevěděl.

Než se něco změní, ověř, co na serveru vlastně běží:

```bash
ssh alesvps@152.239.117.152 "cd ~/retrokredenc-shop && git log -3 --oneline"
```

Na webu nakupují skuteční lidé. **Nasazení navrhni a nech potvrdit** — nikdy ho
neproveď mimochodem jako součást jiné práce.

## Tajemství — do chatu ani do commitu nepatří

V `.env.local` (v `.gitignore`, v historii gitu **není** — ověřeno 20. 8. 2026):
`ADMIN_PASSWORD`, `GMAIL_APP_PASSWORD`, `DB_PASSWORD`, staré Supabase klíče.

- **Hodnotu hesla nikdy nevypisuj** — ani do odpovědi, ani do zprávy commitu.
  Co se napíše do chatu, zůstane v čitelném transkriptu na disku.
- Pracuj s **názvy proměnných**, ne s obsahem (`process.env.ADMIN_PASSWORD`).
- Postup při zakládání a výměně klíčů je v AIOS: `.claude/skills/hesla-a-klice/`.
- ⚠ **Historické zatížení:** jeden starý commit má heslo do adminu přímo ve
  zprávě. Nesmazatelné bez přepisu historie — řeší se výměnou hesla, ne gitem.

## Kde se co edituje

| Chci změnit | Kde |
|---|---|
| Stránky webu | `src/app/` (Next.js App Router) |
| API pro produkty, upload, admin | `src/app/api/` |
| Přístup k databázi | `src/lib/db.ts`, `src/lib/supabase-server.ts` |
| Komponenty a vzhled | `src/components/`, `src/styles/`, Tailwind |
| Fotky produktů | `public/products/` (na VPS je ostrá sada) |

Návody psané pro člověka, ne pro Clauda, jsou ve složce `navody/`.

## Nástrahy, které tenhle repozitář má

Projekt prošel migrací ze Supabase na vlastní PostgreSQL a **zbytky po ní jsou
pořád vidět** — soubor, který se jmenuje `supabase-server.ts` a mluví
s PostgreSQL; mrtvá vrstva `products.json`, ze které ale pořád čte `sitemap.ts`;
nasazovací workflow na GitHub Pages, kde web nežije; statický export ve složce
`retrokredenc/`. Všechno i s dopadem je v **`GOTCHAS.md`** — než se na cokoli
z toho spolehneš, přečti to.

Mrtvý kód **zmiň, nemaž.** Úklid je samostatné rozhodnutí, ne vedlejší efekt
jiné práce.

## Jak tady pracovat

1. **Nejdřív přemýšlej, pak piš.** Předpoklady řekni nahlas; když je víc výkladů
   zadání, ukaž je. Když je jednodušší cesta, oponuj.
2. **Minimum kódu, který řeší zadání.** Žádné featury navíc, žádné abstrakce pro
   jedno použití.
3. **Sahej jen na to, na co musíš.** Nevylepšuj sousední kód ani formátování.
4. **Definuj, jak se pozná hotovo** — a ověř to, než řekneš, že to funguje.
5. **Než něco ustřelíš, zeptej se; když je to jisté, udělej to.** U databáze
   a u nasazení platí to první vždycky.

Před dokončením musí projít `npm run build`.

## Git

Hook `.claude/hooks/sync-web.mjs` při startu stáhne z GitHubu a připomene stav
serveru, na konci jen **upozorní** na nezapsanou práci. **Necommituj sám** —
u kódu je commit rozhodnutí. Zprávy commitů česky, jedna věta v čem je změna.
Na konci: `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

Do repozitáře **nepatří** obsah AIOS (smlouvy, osobní údaje). Když potřebuješ
AIOS jako kontext, spusť sezení s `claude --add-dir ~/Data/AIOS`.
