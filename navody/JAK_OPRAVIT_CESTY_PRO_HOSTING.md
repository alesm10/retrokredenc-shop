# 🔧 Jak opravit cesty pro hosting (GitHub Pages, Vercel, NAS)

Pokud web funguje lokálně, ale nefunguje na GitHub Pages, Vercel nebo NAS, problém je pravděpodobně v **cestách k obrázkům a assets**.

---

## 🔍 Problém

- ✅ **Lokálně funguje:** `http://localhost:3000/` - vše se zobrazuje správně
- ❌ **Na hostingu nefunguje:** obrázky se nenačítají, CSS/JS nefungují

**Příčina:** Absolutní cesty `/images/...` fungují lokálně, ale když je web v subadresáři (např. `/retrokredenc` na NAS), snaží se načíst z rootu místo z subadresáře.

---

## ✅ Řešení

Použijte **environment variables** pro nastavení `basePath` podle hostingu.

---

## 📋 Postup podle hostingu

### 1️⃣ **Lokální vývoj** (`npm run dev`)

**Nastavení:** Žádné environment variables (nebo prázdné)

```bash
# Spusťte normálně
npm run dev
```

Web poběží na `http://localhost:3000/` a vše bude fungovat.

---

### 2️⃣ **NAS** (pokud je web v subadresáři `/retrokredenc`)

**Krok 1:** Otevřete Terminal a přejděte do složky projektu:

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
```

**Krok 2:** Vytvořte soubor `.env.local` pomocí terminálu:

```bash
touch .env.local
```

*(Poznámka: `.env.local` je soubor začínající tečkou, ne složka! Na Macu může být skrytý - to je normální)*

**Krok 3:** Otevřete soubor `.env.local` v textovém editoru (Cursor, TextEdit, nebo jiný) a přidejte tyto dva řádky:

```env
NEXT_PUBLIC_BASE_PATH=/retrokredenc
NEXT_PUBLIC_ASSET_PREFIX=/retrokredenc
```

**Jak otevřít soubor `.env.local`:**
- **V Cursoru:** Klikněte na `File` → `Open File` → vyberte `.env.local`
- **V Finderu:** Stiskněte `Cmd+Shift+.` (tečka) pro zobrazení skrytých souborů, pak najděte `.env.local`
- **V terminálu:** `open -e .env.local` (otevře v TextEdit)

**Krok 4:** Znovu buildujte:

```bash
npm run build
```

**Krok 5:** Zkopírujte obsah složky `out/` na NAS do `web/retrokredenc/`

**Výsledek:** Web bude dostupný na `http://nas/retrokredenc/` a všechny cesty budou správné.

---

### 3️⃣ **GitHub Pages** (pokud je repo název "retrokredenc")

**Krok 1:** Vytvořte soubor `.env.production` v kořenové složce projektu:

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
touch .env.production
```

**Krok 2:** Otevřete `.env.production` a přidejte:

```env
NEXT_PUBLIC_BASE_PATH=/retrokredenc
NEXT_PUBLIC_ASSET_PREFIX=/retrokredenc
```

*(Nahraďte `retrokredenc` názvem vašeho GitHub repository)*

**Krok 3:** Commitněte a pushněte:

```bash
git add .env.production
git commit -m "Přidána konfigurace pro GitHub Pages"
git push
```

**Výsledek:** Web bude dostupný na `https://username.github.io/retrokredenc/` a všechny cesty budou správné.

---

### 4️⃣ **Vercel** (pokud je web na hlavní doméně)

**Nastavení:** Žádné environment variables (nebo prázdné)

Vercel automaticky detekuje Next.js a nastaví správné cesty.

**Pokud je web v subadresáři:**

Vytvořte `.env.production`:

```env
NEXT_PUBLIC_BASE_PATH=/subfolder
NEXT_PUBLIC_ASSET_PREFIX=/subfolder
```

---

## 🎯 Jak zjistit správný basePath?

### Pro NAS:
- Pokud je web v `web/retrokredenc/` → basePath je `/retrokredenc`
- Pokud je web v `web/` → basePath je prázdný

