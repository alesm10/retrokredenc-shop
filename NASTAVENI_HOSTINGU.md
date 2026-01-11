# 🌐 Nastavení hostingu pro retrokredenc.cz

Tento návod vás provede krok za krokem nastavením hostingu webu retrokredenc.cz na GitHub Pages s vlastní doménou z Wedos.

---

## 📋 Co budeme dělat

1. ✅ Nastavit DNS záznamy u Wedos
2. ✅ Vytvořit GitHub repository
3. ✅ Nahrat kód na GitHub
4. ✅ Nastavit GitHub Pages
5. ✅ Ověřit, že vše funguje

**Časová náročnost:** 30-60 minut (plus čekání na propagaci DNS)

---

## 🎯 Fáze 1: Nastavení DNS u Wedos

### Krok 1: Přihlášení do Wedos

1. Otevřete prohlížeč a jděte na: **https://client.wedos.com/**
2. Přihlaste se pomocí svých přihlašovacích údajů

### Krok 2: Otevření DNS zóny

1. V levém menu klikněte na **DNS zóny**
2. Najděte doménu **retrokredenc.cz** v seznamu
3. Klikněte na ni (nebo klikněte na ikonu tužky pro úpravu)

### Krok 3: Přidání A záznamů pro GitHub Pages

GitHub Pages potřebuje 4 A záznamy s těmito IP adresami:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**Postup:**

1. V sekci DNS záznamy klikněte na **Přidat záznam** (nebo podobné tlačítko)
2. Přidejte první A záznam:
   - **Název/Host:** `@` (nebo prázdné pole - pro root doménu)
   - **Typ:** `A`
   - **Hodnota/IP:** `185.199.108.153`
   - **TTL:** `3600` (nebo ponechte výchozí)
   - Klikněte **Uložit** nebo **Přidat**

3. **Opakujte pro další 3 IP adresy** (přidejte je stejným způsobem):
   - Druhý záznam: `@` → `A` → `185.199.109.153`
   - Třetí záznam: `@` → `A` → `185.199.110.153`
   - Čtvrtý záznam: `@` → `A` → `185.199.111.153`

### Krok 4: Přidání CNAME záznamu pro www (volitelné)

Pokud chcete, aby `www.retrokredenc.cz` také fungovala:

1. Klikněte **Přidat záznam**
2. Nastavte:
   - **Název/Host:** `www`
   - **Typ:** `CNAME`
   - **Hodnota:** `vas-username.github.io` (nahraďte `vas-username` vaším GitHub uživatelským jménem - zjistíte později, nebo můžete použít stejné A záznamy)
   - **TTL:** `3600`
   - Klikněte **Uložit**

**Alternativa pro www:** Můžete také přidat 4 A záznamy pro `www` se stejnými IP adresami (místo CNAME).

### Krok 5: Uložení změn

1. Zkontrolujte, že máte všechny 4 A záznamy pro `@`
2. Klikněte **Uložit změny** nebo **Aplikovat** (pokud je takové tlačítko)
3. Počkejte na potvrzení, že změny byly uloženy

### Krok 6: Kontrola DNS záznamů

1. Zkontrolujte, že všechny záznamy jsou správně nastavené
2. Měli byste vidět 4 A záznamy pro `@` s GitHub Pages IP adresami

**Tip:** DNS změny se obvykle propagují během 5-30 minut, ale může to trvat až 24 hodin.

---

## 🚀 Fáze 2: Vytvoření GitHub repository

### Krok 1: Přihlášení na GitHub

1. Otevřete prohlížeč a jděte na: **https://github.com/**
2. Přihlaste se (nebo si vytvořte účet, pokud ho nemáte)

### Krok 2: Vytvoření nového repository

1. V pravém horním rohu klikněte na **`+`** (plus)
2. Vyberte **New repository**

