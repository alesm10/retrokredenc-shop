# 🚀 Jak spustit web lokálně pro testování

**Důležité:** Toto je návod pro lokální spuštění webu **pouze na vašem počítači**. Web nebude veřejný na internetu - běží jen u vás pro testování a úpravy.

## 📋 Rychlý návod (3 kroky)

### 1. Otevřete terminál

- **Mac**: Otevřete Terminal (Aplikace → Utility → Terminal)
- Nebo použijte integrovaný terminál v Cursor IDE (Terminal → New Terminal)

### 2. Přejděte do složky projektu

**Důležité:** Cesta má mezeru ("Cursor vibecoding"), takže musíte použít uvozovky!

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
```

**Pokud máte problém s uvozovkami, zkuste:**
```bash
cd /Volumes/Data/Cursor\ vibecoding/retrokredenc
```
(Použijte `\` před mezerou místo uvozovek)

**Ověřte, že jste ve správné složce:**
```bash
pwd
# Mělo by ukázat: /Volumes/Data/Cursor vibecoding/retrokredenc

ls
# Měli byste vidět: package.json, next.config.js, src/, public/, atd.
```

### 3. Spusťte server

```bash
npm run dev
```

> **Poznámka:** Pokud ještě nemáte nainstalované závislosti, spusťte nejdřív:
> ```bash
> npm install
> ```

### 4. Otevřete web v prohlížeči

V terminálu uvidíte zprávu:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

**Otevřete prohlížeč a jděte na:** `http://localhost:3000`

> **Důležité:** Pokud port 3000 je obsazený, Next.js automaticky použije 3001, 3002 atd. V terminálu uvidíte přesnou adresu.

## ✅ Co uvidíte na webu

- **Domovská stránka** - Hero sekce s texty "Krása starých časů" a "Poklady které nezestárly"
- **Produkty** - Katalog všech produktů s fotkami
- **Detail produktu** - Po kliknutí na produkt (galerie fotek)
- **O nás** - Informace o projektu
- **Kontakt** - Kontaktní formulář

## ⚠️ Důležité poznámky

### Web je pouze lokální (neveřejný)
- ✅ Web běží **jen na vašem počítači**
- ✅ Není viditelný na internetu
- ✅ Ideální pro testování a úpravy
- ❌ Není potřeba GitHub Pages zatím

### Fotky produktů
- Fotky jsou v složce `public/products/`
- Pokud tam nejsou, uvidíte prázdná místa (ale web funguje)

## 🛑 Jak zastavit server

Stiskněte **`Ctrl + C`** v terminálu, kde běží server.

## 🔄 Úpravy a změny

- ✅ **Hot reload**: Všechny změny se automaticky projeví po uložení souboru
- ✅ **Automatické obnovení**: Prohlížeč se automaticky obnoví
- ✅ **Okamžité zobrazení**: Upravte barvy, texty, layout - vše se okamžitě zobrazí

## 📝 Tipy pro úpravy

### Změna barev (retro paleta)
Upravte soubor: `tailwind.config.js` - sekce `colors`

### Změna textů
- Domovská stránka: `src/app/page.tsx`
- O nás: `src/app/o-nas/page.tsx`
- Kontakt: `src/app/kontakt/page.tsx`

### Přidání produktů
Viz návod: `SPRAVA_PRODUKTU.md`

### Přidání fotek produktů
Viz návod: `JAK_PRIDAT_FOTKY.md`

## 🐛 Řešení problémů

### Server se nespustí
```bash
# Smažte cache a zkuste znovu
rm -rf .next
npm run dev
```

### Port je obsazený
Next.js automaticky zkusí další port (3001, 3002, atd.). Použijte ten, který vidíte v terminálu.

### Změny se nezobrazují
- Obnovte stránku v prohlížeči (F5 nebo Cmd+R)
- Zkontrolujte, že server stále běží v terminálu

### "No such file or directory"
- Zkontrolujte, že cesta je správná
- Zkuste: `ls "/Volumes/Data/Cursor vibecoding"` - měli byste vidět složku `retrokredenc`

### "npm: command not found"
- Node.js není nainstalovaný
- Nainstalujte Node.js: https://nodejs.org/ nebo použijte `brew install node`
- Viz také: `INSTALACE_NODEJS.md`

### Chyba při `npm run dev`
```bash
# Zkuste smazat node_modules a reinstalovat
rm -rf node_modules
npm install
npm run dev
```

### Neúplný příkaz (> prompt)
- Vidíte `>` místo normálního promptu?
- Stiskněte `Ctrl + C` (zruší neúplný příkaz)
- Zkuste příkaz znovu (ujistěte se, že máte uzavírací uvozovku)

## 💡 Užitečné tipy

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

## 📚 Další návody

- `SPRAVA_PRODUKTU.md` - Jak přidat produkty
- `JAK_PRIDAT_FOTKY.md` - Jak přidat fotky
- `JAK_SDILET_S_KOLEGOU.md` - Jak sdílet web s kolegou pro feedback
- `README.md` - Kompletní dokumentace

---

## 🌐 Zveřejnění na internet (až budete chtít)

Když budete chtít web zveřejnit na internetu (např. na retrokredenc.cz), můžete použít:
- **GitHub Pages** - bezplatné hostování (návod v README.md)
- Nebo jiný hosting

**Ale pro testování a úpravy to není potřeba!** Lokální server stačí.

---

**Potřebujete pomoc?** Kontaktujte správce projektu.
