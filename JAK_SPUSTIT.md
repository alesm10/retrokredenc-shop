# 🚀 Jak spustit web lokálně pro testování

**Důležité:** Toto je návod pro lokální spuštění webu **pouze na vašem počítači**. Web nebude veřejný na internetu - běží jen u vás pro testování a úpravy.

## 📋 Rychlý návod (3 kroky)

### 1. Otevřete terminál

- **Mac**: Otevřete Terminal (Aplikace → Utility → Terminal)
- Nebo použijte integrovaný terminál v Cursor IDE (Terminal → New Terminal)

### 2. Přejděte do složky projektu a spusťte server

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
npm run dev
```

> **Poznámka:** Pokud ještě nemáte nainstalované závislosti, spusťte nejdřív:
> ```bash
> npm install
> ```

### 3. Otevřete web v prohlížeči

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

## 📚 Další návody

- `SPRAVA_PRODUKTU.md` - Jak přidat produkty
- `JAK_PRIDAT_FOTKY.md` - Jak přidat fotky
- `README.md` - Kompletní dokumentace

---

## 🌐 Zveřejnění na internet (až budete chtít)

Když budete chtít web zveřejnit na internetu (např. na retrokredenc.cz), můžete použít:
- **GitHub Pages** - bezplatné hostování (návod v README.md)
- Nebo jiný hosting

**Ale pro testování a úpravy to není potřeba!** Lokální server stačí.

---

**Potřebujete pomoc?** Kontaktujte správce projektu.
