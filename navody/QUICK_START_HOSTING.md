# 🚀 Rychlý start: Nastavení hostingu retrokredenc.cz

Tento rychlý průvodce vás provede nejdůležitějšími kroky. Pro podrobnosti viz `NASTAVENI_HOSTINGU.md`.

---

## 📋 Co budete potřebovat

- ✅ Doména `retrokredenc.cz` registrovaná u Wedos
- ✅ GitHub účet (zdarma na https://github.com)
- ✅ 30-60 minut času

---

## ⚡ Rychlý postup (5 kroků)

### 1️⃣ Nastavte DNS u Wedos

1. Přihlaste se na https://client.wedos.com/
2. DNS zóny → retrokredenc.cz
3. Přidejte 4 A záznamy pro `@`:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

**📖 Podrobný návod:** `DNS_WEDOS_NAVOD.md`

---

### 2️⃣ Vytvořte GitHub repository

1. Jděte na https://github.com
2. New repository → název: `retrokredenc`
3. **NEZAŠKRTÁVEJTE** "Add README"
4. Create repository

---

### 3️⃣ Pushněte kód na GitHub

V terminálu:

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"

# Použijte pomocný skript (nebo postupujte manuálně)
./PUSH_NA_GITHUB.sh VASE-UZIVATELSKE-JMENO
```

**Nebo manuálně:**
```bash
git init
git add .
git commit -m "Initial commit - Retro Kredenc e-shop"
git remote add origin https://github.com/VASE-UZIVATELSKE-JMENO/retrokredenc.git
git branch -M main
git push -u origin main
```

---

### 4️⃣ Nastavte GitHub Pages

1. V GitHub repository: **Settings → Pages**
2. Source: **GitHub Actions**
3. Custom domain: `retrokredenc.cz`
4. ✅ Enforce HTTPS
5. Save

---

### 5️⃣ Počkejte na deployment

1. Otevřete **Actions** tab
2. Počkejte 2-5 minut na dokončení
3. Otevřete `https://retrokredenc.cz` (po DNS propagaci, 5-30 min)

---

## ✅ Kontrolní seznam

- [ ] DNS záznamy nastaveny u Wedos (4 A záznamy)
- [ ] GitHub repository vytvořen
- [ ] Kód pushnut na GitHub
- [ ] GitHub Pages nastaveno (Settings → Pages)
- [ ] Custom domain přidán (`retrokredenc.cz`)
- [ ] GitHub Actions workflow proběhl úspěšně
- [ ] Web funguje na `https://retrokredenc.cz`

**📋 Podrobný checklist:** `HOSTING_CHECKLIST.md`

---

## 🆘 Potřebujete pomoc?

- **Kompletní návod:** `NASTAVENI_HOSTINGU.md`
- **DNS u Wedos:** `DNS_WEDOS_NAVOD.md`
- **Checklist:** `HOSTING_CHECKLIST.md`
- **Řešení problémů:** Viz sekce "Řešení problémů" v `NASTAVENI_HOSTINGU.md`

---

## ⏱️ Časový odhad

- DNS nastavení: 5-10 minut
- GitHub repository: 2-3 minuty
- Push kódu: 2-5 minut
- GitHub Pages: 1-2 minuty
- DNS propagace: 5-30 minut (max 24 hodin)
- **Celkem: ~30-60 minut** (plus DNS propagace)

---

**💡 Tip:** Vytiskněte si `HOSTING_CHECKLIST.md` pro sledování pokroku!
