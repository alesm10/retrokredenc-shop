# 📝 Jak spravovat web - Přidávání produktů a úprava textů

Jednoduchý návod pro správu produktů, fotek a textů na webu Retro Kredenc.

---

## 🎯 Rychlý přehled

1. **Přidat produkt:** Přidejte fotku → Upravte `products.json` → Pushněte na GitHub
2. **Upravit text "O nás":** Upravte `src/app/o-nas/page.tsx` → Pushněte na GitHub
3. **Vercel automaticky nasadí** změny během 1-2 minut

---

## 📦 Jak přidat nový produkt

### Krok 1: Přidejte fotky produktu

1. Otevřete složku: `public/products/`
2. Zkopírujte fotky produktu do této složky
3. Přejmenujte fotky podle tohoto vzoru:
   - **Hlavní fotka:** `produkt-001.jpg` (nebo `.jpeg`, `.png`)
   - **Další fotky:** `produkt-001-2.jpg`, `produkt-001-3.jpg`, `produkt-001-4.jpg`

**Pravidla pro názvy:**
- ✅ Malá písmena
- ✅ Bez mezer (použijte pomlčku `-`)
- ✅ Bez diakritiky (žádné čárky, háčky)
- ✅ Jednoduchý název podle produktu (např. `hrnek-modry`, `talir-kvetiny`)

**Příklad:**
```
public/products/
  ├── hrnek-modry.jpg          (hlavní fotka)
  ├── hrnek-modry-2.jpg        (druhá fotka)
  ├── hrnek-modry-3.jpg        (třetí fotka)
  └── hrnek-modry-4.jpg        (čtvrtá fotka)
```

### Krok 2: Upravte products.json

1. Otevřete soubor: `src/data/products.json`
2. Najděte řádek s `"products": [` (na začátku seznamu)
3. Před uzavírací závorku `]` přidejte čárku a nový produkt:

**Pokud máte více fotek:**
```json
{
  "id": "hrnek-modry",
  "name": "Modrý retro hrnek Československo",
  "category": "hrnky",
  "year": "1975",
  "price": 450,
  "description": "Krásný modrý porcelánový hrnek z roku 1975. Autentický československý porcelán v zachovalém stavu. Ideální pro sběratele nebo milovníky retro stylu.",
  "image": "hrnek-modry.jpg",
  "images": ["hrnek-modry.jpg", "hrnek-modry-2.jpg", "hrnek-modry-3.jpg", "hrnek-modry-4.jpg"],
  "available": true
}
```

**Pokud máte jen jednu fotku:**
```json
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
```

**Vysvětlení polí:**
- `"id"` - musí být stejný jako název fotky (bez přípony `.jpg`)
- `"name"` - název produktu, jak se zobrazí na webu
- `"category"` - kategorie (např. `"hrnky"`, `"talire"`, `"misky"`)
- `"year"` - rok nebo rozsah let (např. `"1975"` nebo `"1970-1980"`)
- `"price"` - cena v korunách (číslo bez Kč)
- `"description"` - popis produktu (co je to, stav, zajímavosti)
- `"image"` - název hlavní fotky (musí přesně odpovídat názvu souboru)
- `"images"` - pole všech fotek (volitelné, jen pokud máte více fotek)
- `"available"` - `true` (dostupné) nebo `false` (vyprodáno)

### Krok 3: Uložte a nasaďte

1. **Uložte soubor** `products.json`
2. **Commitněte a pushněte na GitHub:**
   ```bash
   cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
   git add .
   git commit -m "Přidán nový produkt: hrnek-modry"
   git push
   ```
3. **Vercel automaticky nasadí** změny během 1-2 minut
4. **Zkontrolujte web:** https://retrokredenc-shop.vercel.app/produkty

---

## 📝 Jak upravit text v sekci "O nás"

### Krok 1: Otevřete soubor

Otevřete soubor: `src/app/o-nas/page.tsx`

### Krok 2: Upravte texty

Najděte sekci s textem a upravte ho podle potřeby:

```tsx
<div className="prose prose-lg max-w-none space-y-6">
  <p className="text-lg text-gray-700 leading-relaxed">
    Vítejte v Retro Kredenc, kde se setkává historie s krásou. 
    Specializujeme se na prodej autentického československého porcelánu 
    z období 50. až 80. let minulého století.
  </p>

  <h2 className="text-2xl font-serif mt-8 mb-4">Náš příběh</h2>
  <p className="text-gray-700 leading-relaxed">
    Každý kousek v naší nabídce představuje kus historie Československa. 
    Porcelán z tohoto období je známý svou kvalitou, elegancí a jedinečným 
    designem, který odráží estetiku tehdejší doby.
  </p>

  {/* Můžete přidat další sekce */}
  <h2 className="text-2xl font-serif mt-8 mb-4">Kontakt</h2>
  <p className="text-gray-700 leading-relaxed">
    Máte dotaz? Kontaktujte nás na email@example.com nebo telefon 123 456 789.
  </p>
</div>
```

