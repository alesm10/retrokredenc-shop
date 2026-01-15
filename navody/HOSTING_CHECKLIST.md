# ✅ Kontrolní seznam: Nastavení hostingu retrokredenc.cz

Tento checklist vám pomůže sledovat pokrok při nastavení hostingu. Postupujte podle podrobných návodů v `NASTAVENI_HOSTINGU.md`.

---

## 🌐 Fáze 1: DNS u Wedos

- [ ] Přihlášení do Wedos klient zóny (https://client.wedos.com/)
- [ ] Otevření DNS zóny pro doménu retrokredenc.cz
- [ ] Přidání 1. A záznamu: `@` → `185.199.108.153`
- [ ] Přidání 2. A záznamu: `@` → `185.199.109.153`
- [ ] Přidání 3. A záznamu: `@` → `185.199.110.153`
- [ ] Přidání 4. A záznamu: `@` → `185.199.111.153`
- [ ] (Volitelné) Přidání CNAME záznamu pro www: `www` → `vas-username.github.io`
- [ ] Uložení změn v DNS
- [ ] Ověření, že všechny 4 A záznamy jsou správně nastavené

**Podrobný návod:** Viz [DNS_WEDOS_NAVOD.md](DNS_WEDOS_NAVOD.md)

---

## 🚀 Fáze 2: GitHub Repository

- [ ] Přihlášení na GitHub (https://github.com/)
- [ ] Vytvoření nového repository (název: `retrokredenc`)
- [ ] Zkopírování URL repository
- [ ] Otevření terminálu
- [ ] Přejít do složky projektu: `cd "/Volumes/Data/Cursor vibecoding/retrokredenc"`
- [ ] Inicializace Git (pokud ještě není): `git init`
- [ ] Přidání souborů: `git add .`
- [ ] První commit: `git commit -m "Initial commit"`
- [ ] Přidání GitHub remote: `git remote add origin https://github.com/VASE-UZIVATELSKE-JMENO/retrokredenc.git`
- [ ] Nastavení main branch: `git branch -M main`
- [ ] (Pokud je potřeba) Vytvoření Personal Access Token na GitHub
- [ ] Push na GitHub: `git push -u origin main`
- [ ] Ověření, že kód je na GitHub (otevření repository v prohlížeči)

**Podrobný návod:** Viz [NASTAVENI_HOSTINGU.md](NASTAVENI_HOSTINGU.md) - Fáze 2 a 3

---

## ⚙️ Fáze 3: GitHub Pages

- [ ] Otevření Settings repository na GitHub
- [ ] Přejít na Pages (Settings → Pages)
- [ ] Nastavení Source: GitHub Actions
- [ ] Přidání Custom domain: `retrokredenc.cz`
- [ ] Zaškrtnutí "Enforce HTTPS"
- [ ] Uložení nastavení
- [ ] Otevření záložky Actions
- [ ] Ověření, že workflow "Deploy to GitHub Pages" běží
- [ ] Čekání na dokončení workflow (2-5 minut)
- [ ] Ověření, že workflow proběhl úspěšně (zelená fajfka ✅)

**Podrobný návod:** Viz [NASTAVENI_HOSTINGU.md](NASTAVENI_HOSTINGU.md) - Fáze 4

---

## 🔐 Fáze 4: Secrets (volitelné)

Pokud chcete použít kontaktní formulář nebo odkazy na sociální sítě:

- [ ] Otevření Settings → Secrets and variables → Actions
- [ ] (Pokud používáte Formspree) Přidání Secret: `NEXT_PUBLIC_FORMSPREE_ENDPOINT`
- [ ] (Pokud máte Facebook) Přidání Secret: `NEXT_PUBLIC_FACEBOOK_URL`
- [ ] (Pokud máte Instagram) Přidání Secret: `NEXT_PUBLIC_INSTAGRAM_URL`

**Podrobný návod:** Viz [NASTAVENI_HOSTINGU.md](NASTAVENI_HOSTINGU.md) - Fáze 6

---

## ✅ Fáze 5: Ověření

- [ ] Ověření GitHub Pages URL: `https://VASE-UZIVATELSKE-JMENO.github.io/retrokredenc/`
- [ ] Kontrola DNS propagace (https://www.whatsmydns.net/)
- [ ] Čekání na DNS propagaci (5-30 minut, max 24 hodin)
- [ ] Ověření custom domény v GitHub (Settings → Pages)
- [ ] Testování webu na vlastní doméně: `https://retrokredenc.cz`
- [ ] Ověření HTTPS (zelený zámek v prohlížeči)
- [ ] Ověření, že web se zobrazuje správně
- [ ] Test všech stránek (domovská, produkty, detail produktu, o nás, kontakt)

**Podrobný návod:** Viz [NASTAVENI_HOSTINGU.md](NASTAVENI_HOSTINGU.md) - Fáze 5

---

## 🎉 Hotovo!

Pokud jste prošli všemi kroky a web funguje na `https://retrokredenc.cz`, máte hotovo!

**Další kroky:**
- [ ] Přidat produkty (viz `SPRAVA_PRODUKTU.md`)
- [ ] Nastavit kontaktní formulář (Formspree)
- [ ] Přidat odkazy na sociální sítě
- [ ] Upravit texty a design podle potřeby

---

## 🆘 Potřebujete pomoc?

- **Kompletní návod:** [NASTAVENI_HOSTINGU.md](NASTAVENI_HOSTINGU.md)
- **DNS u Wedos:** [DNS_WEDOS_NAVOD.md](DNS_WEDOS_NAVOD.md)
- **Řešení problémů:** Viz sekce "Řešení problémů" v `NASTAVENI_HOSTINGU.md`

---

**Tip:** Tiskněte si tento checklist nebo si ho označujte v textovém editoru, abyste mohli sledovat svůj pokrok.
