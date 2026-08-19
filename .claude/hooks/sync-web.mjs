#!/usr/bin/env node
/**
 * Synchronizace webu retrokredenc.cz — pozor, tenhle projekt má tři místa,
 * ne dvě.
 *
 *   Mac        — tady se píše
 *   GitHub     — záloha historie
 *   VPS        — ⚠ TADY BĚŽÍ ŽIVÝ WEB a nasazuje se přímo tam
 *
 * Proto `git pull` z GitHubu NESTAČÍ: server může být napřed. V červnu 2026
 * byl kód na Macu o šest commitů pozadu a nikdo o tom nevěděl, protože
 * změny se dělaly rovnou na serveru.
 *
 *   start : stáhne z GitHubu a připomene, ať se ověří stav serveru
 *   end   : upozorní na nezapsanou práci; NIC sám necommituje
 *
 * U kódu je commit rozhodnutí, ne vedlejší efekt zavření okna.
 */
import { execFileSync } from "node:child_process"

const MODE = process.argv[2] === "end" ? "end" : "start"
const REPO = process.env.CLAUDE_PROJECT_DIR || process.cwd()
const VPS = "alesvps@152.239.117.152"
const SLOZKA_NA_VPS = "~/retrokredenc-shop"

const git = (...args) =>
  execFileSync("git", args, { cwd: REPO, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] })
const rekni = (t) => process.stderr.write(`[retrokredenc] ${t}\n`)
const radku = (t) => (t.trim() ? t.trim().split("\n").length : 0)

/** České skloňování: 1 změna, 2–4 změny, 5+ změn. */
const sklonuj = (n, jedna, dve, pet) => `${n} ${n === 1 ? jedna : n >= 2 && n <= 4 ? dve : pet}`
const zmeny = (n) => sklonuj(n, "nezapsaná změna", "nezapsané změny", "nezapsaných změn")
const commity = (n) => sklonuj(n, "commit čeká", "commity čekají", "commitů čeká")

try {
  git("rev-parse", "--git-dir")
} catch {
  process.exit(0)
}

const rozdelano = radku(git("status", "--porcelain"))

if (MODE === "start") {
  try {
    git("pull", "--rebase", "--autostash")
    rekni("staženo z GitHubu")
  } catch (e) {
    rekni("!!! git pull SELHAL — vyřeš to, než začneš")
    rekni(String(e.stderr || e.message).trim().split("\n").slice(0, 2).join(" | "))
  }

  rekni("⚠ živý web běží na VPS a nasazuje se přímo tam — GitHub nemusí být aktuální")
  rekni(`   ověř takhle:  ssh ${VPS} "cd ${SLOZKA_NA_VPS} && git log -3 --oneline"`)

  if (rozdelano) rekni(`pozor: ${zmeny(rozdelano)} z minula`)
} else if (rozdelano) {
  rekni(`${zmeny(rozdelano)} — commitni a pushni, jinak nikde nebudou`)
} else {
  try {
    const neodeslano = radku(git("log", "@{u}..HEAD", "--oneline"))
    if (neodeslano) {
      rekni(`${commity(neodeslano)} na odeslání — spusť: git push`)
      rekni("   a nezapomeň: push na GitHub NENÍ nasazení, web se mění až na VPS")
    }
  } catch {
    /* větev bez protějšku na serveru — nevadí */
  }
}

// Hook nikdy nesmí shodit sezení.
process.exit(0)