### Pro GitHub Pages:
- Pokud je URL `https://username.github.io/repo-name/` → basePath je `/repo-name`
- Pokud je URL `https://username.github.io/` → basePath je prázdný

### Pro Vercel:
- Pokud je URL `https://domain.com/` → basePath je prázdný
- Pokud je URL `https://domain.com/subfolder/` → basePath je `/subfolder`

---

## 🔄 Workflow pro NAS

1. **Nastavte `.env.local`:**
   ```env
   NEXT_PUBLIC_BASE_PATH=/retrokredenc
   NEXT_PUBLIC_ASSET_PREFIX=/retrokredenc
   ```

2. **Znovu buildujte:**
   ```bash
   npm run build
   ```

3. **Zkopírujte `out/` na NAS:**
   - Obsah složky `out/` → `web/retrokredenc/` na NAS

4. **Otestujte:**
   - Otevřete `http://nas/retrokredenc/` nebo přes QuickConnect

---

## 🔄 Workflow pro GitHub Pages

1. **Vytvořte `.env.production`:**
   ```env
   NEXT_PUBLIC_BASE_PATH=/retrokredenc
   NEXT_PUBLIC_ASSET_PREFIX=/retrokredenc
   ```

2. **Commitněte a pushněte:**
   ```bash
   git add .env.production
   git commit -m "Konfigurace pro GitHub Pages"
   git push
   ```

3. **GitHub Actions automaticky nasadí** s novou konfigurací

---

## ⚠️ Důležité poznámky

### 1. **Environment variables musí začínat `NEXT_PUBLIC_`**

Next.js zpřístupní pouze proměnné začínající `NEXT_PUBLIC_` v prohlížeči.

### 2. **Po změně `.env` je potřeba znovu buildu**

```bash
npm run build
```

### 3. **`.env.local` vs `.env.production`**

- **`.env.local`**: Pro lokální vývoj (ignoruje se v gitu)
- **`.env.production`**: Pro produkční build (commitněte do gitu)

### 4. **Pro lokální vývoj nechte prázdné**

Pokud chcete testovat lokálně s basePath, můžete použít:

```env
NEXT_PUBLIC_BASE_PATH=/retrokredenc
```

Ale pak musíte přistupovat na `http://localhost:3000/retrokredenc/`

---

## 🧪 Testování

### Lokálně (bez basePath):
```bash
npm run dev
# Otevřete: http://localhost:3000/
```

### Lokálně (s basePath):
```bash
# V .env.local: NEXT_PUBLIC_BASE_PATH=/retrokredenc
npm run dev
# Otevřete: http://localhost:3000/retrokredenc/
```

### Po buildu:
```bash
npm run build
# Otevřete složku out/ v prohlížeči nebo nasaďte na hosting
```

---

## 🆘 Řešení problémů

### Problém: Obrázky se stále nenačítají

**Řešení:**
1. Zkontrolujte, že `.env` soubor existuje a obsahuje správné hodnoty
2. Zkontrolujte, že hodnoty začínají `/` (např. `/retrokredenc`, ne `retrokredenc`)
3. Znovu buildujte: `npm run build`
4. Zkontrolujte v prohlížeči (F12 → Network), jaké URL se snaží načíst

### Problém: CSS/JS se nenačítají

**Řešení:**
- Stejné jako výše - zkontrolujte `assetPrefix` v `.env`

### Problém: Routing nefunguje

**Řešení:**
- Zkontrolujte, že `basePath` je správně nastavený
- Zkontrolujte, že `trailingSlash: true` je v `next.config.js` (už tam je)

---

## 📝 Shrnutí

1. ✅ **Lokálně:** Žádné environment variables
2. ✅ **NAS:** `.env.local` s `NEXT_PUBLIC_BASE_PATH=/retrokredenc`
3. ✅ **GitHub Pages:** `.env.production` s `NEXT_PUBLIC_BASE_PATH=/repo-name`
4. ✅ **Vercel:** Obvykle žádné (automaticky detekuje)

**Po změně `.env` vždy znovu buildujte!**

---

**Máte otázky?** Zkontrolujte sekci "Řešení problémů" výše.