3. Vyplňte údaje:
   - **Repository name:** `retrokredenc` (nebo `retrokredenc-web`)
   - **Description:** `Retro Kredenc - e-shop s československým porcelánem z let 1950-1989`
   - **Visibility:** 
     - ⚪ **Public** - zdarma, kdokoliv může vidět kód (doporučeno pro GitHub Pages zdarma)
     - ⚪ **Private** - pouze vy můžete vidět kód (vyžaduje placený GitHub účet pro GitHub Pages)
   
   ⚠️ **DŮLEŽITÉ:** 
   - ❌ **NEZAŠKRTÁVEJTE** "Add a README file" (projekt už má README)
   - ❌ **NEZAŠKRTÁVEJTE** "Add .gitignore" (projekt už má .gitignore)
   - ❌ **NEZAŠKRTÁVEJTE** "Choose a license" (můžete přidat později)

4. Klikněte **Create repository** (zelené tlačítko)

### Krok 3: Zkopírování URL repository

Po vytvoření repository uvidíte stránku s instrukcemi. **Zkopírujte si URL repository** (vypadá jako: `https://github.com/VASE-UZIVATELSKE-JMENO/retrokredenc.git`).

Budete to potřebovat pro další kroky.

---

## 💻 Fáze 3: Nahrání kódu na GitHub

### Krok 1: Otevření terminálu

- **Mac:** Otevřete Terminal (Aplikace → Utility → Terminal)
- Nebo použijte terminál, který už máte otevřený

### Krok 2: Přejít do složky projektu

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
```

### Krok 3: Kontrola, zda už existuje Git repository

```bash
ls -la
```

Pokud vidíte složku `.git`, Git už je inicializovaný. Pokud ne, pokračujte Krokem 4.

### Krok 4: Inicializace Git (pokud ještě není)

```bash
git init
```

### Krok 5: Přidání všech souborů

```bash
git add .
```

### Krok 6: Vytvoření prvního commitu

```bash
git commit -m "Initial commit - Retro Kredenc e-shop"
```

### Krok 7: Přidání GitHub remote

**Nahraďte `VASE-UZIVATELSKE-JMENO` vaším skutečným GitHub uživatelským jménem:**

```bash
git remote add origin https://github.com/VASE-UZIVATELSKE-JMENO/retrokredenc.git
```

**Příklad:** Pokud je vaše GitHub jméno `alesmiclik`, příkaz bude:
```bash
git remote add origin https://github.com/alesmiclik/retrokredenc.git
```

### Krok 8: Nastavení main branch

```bash
git branch -M main
```

### Krok 9: Push na GitHub

```bash
git push -u origin main
```

**Co se stane:**
- Git vás požádá o uživatelské jméno a heslo
- **Uživatelské jméno:** Vaše GitHub uživatelské jméno
- **Heslo:** Budete potřebovat **Personal Access Token** (ne vaše běžné heslo)

### Krok 10: Vytvoření Personal Access Token (pokud je potřeba)

Pokud vás Git požádá o heslo, musíte vytvořit Personal Access Token:

1. Jděte na GitHub: **https://github.com/settings/tokens**
2. Klikněte **Generate new token** → **Generate new token (classic)**
3. Vyplňte:
   - **Note:** `Retro Kredenc deployment` (libovolný popis)
   - **Expiration:** Vyberte dobu platnosti (např. 90 dní, 1 rok, nebo "No expiration")
   - **Scopes:** Zaškrtněte `repo` (plná kontrola privátních repozitářů)
4. Klikněte **Generate token** (dole na stránce)
5. **⚠️ DŮLEŽITÉ:** Zkopírujte token hned (zobrazí se jen jednou, vypadá jako: `ghp_xxxxxxxxxxxxxxxxxxxx`)
6. Vraťte se do terminálu a použijte:
   - **Username:** vaše GitHub uživatelské jméno
   - **Password:** vložte zkopírovaný token (ne heslo!)

### Krok 11: Ověření push

Po úspěšném push uvidíte zprávu podobnou:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Writing objects: 100% (X/X), done.
To https://github.com/VASE-UZIVATELSKE-JMENO/retrokredenc.git
 * [new branch]      main -> main
```

**Skvělé! Kód je nahrán na GitHub!**

Otevřete repository na GitHub a měli byste vidět všechny soubory.

---

## ⚙️ Fáze 4: Nastavení GitHub Pages

### Krok 1: Otevření Settings repository

1. V GitHub repository klikněte na záložku **Settings** (v horním menu)
2. V levém menu klikněte na **Pages**

