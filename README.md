# Retro Kredenc - E-shop pro retro československý porcelán

E-shop pro prodej autentického československého porcelánu z let 1950-1989. Téma: **Krása starých časů**.

## 🚀 Rychlý start

### Instalace

```bash
npm install
```

### Vývoj

```bash
npm run dev
```

Otevřete [http://localhost:3000](http://localhost:3000) v prohlížeči.

### Build pro produkci

```bash
npm run build
```

## 📦 Správa produktů

### Jak přidat nový produkt

1. **Přidejte fotografii produktu**
   - Vložte foto do složky `public/products/`
   - Pojmenujte soubor například: `hrnek-004.jpg`
   - Důležité: použijte malá písmena, bez mezer, s příponou .jpg nebo .png

2. **Přidejte informace o produktu**
   - Otevřete soubor `src/data/products.json` v textovém editoru
   - Najděte sekci `"products": [...]`
   - Přidejte nový objekt s informacemi o produktu:

```json
{
  "id": "hrnek-004",
  "name": "Název produktu",
  "category": "hrnky",
  "year": "1985",
  "price": 450,
  "description": "Popis produktu...",
  "image": "hrnek-004.jpg",
  "available": true
}
```

3. **Uložte soubor a nasaďte na web**
   - Pokud používáte GitHub, commitněte změny a pushněte
   - Web se automaticky aktualizuje

### Kategorie produktů

- `hrnky` - pro hrnečky
- `talire` - pro talířky
- Můžete přidat další kategorie podle potřeby

### Formát dat produktu

- **id**: Jedinečný identifikátor (např. "hrnek-001")
- **name**: Název produktu
- **category**: Kategorie produktu
- **year**: Rok výroby (řetězec, např. "1975")
- **price**: Cena v Kč (číslo)
- **description**: Popis produktu
- **image**: Název souboru obrázku (musí být v `public/products/`)
- **available**: `true` nebo `false` - zda je produkt dostupný

## 🌐 Deployment na GitHub Pages

**Podrobné návody:**
- 📖 **[Kompletní návod na nastavení hostingu](NASTAVENI_HOSTINGU.md)** - krok za krokem návod pro nastavení GitHub Pages s vlastní doménou
- 📖 **[Nastavení DNS u Wedos](DNS_WEDOS_NAVOD.md)** - podrobný návod na nastavení DNS záznamů u Wedos

**Rychlý přehled:**
1. Nastavte DNS záznamy u Wedos (4 A záznamy pro GitHub Pages) - viz [DNS_WEDOS_NAVOD.md](DNS_WEDOS_NAVOD.md)
2. Vytvořte nový repository na GitHub
3. Pushněte kód do repository
4. V Settings → Pages nastavte:
   - Source: GitHub Actions
   - Custom domain: retrokredenc.cz
5. Přidejte Secrets v Settings → Secrets and variables → Actions (volitelné):
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (pokud používáte Formspree)
   - `NEXT_PUBLIC_FACEBOOK_URL` (volitelné)
   - `NEXT_PUBLIC_INSTAGRAM_URL` (volitelné)

**Pro kompletní návod s detailními instrukcemi viz [NASTAVENI_HOSTINGU.md](NASTAVENI_HOSTINGU.md)**

## 📧 Kontaktní formulář

Pro funkční kontaktní formulář potřebujete:

1. Vytvořit účet na [Formspree.io](https://formspree.io)
2. Vytvořit nový formulář a získat endpoint URL
3. Přidat URL do `.env.local` nebo jako GitHub Secret:
   ```
   NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
   ```

## 🔗 Sociální sítě

Pro přidání odkazů na Facebook a Instagram:

1. Přidejte URL do `.env.local` nebo jako GitHub Secrets:
   ```
   NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/your-page
   NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/your-profile
   ```

Ikony se automaticky zobrazí v patičce webu.

## 🎨 Design

Web používá retro barevnou paletu:
- Primární: #C9A961 (teplá zlatá)
- Sekundární: #8B6F47 (teplá hnědá)
- Pozadí: #F5F1E8 (krémová)
- Text: #3D3D3D (tmavě šedá)
- Akcent: #D4A574 (terakota)

## 📝 Struktura projektu

```
retrokredenc/
├── public/
│   ├── products/          # Fotky produktů
│   └── images/            # Ostatní obrázky
├── src/
│   ├── app/               # Next.js stránky
│   ├── components/        # React komponenty
│   ├── data/              # Data produktů (JSON)
│   └── styles/            # Globální styly
└── .github/workflows/     # GitHub Actions
```

## 🔒 Bezpečnost

- Web je statický (bez backendu)
- HTTPS automaticky přes GitHub Pages
- Formuláře jsou validovány na frontendu
- Sanitizace vstupů

## 📞 Podpora

Pro dotazy nebo problémy kontaktujte správce projektu.

---

**Retro Kredenc** - Krása starých časů ✨
