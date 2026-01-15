# 🗑️ Jak smazat produkt z webu

Jednoduchý návod, jak odstranit produkt (např. hrnek) z webu Retro Kredenc.

---

## 🎯 Jak to funguje

1. **Otevřete** `src/data/products.json`
2. **Najděte produkt**, který chcete smazat
3. **Smažte celý objekt** produktu (včetně čárky)
4. **Uložte soubor**
5. **Pushněte na GitHub** → Vercel automaticky nasadí změny
6. **Hotovo!** ✅ Produkt zmizí z webu

---

## 📋 Krok za krokem

### Krok 1: Otevřete products.json

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
      "id": "hrnek-modry",
      "name": "Modrý retro hrnek",
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

### Krok 2: Najděte produkt, který chcete smazat

**Příklad:** Chcete smazat produkt `hrnek-modry`

Najděte tento produkt v seznamu:
```json
{
  "id": "hrnek-modry",
  "name": "Modrý retro hrnek",
  "category": "hrnky",
  "year": "1975",
  "price": 450,
  "description": "Krásný modrý porcelánový hrnek z roku 1975.",
  "image": "hrnek-modry.jpg",
  "available": true
}
```

---

### Krok 3: Smažte produkt

**Důležité:** Smažte celý objekt produktu včetně čárky před ním (nebo za ním, pokud je poslední).

**Před smazáním:**
```json
{
  "products": [
    {
      "id": "kralovsky1",
      ...
    },
    {                                    // ← Čárka zde
      "id": "hrnek-modry",               // ← Tento produkt chcete smazat
      "name": "Modrý retro hrnek",
      ...
    },
    {
      "id": "oranzovykvet1",
      ...
    }
  ]
}
```

**Po smazání:**
```json
{
  "products": [
    {
      "id": "kralovsky1",
      ...
    },
    {                                    // ← Čárka byla také smazána
      "id": "oranzovykvet1",
      ...
    }
  ]
}
```

**Poznámka:** Pokud je produkt první v seznamu, smažte čárku za ním:
```json
{
  "products": [
    {
      "id": "hrnek-modry",               // ← První produkt
      ...
    },                                    // ← Čárka zde (za produktem)
    {
      "id": "kralovsky1",
      ...
    }
  ]
}
```

**Po smazání prvního produktu:**
```json
{
  "products": [
    {
      "id": "kralovsky1",                // ← Čárka byla smazána
      ...
    }
  ]
}
```

---

### Krok 4: Uložte soubor

1. **Uložte soubor** `products.json`
   - V Cursoru: `Cmd+S` (Mac) nebo `Ctrl+S` (Windows)
   - Nebo: Soubor → Uložit

---

### Krok 5: Pushněte na GitHub

**Otevřete terminál** (v Cursoru: `Ctrl+`` nebo `Cmd+``)