### Krok 2: Nastavení GitHub Pages

1. V sekci **Source:**
   - Vyberte **GitHub Actions** (ne "Deploy from a branch")
   
2. V sekci **Custom domain:**
   - Zadejte: `retrokredenc.cz`
   - ✅ Zaškrtněte **Enforce HTTPS** (bude dostupné po nastavení DNS)

3. Klikněte **Save**

### Krok 3: První spuštění deployment

1. Po uložení se automaticky spustí GitHub Actions workflow
2. Klikněte na záložku **Actions** (v horním menu repository)
3. Měli byste vidět běžící workflow "Deploy to GitHub Pages"
4. Počkejte, až dokončí (obvykle 2-5 minut)

**Jak poznáte, že je hotovo:**
- V **Actions** tab uvidíte zelenou fajfku ✅
- V **Settings → Pages** uvidíte URL: `https://VASE-UZIVATELSKE-JMENO.github.io/retrokredenc/`

### Krok 4: Testování GitHub Pages URL

1. Otevřete v prohlížeči URL: `https://VASE-UZIVATELSKE-JMENO.github.io/retrokredenc/`
2. Měli byste vidět svůj web Retro Kredenc

**Pokud nefunguje:**
- Počkejte ještě chvíli (build může trvat déle)
- Zkontrolujte **Actions** tab, jestli není chyba
- Zkontrolujte, že workflow proběhl úspěšně

---

## 🌍 Fáze 5: Ověření custom domény (retrokredenc.cz)

### Krok 1: Kontrola DNS propagace

DNS změny se obvykle propagují během 5-30 minut, ale může to trvat až 24 hodin.

**Jak zkontrolovat:**
1. Jděte na: **https://www.whatsmydns.net/**
2. Zadejte doménu: `retrokredenc.cz`
3. Vyberte typ: `A`
4. Zkontrolujte, že vidíte GitHub Pages IP adresy (`185.199.108.153`, atd.)

**Nebo v terminálu (Mac):**
```bash
dig retrokredenc.cz
```

Měli byste vidět A záznamy s GitHub Pages IP adresami.

### Krok 2: Ověření v GitHub

1. V GitHub repository: **Settings → Pages**
2. Zkontrolujte sekci **Custom domain**
3. Měli byste vidět: `retrokredenc.cz`
4. Pokud vidíte zprávu o ověření DNS, počkejte - GitHub to ověří automaticky

### Krok 3: Testování webu na vlastní doméně

1. Otevřete prohlížeč
2. Jděte na: **https://retrokredenc.cz**
3. Měli byste vidět svůj web!

**Pokud nefunguje:**
- Počkejte na propagaci DNS (až 24 hodin)
- Zkontrolujte DNS záznamy u Wedos
- Zkontrolujte, že GitHub Actions workflow proběhl úspěšně
- Zkuste vymazat cache prohlížeče

---

## 🔐 Fáze 6: Přidání Secrets (volitelné)

Pokud chcete použít kontaktní formulář (Formspree) nebo odkazy na sociální sítě:

### Krok 1: Otevření Secrets

1. V GitHub repository: **Settings → Secrets and variables → Actions**
2. Klikněte **New repository secret**

### Krok 2: Přidání Formspree endpoint (pokud používáte Formspree)

1. **Name:** `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
2. **Secret:** vložte URL vašeho Formspree formuláře (např. `https://formspree.io/f/your-form-id`)
3. Klikněte **Add secret**

### Krok 3: Přidání sociálních sítí (pokud máte)

1. **Facebook URL:**
   - **Name:** `NEXT_PUBLIC_FACEBOOK_URL`
   - **Secret:** `https://www.facebook.com/your-page`
   - Klikněte **Add secret**

2. **Instagram URL:**
   - **Name:** `NEXT_PUBLIC_INSTAGRAM_URL`
   - **Secret:** `https://www.instagram.com/your-profile`
   - Klikněte **Add secret**

### Krok 4: Znovu deployment

Po přidání Secrets:
1. Pushněte změny na GitHub (pokud jste změnili něco v kódu)
2. Nebo manuálně spusťte workflow: **Actions → Deploy to GitHub Pages → Run workflow**

