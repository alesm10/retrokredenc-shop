# 📝 Co znamená "upravit products.json a pushnout"

Jednoduché vysvětlení, co přesně musíte udělat po tom, co se fotka automaticky zkopíruje do složky.

---

## 🎯 Celý proces krok za krokem

### Situace:
Vaše žena vyfotila hrnek a nahrala fotku `hrnek-modry.jpg` do Google Drive složky. Fotka se automaticky zkopírovala do `public/products/hrnek-modry.jpg`.

**Co teď musíte udělat:**

---

## Krok 1: Otevřete soubor products.json

1. Otevřete soubor: `src/data/products.json`
   - V Cursoru: klikněte na soubor v levém panelu
   - Nebo: otevřete v textovém editoru

2. Soubor vypadá takto:
```json
{
  "products": [
    {
      "id": "kralovsky1",
      "name": "Královský porcelánový set",
      ...
    },
    {
      "id": "oranzovykvet1",
      "name": "Porcelán s oranžovým květinovým vzorem",
      ...
    }
  ]
}
```

---

## Krok 2: Přidejte nový produkt do seznamu

**Najděte konec seznamu produktů** (před uzavírací závorku `]`)

**Přidejte čárku** za poslední produkt a **nový produkt:**

```json
{
  "products": [
    {
      "id": "kralovsky1",
      "name": "Královský porcelánový set",
      ...
    },
    {
      "id": "oranzovykvet1",
      "name": "Porcelán s oranžovým květinovým vzorem",
      ...
    },
    {
      "id": "hrnek-modry",
      "name": "Modrý retro hrnek Československo",
      "category": "hrnky",
      "year": "1975",
      "price": 450,
      "description": "Krásný modrý porcelánový hrnek z roku 1975.",
      "image": "hrnek-modry.jpg",
      "available": true
    }
  ]
}
```

**Důležité:**
- ✅ Přidejte **čárku** za předchozí produkt (před novým produktem)
- ✅ `"id"` musí být stejný jako název fotky **bez přípony** (`hrnek-modry` ne `hrnek-modry.jpg`)
- ✅ `"image"` musí být přesně stejný název jako soubor (`hrnek-modry.jpg`)

---

## Krok 3: Uložte soubor

1. **Uložte soubor** `products.json`
   - V Cursoru: `Cmd+S` (Mac) nebo `Ctrl+S` (Windows)
   - Nebo: Soubor → Uložit

---

## Krok 4: Pushněte na GitHub

**Otevřete terminál** (v Cursoru: `Ctrl+`` nebo `Cmd+``)

