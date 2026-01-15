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

**📖 Podrobný návod:** Viz [navody/JAK_SPUSTIT.md](navody/JAK_SPUSTIT.md)

### Build pro produkci

```bash
npm run build
```

## 📦 Správa produktů

**📖 Podrobné návody:**
- [navody/SPRAVA_PRODUKTU.md](navody/SPRAVA_PRODUKTU.md) - Jak přidat a spravovat produkty
- [navody/JAK_PRIDAT_FOTKY.md](navody/JAK_PRIDAT_FOTKY.md) - Jak přidat fotky produktů (včetně z telefonu)

### Rychlý přehled

1. **Přidejte fotografii produktu**
   - Vložte foto do složky `public/products/`
   - Pojmenujte soubor například: `hrnek-004.jpg`
   - Důležité: použijte malá písmena, bez mezer, s příponou .jpg nebo .png

2. **Přidejte informace o produktu**
   - Otevřete soubor `src/data/products.json` v textovém editoru
   - Najděte sekci `"products": [...]`
   - Přidejte nový objekt s informacemi o produktu

3. **Uložte soubor a nasaďte na web**
   - Pokud používáte GitHub, commitněte změny a pushněte
   - Web se automaticky aktualizuje

**Pro podrobné instrukce viz [navody/SPRAVA_PRODUKTU.md](navody/SPRAVA_PRODUKTU.md)**

## 🌐 Deployment

### 🚀 Vercel (doporučeno - nejjednodušší)

**Nejjednodušší způsob nasazení Next.js aplikace!**

- ✅ Automatické nasazení při každém push
- ✅ HTTPS zdarma
- ✅ Rychlý a bezplatný pro osobní projekty
- ✅ Podpora custom domain

**📖 Podrobný návod:** [navody/JAK_NASTAVIT_VERCEL.md](navody/JAK_NASTAVIT_VERCEL.md)

**Rychlý start:**
1. Vytvořte účet na [vercel.com](https://vercel.com) (přihlaste se přes GitHub)
2. Klikněte "Add New Project" → vyberte "retrokredenc"
3. Klikněte "Deploy"
4. Hotovo! Web je živý na `retrokredenc.vercel.app`

---

### 📦 GitHub Pages

**Podrobné návody:**
- 📖 **[Kompletní návod na nastavení hostingu](navody/NASTAVENI_HOSTINGU.md)** - krok za krokem návod pro nastavení GitHub Pages s vlastní doménou
- 📖 **[Nastavení DNS u Wedos](navody/DNS_WEDOS_NAVOD.md)** - podrobný návod na nastavení DNS záznamů u Wedos

**Rychlý přehled:**
1. Nastavte DNS záznamy u Wedos (4 A záznamy pro GitHub Pages) - viz [navody/DNS_WEDOS_NAVOD.md](navody/DNS_WEDOS_NAVOD.md)
2. Vytvořte nový repository na GitHub
3. Pushněte kód do repository
4. V Settings → Pages nastavte:
   - Source: GitHub Actions
   - Custom domain: retrokredenc.cz
5. Přidejte Secrets v Settings → Secrets and variables → Actions (volitelné):
   - `NEXT_PUBLIC_FORMSPREE_ENDPOINT` (pokud používáte Formspree)
   - `NEXT_PUBLIC_FACEBOOK_URL` (volitelné)
   - `NEXT_PUBLIC_INSTAGRAM_URL` (volitelné)

**Pro kompletní návod s detailními instrukcemi viz [navody/NASTAVENI_HOSTINGU.md](navody/NASTAVENI_HOSTINGU.md)**

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
├── navody/                # 📚 Všechny návody a dokumentace
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

## 📚 Hlavní návody

Všechny návody najdete ve složce **[navody/](navody/)**:

- **[navody/JAK_SPRAVOVAT_WEB.md](navody/JAK_SPRAVOVAT_WEB.md)** - ⭐ **Kompletní návod** - Jak přidávat produkty, fotky a upravovat texty
- **[navody/JAK_SMAZAT_PRODUKT.md](navody/JAK_SMAZAT_PRODUKT.md)** - 🗑️ **Jak smazat produkt z webu** - Jednoduchý návod na odstranění produktu
- **[navody/AUTOMATICKE_PRIDAVANI_FOTEK.md](navody/AUTOMATICKE_PRIDAVANI_FOTEK.md)** - 🤖 **Automatické přidávání fotek** - Jak nastavit automatické workflow bez manuálního zasahování
- **[navody/JAK_VYFOTIT_A_POSLAT_FOTKU.md](navody/JAK_VYFOTIT_A_POSLAT_FOTKU.md)** - 📸 **Jak vyfotit produkt a poslat fotku z Android telefonu** (pro osoby bez technických znalostí)
- **[navody/CO_ZNAMENA_UPRAVIT_PRODUCTS_JSON.md](navody/CO_ZNAMENA_UPRAVIT_PRODUCTS_JSON.md)** - Co znamená upravit products.json a pushnout
- **[navody/JAK_NASTAVIT_VERCEL.md](navody/JAK_NASTAVIT_VERCEL.md)** - 🚀 Jak nasadit web na Vercel (nejjednodušší způsob)
- **[navody/JAK_SPUSTIT.md](navody/JAK_SPUSTIT.md)** - Jak spustit web lokálně pro testování
- **[navody/SPRAVA_PRODUKTU.md](navody/SPRAVA_PRODUKTU.md)** - Jak přidat a spravovat produkty (podrobněji)
- **[navody/JAK_PRIDAT_FOTKY.md](navody/JAK_PRIDAT_FOTKY.md)** - Jak přidat fotky produktů (včetně z telefonu)
- **[navody/JAK_SDILET_S_KOLEGOU.md](navody/JAK_SDILET_S_KOLEGOU.md)** - Jak sdílet web s kolegou pro feedback a úpravy
- **[navody/JAK_AKTUALIZOVAT_WEB.md](navody/JAK_AKTUALIZOVAT_WEB.md)** - Jak aktualizovat web na GitHub Pages
- **[navody/JAK_OPRAVIT_CESTY_PRO_HOSTING.md](navody/JAK_OPRAVIT_CESTY_PRO_HOSTING.md)** - Jak opravit cesty pro různé hosty

**📖 Kompletní seznam všech návodů:** [navody/README.md](navody/README.md)

## 🔒 Bezpečnost

- Web je statický (bez backendu)
- HTTPS automaticky přes GitHub Pages
- Formuláře jsou validovány na frontendu
- Sanitizace vstupů

## 📞 Podpora

Pro dotazy nebo problémy kontaktujte správce projektu.

---

**Retro Kredenc** - Krása starých časů ✨
