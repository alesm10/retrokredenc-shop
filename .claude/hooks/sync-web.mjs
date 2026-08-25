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
 *   start : stáhne z GitHubu, odešle čekající commity, připomene stav serveru
 *   end   : odešle hotové commity; rozdělanou práci NIKDY necommituje
 *
 * U kódu je commit rozhodnutí, ne vedlejší efekt zavření okna. Push commitu,
 * který už je odsouhlasený, ale rozhodnutí není — je to jen doprava, a bez
 * něj commit na druhém počítači neexistuje. (Odesílání doplněno 25. 8. 2026.)
 *
 * ⚠ Push na GitHub tady NIC NENASAZUJE — živý web se mění až na VPS.
 * Odesílá se tedy jen záloha historie, ne obsah webu.
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
const commitu = (n) => sklonuj(n, "commit", "commity", "commitů")

/**
 * Odešle commity, které už existují. NIC necommituje — když push selže,
 * jen to řekne. Rebase kódu naslepo by mohl nadělat víc škody než užitku.
 */
function odesli() {
  let neodeslano
  try {
    neodeslano = radku(git("log", "@{u}..HEAD", "--oneline"))
  } catch {
    return                                // větev bez protějšku na serveru
  }
  if (!neodeslano) return
  try {
    git("push")
    rekni(`odesláno na GitHub: ${commitu(neodeslano)} (⚠ to není nasazení — web se mění na VPS)`)
  } catch (e) {
    rekni(`!!! push SELHAL — ${commity(neodeslano)}, odešli ručně: git push`)
    rekni(String(e.stderr || e.message).trim().split("\n").slice(0, 2).join(" | "))
  }
}

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

  odesli()
  if (rozdelano) rekni(`pozor: ${zmeny(rozdelano)} z minula`)
} else {
  if (rozdelano) {
    rekni(`${zmeny(rozdelano)} — druhý počítač uvidí až to, co commitneš`)
  }
  odesli()
}

// Hook nikdy nesmí shodit sezení.
process.exit(0)
