/**
 * Kontrola kódu před commitem — statická síť.
 *
 * Proč vznikla (10. 10. 2026): tenhle projekt neměl lint VŮBEC. `npm run lint`
 * volal `next lint`, jenže ESLint nebyl ani v závislostech — Next si ho kdysi
 * doinstaloval sám a v Next 16 ta funkce zmizela. Příkaz tedy padal na
 * `Invalid project directory: .../lint` a nikdo o tom nevěděl, protože ho
 * nikdo nespouštěl.
 *
 * Nasazen `oxlint` (ne ESLint): jeden balíček bez konfigurace místo dvou
 * s konfigurací, a hlavně **týž nástroj jako u Karty budovy** — druhý linter
 * na tutéž práci by se musel zvlášť znát a udržovat. Daň: oxlint nezná
 * pravidla specifická pro Next.js (např. `<Image>` místo `<img>`).
 *
 * ⚠ **Vědomě tu NENÍ víc kontrol, a to z měření.** Rešerše 10. 10. 2026:
 * trvá-li commit přes ~1 s, lidé dají Ctrl+C a `--no-verify`; nad 10 s hook
 * do měsíce někdo vypne. Rozpočet je tedy čas, ne úplnost:
 *
 *   oxlint                455 ms
 *   tsc --noEmit        1 610 ms
 *   ────────────────────────────
 *   dohromady           ~2,1 s   (měřeno 10. 10. 2026)
 *
 * ⛔ Co tu schválně není:
 *  - **Formátovač.** Projekt žádný nemá. Zavést prettier by znamenalo
 *    přeformátovat 31 souborů jedním commitem.
 *  - **Detekce mrtvého kódu (`knip`).** Bez konfigurace je hlučná (ověřeno
 *    na Kartě budovy: 2 ze 7 nálezů falešné). Patří sem až s nastavením,
 *    a jen jako VAROVÁNÍ, nikdy jako brzda.
 *
 * Varování lintu commit NEZASTAVÍ — `oxlint` jimi nemění návratový kód
 * (ověřeno: 5 varování, exit 0). Zastaví ho jen chyba. Je to záměr: hook,
 * který hned první den zastaví commit kvůli pěti starým varováním, se obejde
 * a víckrát už nepomůže.
 *
 * Obejít se dá `git commit --no-verify` — vědomé rozhodnutí člověka.
 */

import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()

/**
 * Na Windows není `npx` program, ale dávka `npx.cmd` — `execFileSync("npx")`
 * tam spadne na ENOENT. Stejná past jako u `npm` ve `vydat.mjs` (naraženo
 * 7. 10. 2026 při prvním vydávání z notebooku).
 *
 * ⚠ Shell se zapíná JEN kvůli téhle dávce, ne plošně: s `shell: true` přestane
 * Node uvozovat argumenty a cokoli s mezerou se rozpadne.
 */
const windows = process.platform === "win32"
const davka = (prikaz) => windows && (prikaz === "npx" || prikaz === "npm")

function spust(prikaz, args) {
  try {
    execFileSync(davka(prikaz) ? `${prikaz}.cmd` : prikaz, args, {
      cwd: root,
      encoding: "utf8",
      stdio: "inherit",
      shell: davka(prikaz),
    })
    return true
  } catch {
    return false
  }
}

// 1) Co se vlastně commituje. Když mezi tím není kód, není co kontrolovat —
//    commit samotného `.md` nebo obrázku nemá platit 5 sekund.
const zmenene = execFileSync(
  "git",
  ["diff", "--cached", "--name-only", "--diff-filter=ACM"],
  { cwd: root, encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean)

const kod = zmenene.filter((f) => /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(f))

if (kod.length === 0) process.exit(0)

// 2) Bez nainstalovaných závislostí nemá cenu nic spouštět — na čerstvém klonu
//    by hook jen spadl a vypadalo by to jako vada kódu.
if (!existsSync(join(root, "node_modules"))) {
  console.error("⚠ kontrola kódu přeskočena — chybí node_modules (spusť `npm install`)")
  process.exit(0)
}

const zacatek = Date.now()
const vady = []

// 3) Lint JEN na právě změněné soubory, a to s `--deny-warnings`.
//
//    🔑 Proč zrovna takhle — zjištěno zkouškou 10. 10. 2026, ne odhadem:
//    oxlint má v tomhle projektu jako `error` nastavené JEDINÉ pravidlo
//    (`react/rules-of-hooks` v `.oxlintrc.json`). Všechno ostatní je `warning`
//    — včetně `no-const-assign`, tedy přiřazení do `const`. Varováními oxlint
//    nemění návratový kód, takže:
//
//      `oxlint` ani `oxlint --quiet`  →  přiřazení do `const` PROJDE (kód 0)
//      `oxlint --deny-warnings`       →  zastaví (kód 1)
//
//    ⛔ Brzda bez `--deny-warnings` by tedy byla brzda, která nebrzdí. To je
//    horší než žádná, protože vypadá jako pojistka.
//
//    ⚠ A proto jen na změněné soubory: `--deny-warnings` na celý projekt by
//    zastavil KAŽDÝ commit kvůli pěti starým varováním. Nové varování v souboru,
//    který právě měním, je moje chyba; stará u shadcn komponent nejsou.
//
//    ⚠ **Daň, která z toho plyne:** `src/components/Footer.tsx` má varování
//    `react(purity)` — volá `new Date().getFullYear()` při renderu. Je to
//    DOLOŽENÁ VADA, ne falešný poplach: v předgenerovaném HTML z 27. 9. je rok
//    2026 zapečený natvrdo, takže web bude po Novém roce ukazovat loňský rok,
//    dokud se znovu nenasadí. Dokud se to neopraví, úprava Footeru commit
//    zastaví. ⛔ Neopraveno 10. 10. schválně — je to rozhodnutí o obsahu webu.
if (!spust("npx", ["oxlint", "--deny-warnings", ...kod])) vady.push("oxlint našel závadu")

// 4) Typová kontrola. `--noEmit` (ne `-b`): tenhle projekt staví Next, ne tsc,
//    takže se jen kontroluje a nic se negeneruje.
if (!spust("npx", ["tsc", "--noEmit"])) vady.push("tsc našel typovou chybu")

const sekundy = ((Date.now() - zacatek) / 1000).toFixed(1)

if (vady.length) {
  console.error(`\n⛔ COMMIT ZASTAVEN — ${vady.join(" · ")}`)
  console.error(
    `\nVýpis je výš. Oprav to a commitni znovu.\n` +
      `Ruční spuštění:  npm run lint  a  npm run build\n` +
      `Vědomě obejít:   git commit --no-verify\n`,
  )
  process.exit(1)
}

const n = kod.length
const slovo = n === 1 ? "soubor" : n < 5 ? "soubory" : "souborů"
console.log(`✅ kontrola kódu prošla (${sekundy} s, ${n} ${slovo})`)
