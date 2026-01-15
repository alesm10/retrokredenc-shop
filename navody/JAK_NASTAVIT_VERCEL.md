# 🚀 Jak nasadit web na Vercel (přes GitHub)

Tento návod vám ukáže, jak nasadit Retro Kredenc web na Vercel pomocí GitHub. Vercel je nejjednodušší způsob, jak nasadit Next.js aplikaci - automaticky vše nastaví a web bude dostupný během několika minut.

---

## ✅ Výhody Vercel

- ✅ **Automatické nasazení** - při každém push na GitHub se web automaticky aktualizuje
- ✅ **Rychlý a bezplatný** - pro osobní projekty zdarma
- ✅ **Automatická SSL** - HTTPS zdarma
- ✅ **Custom domain** - můžete připojit vlastní doménu (např. retrokredenc.cz)
- ✅ **Preview deployments** - každý pull request dostane vlastní URL pro testování
- ✅ **Bez konfigurace** - Vercel automaticky detekuje Next.js

---

## 📋 Předpoklady

1. ✅ **GitHub účet** - pokud ho nemáte, vytvořte na https://github.com
2. ✅ **Kód na GitHubu** - projekt musí být pushnutý na GitHub (viz `JAK_VYTVORIT_GITHUB_TOKEN.md`)
3. ✅ **Vercel účet** - vytvoříme v kroku 1

---

## 🎯 Krok 1: Vytvoření Vercel účtu

1. Otevřete: **https://vercel.com**
2. Klikněte na **"Sign Up"** (Registrace)
3. Vyberte **"Continue with GitHub"** (Pokračovat s GitHub)
4. Autorizujte Vercel přístup k vašemu GitHub účtu
5. Dokončete registraci

**Hotovo!** ✅ Máte Vercel účet propojený s GitHubem.

---

## 🎯 Krok 2: Připojení projektu

1. Po přihlášení do Vercel klikněte na **"Add New..."** → **"Project"**
2. V seznamu repozitářů najděte **"retrokredenc"** (nebo název vašeho repo)
3. Pokud repo nevidíte:
   - Klikněte na **"Adjust GitHub App Permissions"**
   - Vyberte **"Only select repositories"**
   - Vyberte **"retrokredenc"**
   - Klikněte **"Save"**
   - Obnovte stránku (F5)
4. Klikněte na **"Import"** vedle vašeho repo

---

## 🎯 Krok 3: Konfigurace projektu

Vercel automaticky detekuje Next.js, ale zkontrolujte nastavení:

### Framework Preset
- Mělo by být: **Next.js** (automaticky detekováno)

### Root Directory
- Pokud je projekt v root složce repo: **nechte prázdné**
- Pokud je projekt v podsložce: zadejte název složky (např. `retrokredenc`)

### Build Command
- Mělo by být: **`npm run build`** (automaticky)

### Output Directory
- Pro static export (`output: 'export'`): **`out`**
- Pro standardní Next.js: **`.next`** (automaticky)

### Install Command
- Mělo by být: **`npm install`** (automaticky)

---

## 🎯 Krok 4: Environment Variables (volitelné)

Pokud používáte environment variables (např. `NEXT_PUBLIC_BASE_PATH`):

1. V sekci **"Environment Variables"** klikněte na **"Add"**
2. Zadejte:
   - **Name:** `NEXT_PUBLIC_BASE_PATH`
   - **Value:** `/` (nebo prázdné pro root)
   - **Environment:** vyberte všechny (Production, Preview, Development)
3. Pokud máte další proměnné, přidejte je stejným způsobem

**Poznámka:** Pro Vercel obvykle **NEPOTŘEBUJETE** `basePath` nebo `assetPrefix`, protože Vercel nasadí web na root doménu.

---

## 🎯 Krok 5: Deploy!

1. Klikněte na velké modré tlačítko **"Deploy"**
2. Počkejte, až Vercel builduje projekt (obvykle 1-3 minuty)
3. Po dokončení uvidíte:
   - ✅ **"Congratulations!"**
   - 🌐 **URL vašeho webu** (např. `retrokredenc.vercel.app`)

---

## 🎉 Hotovo!

Váš web je nyní živý na Vercel! 🎊

**URL:** `https://retrokredenc.vercel.app` (nebo podobná)

---

## 🔗 Sdílení s kolegou

### Metoda 1: Poslat přímo URL

1. Zkopírujte URL z Vercel dashboardu
2. Pošlete kolegovi: `https://retrokredenc.vercel.app`
3. Kolega může web prohlížet a dávat feedback