**Spusťte tyto příkazy:**

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
git add .
git commit -m "Smazán produkt: hrnek-modry"
git push
```

**Co každý příkaz dělá:**
- `git add .` - Přidá všechny změny
- `git commit -m "..."` - Uloží změny s popisem
- `git push` - Odešle změny na GitHub

---

### Krok 6: Hotovo! ✅

1. **Vercel automaticky detekuje** push na GitHub (během 10-30 sekund)
2. **Začne buildovat** projekt (1-2 minuty)
3. **Web se automaticky aktualizuje**
4. **Zkontrolujte:** https://retrokredenc-shop.vercel.app/produkty

Produkt by měl zmizet z webu!

---

## 📸 Co s fotkami? (Volitelné)

### Možnost 1: Nechat fotky (Doporučeno)

**Fotky můžete nechat ve složce** `public/products/` - nebudou se zobrazovat na webu, ale zůstanou pro případné budoucí použití.

**Výhody:**
- ✅ Můžete produkt znovu přidat později
- ✅ Fotky jsou zálohované
- ✅ Žádné další kroky

---

### Možnost 2: Smazat fotky

Pokud chcete fotky úplně smazat:

1. **Najděte fotky produktu** ve složce `public/products/`
   - Např.: `hrnek-modry.jpg`, `hrnek-modry-2.jpg`, atd.

2. **Smažte fotky:**
   - V Cursoru: pravé tlačítko → Delete
   - Nebo: smažte přímo ve Finderu/Průzkumníku

3. **Pushněte změny:**
   ```bash
   git add .
   git commit -m "Smazány fotky produktu: hrnek-modry"
   git push
   ```

**Poznámka:** Fotky se smažou z GitHubu, ale pokud máte Google Drive synchronizaci, fotky tam zůstanou.

---

## ⚠️ Časté chyby

### Chyba 1: Zapomněl jsem smazat čárku

**Špatně:**
```json
{
  "products": [
    {
      "id": "kralovsky1",
      ...
    },
    ,                                    // ❌ Zůstala čárka bez produktu
    {
      "id": "oranzovykvet1",
      ...
    }
  ]
}
```

**Správně:**
```json
{
  "products": [
    {
      "id": "kralovsky1",
      ...
    },
    {                                    // ✅ Čárka byla smazána
      "id": "oranzovykvet1",
      ...
    }
  ]
}
```

---

### Chyba 2: Smazal jsem jen část produktu

**Špatně:**
```json
{
  "products": [
    {
      "id": "kralovsky1",
      ...
    },
    {
      "id": "hrnek-modry",               // ❌ Zůstala jen část
      "name": "Modrý retro hrnek",
      // ❌ Chybí zbytek a uzavírací závorka
    }
  ]
}
```

**Správně:**
```json
{
  "products": [
    {
      "id": "kralovsky1",
      ...
    }
    // ✅ Celý produkt byl smazán
  ]
}
```

---

### Chyba 3: Smazal jsem uzavírací závorku seznamu

**Špatně:**
```json
{
  "products": [
    {
      "id": "kralovsky1",
      ...
    }
  // ❌ Chybí uzavírací závorka ]
}
```

**Správně:**
```json
{
  "products": [
    {
      "id": "kralovsky1",
      ...
    }
  ]  // ✅ Uzavírací závorka je zde
}
```

---

## ✅ Kontrolní seznam

Před pushnutím zkontrolujte:

- [ ] Produkt byl úplně smazán (celý objekt `{...}`)
- [ ] Čárka před nebo za produktem byla smazána
- [ ] Všechny závorky `[` `]` `{` `}` jsou správně uzavřené
- [ ] Soubor je uložený
- [ ] JSON syntaxe je správná (můžete použít https://jsonlint.com/)

---

## 🔄 Obnovení produktu (Pokud jste ho smazali omylem)

Pokud jste produkt smazali omylem a chcete ho vrátit:

1. **Zkontrolujte Git historii:**
   ```bash
   git log --oneline src/data/products.json
   ```

2. **Najděte commit**, kde jste produkt smazali

3. **Obnovte soubor z předchozí verze:**
   ```bash
   git checkout [HASH-COMMITU]~1 -- src/data/products.json
   ```
   (Nahraďte `[HASH-COMMITU]` hash commitu před smazáním)

4. **Nebo:** Zkopírujte produkt z GitHubu (historie souboru)

---

## 💡 Tipy

- **Před smazáním:** Zkontrolujte, že produkt opravdu chcete smazat
- **Záloha:** Git automaticky uchovává historii, takže můžete produkt obnovit
- **Fotky:** Můžete nechat fotky ve složce - nebudou se zobrazovat na webu
- **Popis commitu:** Použijte popisný commit message (např. "Smazán produkt: hrnek-modry")

---

## 📚 Související návody

- **[JAK_SPRAVOVAT_WEB.md](JAK_SPRAVOVAT_WEB.md)** - Kompletní návod na správu produktů
- **[CO_ZNAMENA_UPRAVIT_PRODUCTS_JSON.md](CO_ZNAMENA_UPRAVIT_PRODUCTS_JSON.md)** - Co znamená upravit products.json

---

## 🆘 Pokud něco nefunguje

### Produkt se stále zobrazuje na webu

**Řešení:**
1. Zkontrolujte, že jste pushnuli změny na GitHub
2. Zkontrolujte Vercel dashboard - měl by být nový deployment
3. Počkejte 1-2 minuty na dokončení buildu
4. Obnovte stránku v prohlížeči (Ctrl+F5 nebo Cmd+Shift+R)

### Build selže na Vercel

**Řešení:**
1. Zkontrolujte JSON syntax (čárky, závorky)
2. Použijte online JSON validator: https://jsonlint.com/
3. Zkontrolujte, že všechny závorky jsou správně uzavřené

---

**Shrnutí:** Smazání produktu = smazat objekt z `products.json` → uložit → pushnout → hotovo!
