# 📦 Jednoduchý návod pro správu produktů

Tento návod je určen pro osoby s minimálními znalostmi počítače.

## Jak přidat nový produkt

### Krok 1: Přidejte fotografii

1. Otevřete složku `public/products` v projektu
2. Zkopírujte fotografii produktu do této složky
3. Přejmenujte soubor tak, aby měl jednoduchý název:
   - ✅ **Dobře**: `hrnek-004.jpg`, `talir-005.jpg`
   - ❌ **Špatně**: `DSC_1234.jpg`, `foto produktu.jpg` (mezery a diakritika)

**Důležité:**
- Použijte malá písmena
- Bez mezer (místo mezery použijte pomlčku `-`)
- Bez diakritiky (žádné čárky, háčky)
- Přípona musí být `.jpg` nebo `.png`

### Krok 2: Přidejte informace o produktu

1. Otevřete soubor `src/data/products.json` v textovém editoru
   - Můžete použít Poznámkový blok (Windows) nebo TextEdit (Mac)
   - Nebo jakýkoliv jiný textový editor

2. Najděte řádek s `"products": [` (na začátku seznamu produktů)

3. Před uzavírací závorku `]` přidejte čárku a nový produkt:

```json
{
  "id": "hrnek-004",
  "name": "Název produktu",
  "category": "hrnky",
  "year": "1985",
  "price": 450,
  "description": "Popis produktu - co je to za kousek, jaký je stav, atd.",
  "image": "hrnek-004.jpg",
  "available": true
}
```

4. **Důležité:** 
   - `"id"` musí být stejný jako název souboru fotky (bez přípony)
   - `"image"` musí být přesně stejný název jako soubor fotky
   - `"available"` může být `true` (dostupné) nebo `false` (vyprodáno)

### Krok 3: Uložte a nasaďte

1. Uložte soubor `products.json`
2. Pokud používáte GitHub:
   - Commitněte změny
   - Pushněte na GitHub
   - Web se automaticky aktualizuje

## Příklady kategorií

- `hrnky` - pro všechny hrnečky
- `talire` - pro všechny talířky
- Můžete přidat další podle potřeby (např. `misky`, `konvice`, atd.)

## Kontrola

Po přidání produktu zkontrolujte:
- ✅ Je fotka ve složce `public/products/`?
- ✅ Je název fotky stejný jako `"image"` v JSON?
- ✅ Je `"id"` stejný jako název fotky (bez přípony)?
- ✅ Jsou všechny závorky a čárky správně?

## Pomoc

Pokud máte problémy:
1. Zkontrolujte, že JSON je správně formátovaný (čárky, závorky)
2. Ujistěte se, že název fotky přesně odpovídá `"image"` v JSON
3. Kontaktujte správce projektu

---

**Tip:** Pokud si nejste jisti, zkopírujte existující produkt a upravte ho!