### Metoda 2: Password Protection (volitelné)

Pokud chcete web chránit heslem:

1. V Vercel dashboardu → **Settings** → **Deployment Protection**
2. Zapněte **"Password Protection"**
3. Nastavte heslo
4. Kolega bude potřebovat heslo pro přístup

---

## 🔄 Automatické aktualizace

**Každý push na GitHub automaticky nasadí novou verzi!**

1. Udělejte změny v kódu
2. Commitněte a pushněte:
   ```bash
   git add .
   git commit -m "Oprava XYZ"
   git push
   ```
3. Vercel automaticky:
   - Detekuje push
   - Znovu builduje projekt
   - Nasadí novou verzi (obvykle za 1-2 minuty)

---

## 🌐 Připojení vlastní domény (volitelné)

Pokud chcete použít vlastní doménu (např. `retrokredenc.cz`):

### Krok 1: Přidání domény v Vercel

1. V Vercel dashboardu → **Settings** → **Domains**
2. Klikněte **"Add Domain"**
3. Zadejte doménu: `retrokredenc.cz`
4. Klikněte **"Add"**

### Krok 2: Konfigurace DNS

Vercel vám ukáže, jaké DNS záznamy přidat:

1. Přihlaste se do vašeho DNS poskytovatele (např. Wedos)
2. Přidejte DNS záznamy podle instrukcí Vercel:
   - **Type:** `A` nebo `CNAME`
   - **Name:** `@` nebo `www`
   - **Value:** IP adresa nebo CNAME z Vercel
3. Počkejte na propagaci DNS (obvykle 5-30 minut)

### Krok 3: SSL Certificate

Vercel automaticky vytvoří SSL certifikát (HTTPS) - není potřeba nic dělat!

---

## 🛠️ Úprava konfigurace pro Vercel

### Pokud chcete použít standardní Next.js (ne static export):

1. Upravte `next.config.js`:
   ```javascript
   const nextConfig = {
     // Odstraňte nebo zakomentujte:
     // output: 'export',
     images: {
       unoptimized: true,
     },
     trailingSlash: true,
     reactStrictMode: true,
   }
   ```

2. Commitněte a pushněte:
   ```bash
   git add next.config.js
   git commit -m "Uprava pro Vercel"
   git push
   ```

3. Vercel automaticky znovu nasadí

### Pokud chcete zůstat u static export:

- **Není potřeba nic měnit!** Vercel podporuje static export.

---

## 🆘 Řešení problémů

### Problém: Build selže

**Řešení:**
1. V Vercel dashboardu klikněte na failed deployment
2. Podívejte se na **"Build Logs"**
3. Najděte chybu (obvykle chybí dependency nebo syntax error)
4. Opravte v kódu a pushněte znovu

### Problém: Web se zobrazí, ale obrázky/JS nefungují

**Řešení:**
1. Zkontrolujte `next.config.js` - pokud máte `basePath` nebo `assetPrefix`, odstraňte je pro Vercel
2. Nebo nastavte environment variable `NEXT_PUBLIC_BASE_PATH` na prázdnou hodnotu v Vercel

### Problém: "Framework not detected"

**Řešení:**
1. V konfiguraci projektu vyberte **"Framework Preset"** → **"Next.js"**
2. Zkontrolujte, že máte `package.json` s Next.js dependency

### Problém: Kolega nemůže otevřít URL

**Řešení:**
- Zkontrolujte, že URL je správná (zkopírujte z Vercel dashboardu)
- Zkontrolujte, že deployment je úspěšný (zelená značka v dashboardu)
- Pokud je web chráněný heslem, pošlete kolegovi heslo

---

## 📊 Monitoring a Analytics

Vercel poskytuje základní analytics zdarma:

1. V dashboardu → **Analytics**
2. Uvidíte:
   - Počet návštěv
   - Top stránky
   - Performance metriky

---

## 💡 Tipy

- **Preview deployments:** Každý pull request dostane vlastní URL - perfektní pro testování!
- **Rollback:** Pokud se něco pokazí, můžete vrátit na předchozí verzi jedním kliknutím
- **Environment variables:** Citlivé údaje (API keys) ukládejte jako environment variables v Vercel, ne do kódu

---

## 📚 Užitečné odkazy

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Vercel Dokumentace:** https://vercel.com/docs
- **Next.js na Vercel:** https://vercel.com/docs/frameworks/nextjs

---

**Máte otázky?** Zkontrolujte sekci "Řešení problémů" výše nebo Vercel dokumentaci.
