# Nástrahy — co už jednou stálo čas

> Přeneseno 20. 8. 2026 z `Cursor vibecoding/memory/gotchas.md`, odkud se to
> při práci na webu nikdy nenačetlo. Doplňuj sem, když něco stojí hodinu
> a příště by nemuselo.

## Kde web vlastně žije

- Doména je u **Wedosu**, web běží na **VPS u Hostingeru**:
  `ssh alesvps@152.239.117.152`, složka `~/retrokredenc-shop`, spravuje ho
  **pm2** jako proces `retrokredenc`. Na stejném serveru běží i n8n (Docker)
  a kopie AIOS (`aios-brain`).
- **Nasazuje se přímo na serveru**, ne přes GitHub. Kód na Macu byl do 18. 8.
  2026 o šest commitů pozadu a nikdo o tom nevěděl.
  **Před prací na webu vždycky nejdřív zjistit stav serveru.**
- Repozitář se jmenuje **`alesm10/retrokredenc-shop`** a je **veřejný** —
  `retrokredenc` neexistuje. Cokoli, co se sem commitne, uvidí kdokoli.

## Na Macu se web celý nesestaví — a nevadí to

`npm run build` na Macu **projde kompilací a kontrolou typů, pak spadne** na
`ECONNREFUSED 5432`: titulní stránka, katalog a mapa webu si při sestavení
berou zboží z databáze a ta je jen na VPS. Platí to i pro nezměněný kód.

**Co to znamená pro ověřování:** na Macu stačí `✓ Compiled successfully`
a `Finished TypeScript`. Celé sestavení a zkouška se dělají **na serveru**.

## Nasazení — jak se to dělá bez rizika (ověřeno 18. 9. 2026)

1. Na serveru sestavit a spustit zkušební kopii **vedle** živého webu:
   kód do `~/retrokredenc-zkouska` (rsync bez `node_modules`, `.next`, `.git`),
   zkopírovat `.env.local`, `npm ci && npm run build`,
   `ADMIN_PASSWORD=zkouska npx next start -p 3001`. Port 3001 je zvenku zavřený;
   z Macu na něj tunelem `ssh -L 3101:localhost:3001 …`.
   Zkušební heslo přebije to z `.env.local` — skutečné heslo se nikam nezadává.
2. ⚠ **Databáze je jedna, sdílená se živým webem.** Zkušební produkt zakládat
   **bez „Dostupné k prodeji"** (v katalogu se neukáže) a hned smazat.
3. Živý web: `git fetch && git merge --ff-only origin/main`, `npm ci`,
   `npm run build`, a **jen když build projde** `pm2 restart retrokredenc --update-env`.
4. Ověřit zvenku (`curl https://retrokredenc.cz/…`) a zkušební složku smazat.

## Restart po změně nastavení

```bash
pm2 restart retrokredenc --update-env
```

⚠ **Bez `--update-env` se nové proměnné z `.env.local` nenačtou** a bude to
vypadat, že oprava nezabrala.

## nginx — dva řádky, na kterých web stojí

V `/etc/nginx/sites-available/retrokredenc` (doplněno 18. 9. 2026, záloha
původního vedle s příponou `.zaloha-2026-09-18`):

- `client_max_body_size 20M;` — výchozí limit nginx je **1 MB**. Bez tohoto
  řádku padala každá fotka z telefonu s chybou 413 a administrace řekla jen
  „Chyba při nahrávání fotky". Teď fotku zmenšuje už telefon, řádek je pojistka.
- `proxy_set_header X-Real-IP $remote_addr;` — ⚠ **na tom stojí ochrana proti
  hádání hesla** (`src/lib/overeni.ts`). Bez něj web nezná adresu návštěvníka:
  útočník si ji v hlavičce podvrhne a obejde počítadlo, nebo se všichni
  počítají jako jeden a pět špatných pokusů kohokoli zamkne administraci
  všem. Kdo nginx přenastavuje, musí ten řádek zachovat.

Úprava nginx potřebuje `sudo` — heslo je v RoboFormu, ne tady.

## Ochrana proti hádání hesla — jak se chová

