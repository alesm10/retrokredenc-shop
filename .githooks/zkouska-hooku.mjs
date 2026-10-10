/**
 * Zkouška kontroly kódu — proklepne, že brzda na TOMHLE stroji opravdu brzdí.
 *
 * Proč existuje (10. 10. 2026): hook `.githooks/pre-commit` se spoléhá na dvě
 * věci, které jsou u každého stroje jinak — `core.hooksPath` (nastavení PER
 * KLON, po `git clone` chybí) a `node` dosažitelný z shellu, kterým git hooky
 * spouští. Na Macu to bylo vyzkoušené; na Windows nikdy.
 *
 * ⚠ Ověřit se to musí SKUTEČNÝM commitem, ne spuštěním skriptu — jinak se
 * netestuje to, na čem záleží (že git hook vůbec naskočí).
 *
 * 🔑 Bezpečnost: zkouška si založí vlastní odbočku a na konci ji smaže.
 * Na pracovní větev tedy nemůže nic napsat ani kdyby hook NEfungoval a commit
 * omylem prošel. Odmítne se spustit nad rozdělanou prací.
 */

import { execFileSync } from "node:child_process"
import { existsSync, writeFileSync, rmSync } from "node:fs"
import { join } from "node:path"

const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim()
const git = (...a) => execFileSync("git", a, { cwd: root, encoding: "utf8" }).trim()
const gitTise = (...a) => {
  try {
    execFileSync("git", a, { cwd: root, encoding: "utf8", stdio: "pipe" })
    return true
  } catch {
    return false
  }
}

const vysledky = []
const ok = (t) => vysledky.push(["✅", t])
const vada = (t) => vysledky.push(["⛔", t])

console.log(`\nZkouška kontroly kódu — ${process.platform}, node ${process.version}`)
console.log(`Repozitář: ${root}\n`)

// 0) Nad rozdělanou prací se nezkouší — mohla by se svézt do zkušebního commitu.
if (git("status", "--porcelain")) {
  console.error("⛔ Máš rozdělanou práci. Zkouška by ji mohla smíchat se zkušebním commitem.")
  console.error("   Ulož ji (commit), nebo odlož (`git stash`), a spusť zkoušku znovu.\n")
  process.exit(1)
}

// 1) Je hook vůbec napojený? Tohle je ta past „per klon".
const hooksPath = (() => {
  try {
    return git("config", "core.hooksPath")
  } catch {
    return ""
  }
})()

if (hooksPath === ".githooks") ok("core.hooksPath je nastavená na .githooks")
else {
  vada(`core.hooksPath je "${hooksPath || "nenastavená"}" — hook se NESPUSTÍ`)
  console.log("\n⛔ Zastavuji. Napřed spusť:")
  console.log(`   git -C "${root}" config core.hooksPath .githooks\n`)
  process.exit(1)
}

if (existsSync(join(root, ".githooks", "pre-commit"))) ok("soubor .githooks/pre-commit existuje")
else vada("soubor .githooks/pre-commit CHYBÍ")

if (existsSync(join(root, "node_modules"))) ok("node_modules jsou nainstalované")
else {
  vada("node_modules chybí — hook se vědomě přeskočí (spusť `npm install`)")
  console.log("\n⛔ Zastavuji. Napřed spusť:")
  console.log(`   cd "${root}" && npm install\n`)
  process.exit(1)
}

// 2) Skutečný commit vadného kódu — na vlastní odbočce, ať se nemůže nic stát.
const vetev = git("rev-parse", "--abbrev-ref", "HEAD")
const odbocka = `zkouska-hooku-${Date.now()}`
const vadnySoubor = join(root, "src", "_zkouska_hooku.ts")
let uklizeno = false

const ukliditVse = () => {
  if (uklizeno) return
  uklizeno = true
  try {
    rmSync(vadnySoubor, { force: true })
    gitTise("reset", "--hard", "HEAD")
    gitTise("switch", vetev)
    gitTise("branch", "-D", odbocka)
  } catch {
    /* úklid nesmí přebít výsledek zkoušky */
  }
}

process.on("exit", ukliditVse)

try {
  git("switch", "-c", odbocka)

  // Vada, u které výsledek známe předem: přiřazení do `const`.
  // Chytá ji oxlint (jako varování → proto `--deny-warnings`) i tsc.
  writeFileSync(vadnySoubor, "export function f() {\n  const a = 1\n  a = 2\n  return a\n}\n")
  git("add", vadnySoubor)

  console.log("\n--- zkušební commit vadného kódu · co na to řekl hook ---")
  let prosel = false
  try {
    // `stdio: pipe` schová výpis, `inherit` by zas při (nechtěném) úspěchu
    // vysypal commit. Proto se výstup zachytí a vypíše ručně — a je to
    // hlavní věc, kterou má zkouška ukázat: ŽE hook vůbec promluvil.
    execFileSync("git", ["commit", "-m", "ZKOUSKA hooku - nesmi projit"], {
      cwd: root,
      encoding: "utf8",
      stdio: "pipe",
    })
    prosel = true
  } catch (e) {
    const vypis = `${e.stdout || ""}${e.stderr || ""}`.trim()
    console.log(vypis || "(hook nic nevypsal — ⚠ podezřelé)")
  }
  console.log("--- konec výpisu ---\n")

  if (prosel) vada("vadný kód PROŠEL — brzda nebrzdí! (commit je v odbočce, smaže se)")
  else ok("vadný kód commit ZASTAVIL — brzda funguje")
} catch (e) {
  vada(`zkouška spadla: ${e.message.split("\n")[0]}`)
} finally {
  ukliditVse()
}

// 3) Verdikt
console.log("Výsledek:")
for (const [z, t] of vysledky) console.log(`  ${z} ${t}`)

const vady = vysledky.filter(([z]) => z === "⛔").length
console.log(
  vady
    ? `\n⛔ ${vady} závad — kontrola kódu na tomhle stroji NEFUNGUJE, jak má.\n`
    : `\n✅ Všechno v pořádku. Kontrola kódu na tomhle stroji brzdí.\n`,
)
console.log(`Větev po úklidu: ${git("rev-parse", "--abbrev-ref", "HEAD")}, strom ${git("status", "--porcelain") ? "⛔ ŠPINAVÝ" : "✅ čistý"}\n`)
process.exit(vady ? 1 : 0)
