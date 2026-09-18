# Retro Kredenc — e-shop s československým porcelánem

Web **[retrokredenc.cz](https://retrokredenc.cz)** — autentický porcelán z let 1950–1989.
Téma: *Krása starých časů*.

## Jak to funguje

- **Next.js 16 + React 19**, databáze **PostgreSQL**.
- Zboží se přidává v **administraci** (`/admin`), i z telefonu — fotky se před
  nahráním zmenší v prohlížeči. Zboží jde upravit, označit jako prodané,
  fotky přeřadit a odebrat.
- Kontaktní formulář posílá zprávy přes Gmail (aplikační heslo).
- Web běží na vlastním serveru (pm2 za nginx). **Push na GitHub web nemění** —
  nasazuje se na serveru.

## Kde co je

| | |
|---|---|
| `src/app/` | stránky a API (`api/products`, `api/upload`, `api/files`, `api/contact`, `api/admin`) |
| `src/lib/produkty.ts` | čtení zboží z databáze |
| `src/lib/overeni.ts` | heslo do administrace a ochrana proti hádání |
| `src/components/` | součásti stránek |
| `env.example` | jaké proměnné web potřebuje (bez hodnot) |

Nahrané fotky zboží leží na serveru ve složce `uploads/` a v gitu nejsou.

## Pro toho, kdo na webu pracuje

- **`CLAUDE.md`** — jak se tu pracuje, co nesmí do veřejného repozitáře.
- **`GOTCHAS.md`** — nástrahy: nasazení přes zkušební kopii, nginx, proč se
  web na počítači bez databáze celý nesestaví.
- **`UKOLY.md`** — co je otevřené a co hotové.

## Barvy

Primární #C9A961 (teplá zlatá) · sekundární #8B6F47 (teplá hnědá) ·
pozadí #F5F1E8 (krémová) · text #3D3D3D · akcent #D4A574 (terakota).
