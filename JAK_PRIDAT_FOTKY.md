# 📸 Jak přidat fotky produktů

Máte **dvě možnosti**, jak organizovat fotky. Obě fungují stejně dobře - vyberte si tu, která vám vyhovuje!

## Varianta 1: Všechny fotky do jedné složky (Doporučeno) ⭐

**Nejjednodušší způsob** - všechny fotky vložte do složky:
```
public/products/
```

### Pojmenování fotek:

**Pokud máte jednu fotku na produkt:**
- `hrnek-001.jpg` (hlavní fotka)
- `talir-001.jpg`
- `hrnek-002.jpg`

**Pokud máte více fotek jednoho produktu:**
- `hrnek-001.jpg` (hlavní fotka - první)
- `hrnek-001-2.jpg` (druhá fotka)
- `hrnek-001-3.jpg` (třetí fotka)
- `hrnek-001-4.jpg` (čtvrtá fotka)

**Pravidla:**
- ✅ Použijte ID produktu jako základ názvu
- ✅ Pro další fotky přidejte `-2`, `-3`, `-4` atd.
- ✅ Malá písmena, bez mezer
- ✅ Bez diakritiky (čárky, háčky)
- ✅ Přípona `.jpg` nebo `.png`

### Příklad v products.json:

```json
{
  "id": "hrnek-001",
  "name": "Retro hrnek Československo 1975",
  "image": "hrnek-001.jpg",
  "images": ["hrnek-001.jpg", "hrnek-001-2.jpg", "hrnek-001-3.jpg"],
  ...
}
```

**Pokud máte jen jednu fotku:**
```json
{
  "id": "hrnek-001",
  "image": "hrnek-001.jpg",
  ...
}
```
(Web automaticky použije jen hlavní fotku)

---

## Varianta 2: Každý produkt do vlastní složky

**Organizovanější způsob** - každý produkt má svou složku:
```
public/products/
  ├── hrnek-001/
  │   ├── 1.jpg
  │   ├── 2.jpg
  │   └── 3.jpg
  ├── talir-001/
  │   ├── 1.jpg
  │   └── 2.jpg
```

### Příklad v products.json:

```json
{
  "id": "hrnek-001",
  "name": "Retro hrnek",
  "image": "hrnek-001/1.jpg",
  "images": ["hrnek-001/1.jpg", "hrnek-001/2.jpg", "hrnek-001/3.jpg"],
  ...
}
```

**Pravidla:**
- ✅ Složka má název podle ID produktu
- ✅ Fotky v složce: `1.jpg`, `2.jpg`, `3.jpg` (nebo s názvy)
- ✅ První fotka (`1.jpg`) je hlavní

---

## 📋 Jednoduchý postup pro přidání produktu

### 1. Přidejte fotky

**Varianta 1** (doporučeno):
```
public/products/hrnek-004.jpg          (hlavní)
public/products/hrnek-004-2.jpg        (další)
public/products/hrnek-004-3.jpg        (další)
```

**Varianta 2**:
```
public/products/hrnek-004/1.jpg
public/products/hrnek-004/2.jpg
public/products/hrnek-004/3.jpg
```

### 2. Upravte products.json

Otevřete `src/data/products.json` a přidejte:

**Pokud máte více fotek:**
```json
{
  "id": "hrnek-004",
  "name": "Název produktu",
  "category": "hrnky",
  "year": "1985",
  "price": 450,
  "description": "Popis...",
  "image": "hrnek-004.jpg",
  "images": ["hrnek-004.jpg", "hrnek-004-2.jpg", "hrnek-004-3.jpg"],
  "available": true
}
```

**Pokud máte jen jednu fotku:**
```json
{
  "id": "hrnek-004",
  "name": "Název produktu",
  "category": "hrnky",
  "year": "1985",
  "price": 450,
  "description": "Popis...",
  "image": "hrnek-004.jpg",
  "available": true
}
```

### 3. Uložte a uvidíte změny

Web se automaticky obnoví a fotky se zobrazí!

---

## ❓ Často kladené otázky

**Q: Musím mít pole `images`, když mám jen jednu fotku?**
A: Ne! Stačí `image`. Pole `images` je volitelné a použije se jen pokud ho zadáte.

**Q: Kolik fotek můžu přidat?**
A: Kolik chcete! Web zobrazí všechny fotky v galerii.

**Q: Jaká velikost fotek je ideální?**
A: Doporučujeme 800-1200px na šířku. Web je automaticky optimalizuje.

**Q: Můžu použít mix obou variant?**
A: Ano! Můžete mít některé produkty v jedné složce, jiné ve složkách.

**Q: Jak se fotky zobrazí na webu?**
A: První fotka se zobrazí velká, ostatní jako malé náhledy pod ní. Po kliknutí na náhled se fotka změní.

---

## 💡 Tipy

- **Hlavní fotka** by měla být ta nejlepší - zobrazí se v katalogu
- **Doplňkové fotky** ukazují detaily, různé úhly, atd.
- **Pojmenování** si udržujte konzistentní - bude se vám lépe orientovat

---

**Potřebujete pomoct?** Kontaktujte správce projektu!