- 5 špatných pokusů z jedné adresy → **15 minut zamčeno**, i správné heslo
  vrátí 429 („Příliš mnoho pokusů").
- ⚠ Domácnost má jednu veřejnou adresu — **zamkne se celý dům**, ne jeden telefon.
  Kdo zkouší ochranu, zablokuje na čtvrt hodiny i Verču.
- Počítadlo žije v paměti; `pm2 restart` zámek hned zruší.

## Next.js 16 — co se změnilo proti 14 (přechod 18. 9. 2026)

- **Parametry z adresy jsou `Promise`:** `{ params }: { params: Promise<{ id: string }> }`
  a číst `(await params).id`. Týká se stránky produktu a API `products/[id]`,
  `files/[filename]`.
- Sestavuje Turbopack; `next lint` už neexistuje (skript `lint` v `package.json`
  nefunguje, ESLint v projektu ani nebyl).
- Next při prvním buildu sám přepsal `tsconfig.json` (`jsx: react-jsx`) — patří
  to do commitu.
- Záloha celé složky se starou verzí 14 leží na VPS v `~/retrokredenc-shop-v14`
  — smazat, až nová verze týden drží (po 25. 9. 2026).

## GitHub Pages a Vercel — staré kopie webu

Do 18. 9. 2026 visela na `alesm10.github.io/retrokredenc-shop` **veřejně stará
kopie e-shopu** — GitHub Pages sestavoval z kořene repozitáře, kde ležel
statický export. Soubory smazány, Pages v nastavení vypnuté (Source → None).
Na `retrokredenc-shop.vercel.app` nic neběží (404), zbyl jen odkaz v popisu
repozitáře.

## Nastavení repozitáře na GitHubu (18. 9. 2026)

Repozitář zůstává **veřejný** — vědomě: ochrana proti odeslání hesla (Push
protection) je zdarma jen pro veřejné repozitáře a má větší cenu než skrytí
adresy serveru, která se dá zjistit z domény.

| Zapnuto | Proč |
|---|---|
| **Secret Protection + Push protection** | GitHub odmítne commit, ve kterém pozná heslo nebo klíč (13. 5. 2026 by zastavil únik) |
| **Dependabot alerts** (+ Dependency graph) | e-mail, když se najde díra v Next.js nebo jiné knihovně |

| Vypnuto | Proč |
|---|---|
| **GitHub Actions** | nic je nepoužívá; nasazuje se na serveru |
| Pages, Wiki, Projects, Issues | nepoužívají se; Issues by u veřejného repozitáře zval cizí „hlášení" |
| Dependabot security/version updates, CodeQL, Copilot Autofix | zakládaly by samy návrhy změn — aktualizace se dělají ručně, přes zkušební kopii |

Website v popisu repozitáře vede na `https://retrokredenc.cz`. Prostředí
`github-pages` a `Production` smazána; 85 starých záznamů o nasazení zůstalo
(bez přihlášení k API nejdou smazat, nic nedělají).

## Zálohy

- Databáze i fotky se zálohují: na VPS `~/zaloha-db.sh` v cronu ve 3:00
  (14 dní zpět), na Macu `~/Data/_zalohy/stahni-zalohy.sh` přes launchd ve
  20:00, a když je připojený NAS, kopíruje i tam.
- Ruční dump na serveru:
  ```bash
  set -a && . ./.env.local && set +a
  PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -U "$DB_USER" "$DB_NAME"
  ```
- **Fotky produktů žijí v `uploads/` na serveru a nejsou v gitu** — zálohují se zvlášť. Klon repozitáře je bez nich.

## Hesla

- **Do popisu commitu se nikdy nepíše hodnota hesla ani klíče.** 13. 5. 2026
  vznikl commit, který heslo do administrace vypsal ve zprávě — kód byl přitom
  správně (`process.env.ADMIN_PASSWORD`), prozradil to popis.
  V **veřejném** repozitáři. Historie je trvalá.
- Náprava takového úniku **není přepis historie, ale změna hesla.** Jakmile
  neplatí, je zápis neškodný. Heslo vyměněno 21. 8. 2026.
- **Dvě různá hesla, snadno se pletou:** heslo do administrace (jen v
  `.env.local` na serveru) a aplikační heslo Googlu „Retro Kredenc web"
  (Verčin účet, odesílá zprávy z formuláře). Když se změní heslo ke Google
  účtu, **Google aplikační hesla zruší** a formulář přestane odesílat.
- Jestli heslo na serveru je to staré, se dá zjistit **porovnáním otisků**
  (`sha256sum` hodnoty na serveru proti hodnotě na Macu) — bez vypsání hesla.
