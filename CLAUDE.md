# Retro Kredenc — e-shop s československým porcelánem

> Web **retrokredenc.cz** — prodej autentického porcelánu z let 1950–1989.
> Soukromý rodinný projekt (v AIOS patří pod `soukromi/`), ne pracovní.
> Next.js 16 + React 19 + PostgreSQL, jednoduchý admin pro zboží (používá se z mobilu).
>
> **Autor je Aleš Miclík — vyučený soustružník, ne programátor.** Odborný pojem
> vysvětli hned při prvním použití jednou větou.

## Co o tomhle projektu **není** tady (a proč)

Poznámky se nesmí zdvojovat — jedna strana drží obsah, druhá jen šipku.
Dělící čára vede po tom, **co by se dalo zveřejnit**, protože tenhle
repozitář je **veřejný**:

| Patří **sem** (repozitář webu) | Patří do **AIOS** (`~/Data/AIOS`, soukromé) |
|---|---|
| kód, `UKOLY.md`, `GOTCHAS.md` | IP serveru, SSH přístupy, kde leží klíče |
| jak web funguje, co je rozbité | jak se web zálohuje (úloha na NASu, VPS) |
| rozhodnutí o webu a jejich důvody | co ještě na tom VPS běží |

Konkrétně v AIOS zůstává `infrastruktura/VYSTUPY/nas-stahuje-zalohy-z-vps.md`
(postup záloh) a karty `karta-co-bezi-a-kde.md`, `karta-kde-lezi-klice.md`,
`karta-zabezpeceni-vps.md`.

**Když při práci narazíš na poznámku o webu ležící v AIOS:** přesuň ji sem,
pokud je zveřejnitelná — a na původní místo dej jednu větu s odkazem, ať se
neztratí stopa. Když zveřejnitelná není, zůstává v AIOS a sem patří nanejvýš
zmínka, že existuje.

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

V `.env.local` **na serveru** (v `.gitignore`, v historii gitu **není** — ověřeno
20. 8. 2026): `ADMIN_PASSWORD`, `GMAIL_APP_PASSWORD`, `DB_PASSWORD` a další —
názvy v `env.example`. Na Macu `.env.local` není (starý z května smazán 18. 9. 2026);
pro zkoušku administrace se heslo předává při spuštění (`GOTCHAS.md`).

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
| Přístup k databázi | `src/lib/db.ts`, `src/lib/produkty.ts` |
| Ověření hesla do administrace | `src/lib/overeni.ts` (ochrana proti hádání) |
| Návrh názvu a popisu z fotek (AI) | `src/app/api/popis/route.ts` — zadání pro Clauda je v konstantě `ZADANI` |
| Komponenty a vzhled | `src/components/`, `src/styles/`, Tailwind |
| Fotky produktů | nahrávají se přes administraci do `uploads/` **na serveru** (v gitu nejsou) |

Staré návody (`navody/`) smazány 18. 9. 2026 — popisovaly Vercel, NAS a ruční
úpravu `products.json`. Pravda je v `CLAUDE.md`, `GOTCHAS.md` a `README.md`.

## Nástrahy, které tenhle repozitář má

Zbytky po Supabase a GitHub Pages jsou od 18. 9. 2026 pryč. Zůstalo, co se
nepozná z kódu: **na Macu se web celý nesestaví** (chybí databáze), ochrana
proti hádání hesla **stojí na jednom řádku v nginx**, nasazuje se přes
zkušební kopii vedle živého webu. Všechno je v **`GOTCHAS.md`** — přečti to,
než začneš.

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

Před dokončením musí projít `npm run build` — na Macu jen kompilace a typy,
celé sestavení na serveru (`GOTCHAS.md`).

## Git

Hook `.claude/hooks/sync-web.mjs` při startu stáhne z GitHubu, připomene stav
serveru a při startu i na konci **sám odešle commity, které čekají**. Na
nezapsanou práci jen upozorní. **Necommituj sám** — u kódu je commit
rozhodnutí. ⚠ To odeslání je jen záloha historie na GitHub — **web se tím
nemění**, ten se nasazuje na VPS (doplněno 25. 8. 2026). Zprávy commitů česky, jedna věta v čem je změna.
Na konci: `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

Do repozitáře **nepatří** obsah AIOS (smlouvy, osobní údaje). Na webu se
pracuje **z okna AIOS** (Alešovo rozhodnutí 12. 9. 2026) — odtud je vidět AIOS
i tenhle repozitář. Neraď `--add-dir` ani otevírání jiného okna.
⚠ Z okna AIOS **neběží hook `sync-web.mjs`** — stáhnout a odeslat ručně.