---

## ✅ Kontrolní seznam

Projděte si tento seznam a zaškrtněte, co máte hotovo:

- [ ] DNS záznamy nastaveny u Wedos (4 A záznamy pro `@`)
- [ ] GitHub repository vytvořen
- [ ] Kód pushnut na GitHub
- [ ] GitHub Pages povoleno (Settings → Pages → GitHub Actions)
- [ ] Custom domain nastaveno (`retrokredenc.cz`)
- [ ] GitHub Actions workflow proběhl úspěšně
- [ ] Web funguje na GitHub Pages URL (`https://VASE-UZIVATELSKE-JMENO.github.io/retrokredenc/`)
- [ ] Web funguje na vlastní doméně (`https://retrokredenc.cz`)
- [ ] HTTPS funguje (zelený zámek v prohlížeči)
- [ ] Secrets přidány (pokud potřebujete)

---

## 🔄 Automatické aktualizace

**Dobrá zpráva:** Od teď se web automaticky aktualizuje při každém push na GitHub!

**Jak to funguje:**
1. Upravíte soubory lokálně
2. Commitujete změny: `git add .` → `git commit -m "Popis změn"`
3. Pushnete na GitHub: `git push`
4. GitHub Actions automaticky spustí build a deployment
5. Během 2-5 minut jsou změny vidět na webu!

---

## 🐛 Řešení problémů

### Problém: DNS se nepropaguje

**Řešení:**
- Počkejte 24-48 hodin (obvykle 5-30 minut stačí)
- Zkontrolujte pomocí [whatsmydns.net](https://www.whatsmydns.net/)
- Ověřte, že záznamy jsou správně nastavené u Wedos

### Problém: GitHub Actions selhává

**Řešení:**
- Zkontrolujte logy v **Actions** tab
- Ověřte, že všechny Secrets jsou nastavené (pokud jsou potřeba)
- Zkontrolujte, že `next.config.js` má `output: 'export'`

### Problém: Custom domain se neověří

**Řešení:**
- Ověřte DNS záznamy (měly by ukazovat na GitHub IP adresy)
- Počkejte na propagaci DNS (až 24 hodin)
- Zkuste znovu uložit custom domain v GitHub Settings → Pages

### Problém: Web se nezobrazuje

**Řešení:**
- Zkontrolujte, že GitHub Actions workflow proběhl úspěšně
- Ověřte URL (zkuste GitHub Pages URL: `https://VASE-UZIVATELSKE-JMENO.github.io/retrokredenc/`)
- Zkontrolujte DNS záznamy pro custom domain
- Zkuste vymazat cache prohlížeče (Cmd+Shift+R na Macu)

### Problém: Git push nefunguje

**Řešení:**
- Ověřte, že máte správný Personal Access Token
- Zkontrolujte, že URL remote je správná: `git remote -v`
- Pokud je problém s autentizací, zkuste znovu vytvořit Personal Access Token

---

## 📚 Užitečné odkazy

- **GitHub Pages dokumentace:** https://docs.github.com/en/pages
- **Wedos DNS záznamy:** https://kb.wedos.com/cs/dns/
- **GitHub Personal Access Tokens:** https://github.com/settings/tokens
- **GitHub Actions:** https://docs.github.com/en/actions
- **Kontrola DNS propagace:** https://www.whatsmydns.net/

---

## 🎉 Hotovo!

Pokud jste prošli všemi kroky a web funguje na `https://retrokredenc.cz`, máte hotovo!

**Gratulujeme! 🎊**

Váš web je nyní:
- ✅ Veřejně dostupný na vlastní doméně
- ✅ Bezpečný (HTTPS)
- ✅ Automaticky se aktualizuje při každém push na GitHub
- ✅ Rychlý (díky GitHub Pages CDN)

**Další kroky:**
- Přidejte produkty (viz `SPRAVA_PRODUKTU.md`)
- Nastavte kontaktní formulář (Formspree)
- Přidejte odkazy na sociální sítě
- Upravte texty a design podle potřeby

---

**Máte otázky nebo problémy?** Zkontrolujte sekci "Řešení problémů" nebo kontaktujte podporu.
