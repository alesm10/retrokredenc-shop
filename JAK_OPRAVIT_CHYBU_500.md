# 🔧 Oprava chyby 500 (Internal Server Error)

## Problém

V terminálu vidíte chybu `GET / 500 in 2284ms` - to znamená, že Next.js se snaží renderovat hlavní stránku, ale něco se pokazilo.

---

## Rychlé řešení

### Krok 1: Zastavte server

V terminálu, kde běží `npm run dev`:
- Stiskněte **`Ctrl + C`** (zastaví server)

### Krok 2: Vymažte cache a restartujte

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"

# Smažte .next složku (cache)
rm -rf .next

# Restartujte server
npm run dev
```

### Krok 3: Zkontrolujte, jestli web funguje

Otevřete v prohlížeči: `http://localhost:3000`

Měli byste vidět web bez chyby 500.

---

## Pokud to stále nefunguje

### Zkontrolujte, jestli všechny produkty mají obrázky

```bash
# Zkontrolujte, jestli existují všechny obrázky produktů
ls -la public/products/
```

**Měli byste vidět:**
- `kralovsky1.jpeg`
- `kralovsky1-2.jpeg`
- `kralovsky1-3.jpeg`
- `kralovsky1-4.jpeg`
- `oranzovykvet1.jpeg`
- `oranzovykvet1-2.jpeg`
- `oranzovykvet1-3.jpeg`
- `oranzovykvet1-4.jpeg`
- `sadagold1.jpeg`
- `sadagold1-2.jpeg`
- `sadagold1-3.jpeg`
- `sadagold1-4.jpeg`

**Pokud nějaký obrázek chybí:**
- Zkontrolujte `src/data/products.json` - měl by obsahovat správné názvy obrázků
- Nebo přidejte chybějící obrázky do `public/products/`

### Zkontrolujte, jestli existuje obrázek kredencu

```bash
# Zkontrolujte, jestli existuje obrázek kredencu
ls -la public/images/kredenc.png
```

**Pokud obrázek neexistuje:**
- Přidejte obrázek `kredenc.png` do složky `public/images/`
- Nebo upravte `HeroImage.tsx`, aby nepoužíval tento obrázek

---

## Detailní debugování

### 1. Zkontrolujte chyby v terminálu

V terminálu, kde běží `npm run dev`, hledejte:
- Červené chybové zprávy
- Stack trace (seznam souborů s chybami)
- Konkrétní chybové hlášky

**Příklady chyb:**
- `Cannot find module` → Chybí nějaký soubor
- `Cannot read property` → Problém s daty
- `Invalid image` → Problém s obrázkem

### 2. Zkontrolujte prohlížeč

Otevřete Developer Tools (F12 nebo Cmd+Option+I):
- **Console tab** → Hledejte červené chyby
- **Network tab** → Zkontrolujte, jestli se všechny soubory načítají správně

### 3. Zkontrolujte produkty.json

```bash
# Zkontrolujte syntaxi JSON
cat src/data/products.json | python3 -m json.tool
```

**Pokud vidíte chybu:**
- JSON má špatnou syntaxi
- Opravte chyby v `src/data/products.json`

---

## Možné příčiny chyby 500

### 1. Chybějící obrázky produktů

**Problém:** Produkt v `products.json` má obrázek, který neexistuje v `public/products/`

**Řešení:**
- Přidejte chybějící obrázky
- Nebo odstraňte produkty bez obrázků z `products.json`

### 2. Chybná syntaxe JSON

**Problém:** `products.json` má chybnou syntaxi (chybějící čárka, závorka, atd.)

**Řešení:**
- Zkontrolujte syntaxi JSON (viz výše)
- Opravte chyby

### 3. Problém s komponentou

**Problém:** Nějaký komponent má chybu (např. `HeroImage`, `ProductCard`)

**Řešení:**
- Zkontrolujte chyby v terminálu
- Zkontrolujte komponenty v `src/components/`

### 4. Problém s Next.js Image

**Problém:** Next.js Image komponenta má problém s obrázky

**Řešení:**
- Zkontrolujte `next.config.js` - měl by mít `unoptimized: true`
- Zkontrolujte, jestli všechny obrázky existují

### 5. Cache problém

**Problém:** Next.js cache je poškozená

**Řešení:**
```bash
rm -rf .next
npm run dev
```

---

## Co jsem opravil

1. ✅ **HeroImage.tsx** - Opravil jsem konflikt s `width/height` a `fill` - teď používá jen `fill`
2. ✅ **page.tsx** - Přidal jsem bezpečnější zpracování produktů

---

## Zkuste to znovu

1. **Zastavte server:** `Ctrl + C`
2. **Smažte cache:** `rm -rf .next`
3. **Restartujte:** `npm run dev`
4. **Otevřete:** `http://localhost:3000`

**Měli byste vidět web bez chyby 500!**

---

## Pokud to stále nefunguje

**Pošlete mi:**
1. Úplnou chybovou zprávu z terminálu (kde běží npm run dev)
2. Chyby z prohlížeče (F12 → Console tab)
3. Výstup z: `ls -la public/products/` a `ls -la public/images/`

**A já vám pomůžu to opravit!**
