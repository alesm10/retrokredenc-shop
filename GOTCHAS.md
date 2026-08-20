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

## Restart po změně nastavení

```bash
pm2 restart retrokredenc --update-env
```

⚠ **Bez `--update-env` se nové proměnné z `.env.local` nenačtou** a bude to
vypadat, že oprava nezabrala.

## Mrtvé zbytky, na které se nedá spolehnout

- `.github/workflows/deploy.yml` (GitHub Pages) a statický export ve složce
  `retrokredenc/` jsou zbytky z doby, kdy web běžel na Vercelu. Živý web je
  běžící Next.js server, ne statika.
- **Web už neběží na Supabase**, ale na lokálním PostgreSQL na VPS
  (commit `21497d5`). Přesto se `src/lib/supabase-server.ts` pořád tak jmenuje
  a balíčky Supabase zůstaly v `package.json`.
- `src/data/products.json` je vrstva z doby před databází. ⚠ `src/app/sitemap.ts`
  z ní **pořád čte**, takže mapa webu neodpovídá skutečnému zboží.
- `.env.local` na Macu je z 13. 5. 2026 a nese ještě klíče Supabase.
  **Živá pravda o konfiguraci je na serveru.**

## Zálohy

- Databáze i fotky se zálohují: na VPS `~/zaloha-db.sh` v cronu ve 3:00
  (14 dní zpět), na Macu `~/Data/_zalohy/stahni-zalohy.sh` přes launchd ve
  20:00, a když je připojený NAS, kopíruje i tam.
- Ruční dump na serveru:
  ```bash
  set -a && . ./.env.local && set +a
  PGPASSWORD="$DB_PASSWORD" pg_dump -h "$DB_HOST" -U "$DB_USER" "$DB_NAME"
  ```
- **Fotky produktů žijí v `public/products/` a `uploads/` na serveru a nejsou
  v gitu** — zálohují se zvlášť. Klon repozitáře je bez nich.

## Hesla

- **Do popisu commitu se nikdy nepíše hodnota hesla ani klíče.** 13. 5. 2026
  vznikl commit, který heslo do administrace vypsal ve zprávě — kód byl přitom
  správně (`process.env.ADMIN_PASSWORD`), prozradil to popis.
  V **veřejném** repozitáři. Historie je trvalá.
- Náprava takového úniku **není přepis historie, ale změna hesla.** Jakmile
  neplatí, je zápis neškodný.
- ⚠ **Otevřený úkol:** administrace nemá žádnou ochranu proti opakovanému
  hádání hesla — chybí zpoždění po neúspěšném pokusu. U krátkého hesla je to
  ta část, která rozhoduje.