**Spusťte tyto příkazy:**

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
git add .
git commit -m "Přidán nový produkt: hrnek-modry"
git push
```

**Co každý příkaz dělá:**
- `git add .` - Přidá všechny změny (včetně upraveného `products.json`)
- `git commit -m "..."` - Uloží změny s popisem
- `git push` - Odešle změny na GitHub

---

## Krok 5: Hotovo! ✅

1. **Vercel automaticky detekuje** push na GitHub (během 10-30 sekund)
2. **Začne buildovat** projekt (1-2 minuty)
3. **Web se automaticky aktualizuje**
4. **Zkontrolujte:** https://retrokredenc-shop.vercel.app/produkty

Nový produkt by měl být vidět na webu!

---

## 📋 Konkrétní příklad

### Příklad 1: Jedna fotka

**Fotka:** `public/products/hrnek-zeleny.jpg`

**Přidáte do products.json:**
```json
{
  "id": "hrnek-zeleny",
  "name": "Zelený retro hrnek",
  "category": "hrnky",
  "year": "1980",
  "price": 380,
  "description": "Zelený porcelánový hrnek z roku 1980.",
  "image": "hrnek-zeleny.jpg",
  "available": true
}
```

---

### Příklad 2: Více fotek

**Fotky:** 
- `public/products/talir-kvetiny.jpg`
- `public/products/talir-kvetiny-2.jpg`
- `public/products/talir-kvetiny-3.jpg`

**Přidáte do products.json:**
```json
{
  "id": "talir-kvetiny",
  "name": "Talířek s květinovým vzorem",
  "category": "talire",
  "year": "1965",
  "price": 250,
  "description": "Krásný talířek s květinovým vzorem z roku 1965.",
  "image": "talir-kvetiny.jpg",
  "images": ["talir-kvetiny.jpg", "talir-kvetiny-2.jpg", "talir-kvetiny-3.jpg"],
  "available": true
}
```

---

## ⚠️ Časté chyby

### Chyba 1: Zapomněl jsem čárku

**Špatně:**
```json
{
  "id": "hrnek-modry",
  ...
}
{
  "id": "hrnek-zeleny",  // ❌ Chybí čárka před tímto produktem
  ...
}
```

**Správně:**
```json
{
  "id": "hrnek-modry",
  ...
},  // ✅ Čárka zde
{
  "id": "hrnek-zeleny",
  ...
}
```

---

### Chyba 2: Špatný název fotky

**Špatně:**
```json
{
  "id": "hrnek-modry",
  "image": "hrnek_modry.jpg",  // ❌ Použil jsem podtržítko místo pomlčky
  ...
}
```

**Správně:**
```json
{
  "id": "hrnek-modry",
  "image": "hrnek-modry.jpg",  // ✅ Pomlčka
  ...
}
```

---

### Chyba 3: Zapomněl jsem uzavřít závorky

**Špatně:**
```json
{
  "id": "hrnek-modry",
  "name": "Modrý hrnek",
  // ❌ Chybí uzavírací závorky
```

**Správně:**
```json
{
  "id": "hrnek-modry",
  "name": "Modrý hrnek",
  ...
}  // ✅ Uzavírací závorka
```

---

## ✅ Kontrolní seznam

Před pushnutím zkontrolujte:

- [ ] Fotka je ve složce `public/products/`
- [ ] Název fotky je správný (malá písmena, bez mezer)
- [ ] `"id"` v JSON odpovídá názvu fotky (bez přípony)
- [ ] `"image"` v JSON přesně odpovídá názvu souboru
- [ ] Přidali jste čárku před novým produktem
- [ ] Všechny závorky `{` `}` jsou správně uzavřené
- [ ] Soubor je uložený

---

## 🆘 Pokud něco nefunguje

### Build selže na Vercel

**Řešení:**
1. Zkontrolujte JSON syntax (čárky, závorky)
2. Použijte online JSON validator: https://jsonlint.com/
3. Zkontrolujte, že název fotky přesně odpovídá `"image"`

### Produkt se nezobrazí na webu

**Řešení:**
1. Zkontrolujte, že fotka existuje ve složce `public/products/`
2. Zkontrolujte, že `"id"` a `"image"` jsou správně
3. Zkontrolujte, že jste pushnuli změny na GitHub
4. Počkejte 1-2 minuty na dokončení buildu na Vercel

---

## 💡 Tipy

- **Zkopírujte existující produkt** a upravte ho - bude to rychlejší
- **Použijte JSON validator** před pushnutím
- **Udržujte konzistentní pojmenování** (např. `hrnek-001`, `hrnek-002`)
- **Popis produktu** buďte konkrétní - rok, stav, zajímavosti

---

## 📚 Související návody

- **[JAK_SPRAVOVAT_WEB.md](JAK_SPRAVOVAT_WEB.md)** - Kompletní návod na správu produktů
- **[AUTOMATICKE_PRIDAVANI_FOTEK.md](AUTOMATICKE_PRIDAVANI_FOTEK.md)** - Automatické přidávání fotek

---

**Shrnutí:** "Upravit products.json a pushnout" znamená:
1. ✅ Otevřít `src/data/products.json`
2. ✅ Přidat nový produkt do seznamu
3. ✅ Uložit soubor
4. ✅ Spustit `git add .`, `git commit -m "..."`, `git push`
5. ✅ Hotovo! Vercel automaticky nasadí změny
