# 🚀 Jak spustit server pro lokální testování

## Rychlý postup

### Krok 1: Otevřete terminál

V macOS:
- Stiskněte `Cmd + Space` (Spotlight)
- Napište `Terminal` a stiskněte Enter
- Nebo použijte Terminál, který už máte otevřený

---

### Krok 2: Přepněte se do složky projektu

**Důležité:** Cesta má mezeru ("Cursor vibecoding"), takže musíte použít uvozovky!

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
```

**Ujistěte se, že:**
- ✅ Používáte uvozovky okolo celé cesty (kvůli mezeře)
- ✅ Máte otevírací **i** zavírací uvozovky
- ✅ Cesta začíná `/Volumes/Data/Cursor vibecoding/retrokredenc`

**Pokud máte problém s uvozovkami, zkuste:**
```bash
cd /Volumes/Data/Cursor\ vibecoding/retrokredenc
```
(Použijte `\` před mezerou místo uvozovek)

---

### Krok 3: Ověřte, že jste ve správné složce

```bash
pwd
```

**Měli byste vidět:**
```
/Volumes/Data/Cursor vibecoding/retrokredenc
```

**Zkontrolujte, že vidíte soubory projektu:**
```bash
ls
```

**Měli byste vidět:**
- `package.json`
- `next.config.js`
- `src/`
- `public/`
- atd.

---

### Krok 4: Spusťte server

```bash
npm run dev
```

**Počkejte, až se server spustí.** Měli byste vidět:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in Xms
```

---

### Krok 5: Otevřete web v prohlížeči

Otevřete v prohlížeči:
```
http://localhost:3000
```

**Měli byste vidět váš Retro Kredenc web!**

---

## Kompletní příkazy (kopírovat celé)

### Pro macOS/Linux:

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
pwd
npm run dev
```

### Alternativa (s escape mezerou):

```bash
cd /Volumes/Data/Cursor\ vibecoding/retrokredenc
pwd
npm run dev
```

---

## Časté problémy

### Problém 1: "command not found: cd"

**Řešení:**
- Ujistěte se, že jste v terminálu (bash/zsh)
- Zkuste znovu otevřít terminál

### Problém 2: "No such file or directory"

**Řešení:**
- Zkontrolujte, že cesta je správná
- Zkuste:
  ```bash
  ls "/Volumes/Data/Cursor vibecoding"
  ```
  Měli byste vidět složku `retrokredenc`

### Problém 3: Neúplný příkaz (> prompt)

**Příznaky:** Vidíte `>` místo normálního promptu

**Řešení:**
- Stiskněte `Ctrl + C` (zruší neúplný příkaz)
- Zkuste příkaz znovu (ujistěte se, že máte uzavírací uvozovku)

### Problém 4: "npm: command not found"

**Řešení:**
- Node.js není nainstalovaný
- Nainstalujte Node.js: https://nodejs.org/
- Nebo použijte `brew install node`

### Problém 5: Chyba při `npm run dev`

**Řešení:**
```bash
# Zkuste smazat node_modules a reinstalovat
rm -rf node_modules
npm install
npm run dev
```

---

## Tipy

### Tip 1: Vytvořte alias pro snadný přístup

Přidejte do `~/.bashrc` nebo `~/.zshrc`:
```bash
alias retrokredenc='cd "/Volumes/Data/Cursor vibecoding/retrokredenc"'
```

Pak stačí napsat:
```bash
retrokredenc
npm run dev
```

### Tip 2: Použijte Finder

1. Otevřete Finder
2. Přejděte do složky `retrokredenc`
3. Klikněte pravým tlačítkem na složku
4. Vyberte "Services" → "New Terminal at Folder" (pokud máte)
5. Nebo přetáhněte složku do Terminálu (vytvoří cestu automaticky)

### Tip 3: Zkopírujte cestu z Finderu

1. V Finderu klikněte na složku `retrokredenc`
2. Stiskněte `Cmd + Option + C` (kopíruje cestu)
3. V terminálu napište: `cd ` (s mezerou na konci)
4. Stiskněte `Cmd + V` (vloží cestu)

---

## Co dělat, když server běží

### Zastavit server:
- Stiskněte `Ctrl + C` v terminálu, kde běží server

### Restartovat server:
- Zastavte server (`Ctrl + C`)
- Spusťte znovu: `npm run dev`

### Změnit port (pokud 3000 je obsazený):
Next.js automaticky použije další dostupný port (3001, 3002, atd.)

---

**Zkuste to prosím a dejte mi vědět, jestli to funguje!**