**Tipy:**
- Text můžete libovolně upravovat
- Můžete přidat nové sekce (nadpisy `<h2>` a odstavce `<p>`)
- Můžete přidat seznamy (`<ul>`, `<ol>`)
- Formátování se zachová automaticky

### Krok 3: Uložte a nasaďte

1. **Uložte soubor** `src/app/o-nas/page.tsx`
2. **Commitněte a pushněte:**
   ```bash
   git add .
   git commit -m "Aktualizován text v sekci O nás"
   git push
   ```
3. **Vercel automaticky nasadí** změny
4. **Zkontrolujte:** https://retrokredenc-shop.vercel.app/o-nas

---

## 📸 Jak přidat fotky z telefonu

### Metoda 1: Přes USB kabel (nejjednodušší)

1. Připojte telefon k počítači USB kabelem
2. Otevřete složku s fotkami na telefonu
3. Zkopírujte fotky do `public/products/` na počítači
4. Přejmenujte fotky podle pravidel výše
5. Upravte `products.json`

### Metoda 2: Přes cloud (Google Drive, iCloud, Dropbox)

1. Nahrajte fotky z telefonu do cloud úložiště
2. Stáhněte fotky na počítač
3. Zkopírujte do `public/products/`
4. Přejmenujte a upravte `products.json`

### Metoda 3: Přes email

1. Pošlete fotky emailem na svůj email
2. Stáhněte přílohy na počítači
3. Zkopírujte do `public/products/`
4. Přejmenujte a upravte `products.json`

---

## ✅ Kontrolní seznam před nasazením

Před pushnutím na GitHub zkontrolujte:

- [ ] Fotky jsou ve složce `public/products/`
- [ ] Názvy fotek jsou správné (malá písmena, bez mezer, bez diakritiky)
- [ ] `"id"` v JSON odpovídá názvu fotky (bez přípony)
- [ ] `"image"` v JSON přesně odpovídá názvu souboru fotky
- [ ] Všechny čárky a závorky v JSON jsou správně
- [ ] Soubor `products.json` je správně uložený

---

## 🆘 Řešení problémů

### Problém: Fotka se nezobrazí

**Řešení:**
1. Zkontrolujte, že název fotky v `"image"` přesně odpovídá názvu souboru
2. Zkontrolujte, že fotka je ve složce `public/products/`
3. Zkontrolujte, že přípona je správná (`.jpg`, `.jpeg`, nebo `.png`)

### Problém: JSON chyba při buildu

**Řešení:**
1. Zkontrolujte, že všechny čárky jsou správně (čárka po každém produktu kromě posledního)
2. Zkontrolujte, že všechny závorky `{` `}` `[` `]` jsou správně uzavřené
3. Použijte online JSON validator: https://jsonlint.com/

### Problém: Změny se nezobrazí na webu

**Řešení:**
1. Zkontrolujte, že jste pushnuli změny na GitHub
2. Zkontrolujte Vercel dashboard - měl by být nový deployment
3. Počkejte 1-2 minuty na dokončení buildu
4. Obnovte stránku v prohlížeči (Ctrl+F5 nebo Cmd+Shift+R)

---

## 💡 Tipy

- **Pojmenování produktů:** Použijte konzistentní systém (např. `hrnek-001`, `hrnek-002`, `talir-001`)
- **Popis produktu:** Buďte konkrétní - rok, stav, zajímavosti
- **Fotky:** Hlavní fotka by měla být ta nejlepší - zobrazí se v katalogu
- **Kategorie:** Použijte stejné kategorie pro podobné produkty
- **Ceny:** Udržujte ceny konzistentní podle stavu a stáří produktu

---

## 📚 Související návody

- **[JAK_PRIDAT_FOTKY.md](JAK_PRIDAT_FOTKY.md)** - Podrobnější návod na přidávání fotek
- **[SPRAVA_PRODUKTU.md](SPRAVA_PRODUKTU.md)** - Podrobnější návod na správu produktů
- **[JAK_NASTAVIT_VERCEL.md](JAK_NASTAVIT_VERCEL.md)** - Jak nasadit web na Vercel

---

**Potřebujete pomoct?** Zkontrolujte sekci "Řešení problémů" výše nebo kontaktujte správce projektu.
