# 🔄 Jak aktualizovat web na GitHub Pages

Tento návod vám ukáže, jak funguje aktualizace webu a jak nahrát změny na GitHub.

---

## 📋 Jak to funguje

### ❌ Co se NEděje automaticky:

- **Lokální změny se NEZOBRAZÍ automaticky na GitHub**
- Musíte vždy změny "pushnout" na GitHub
- Změny v souborech na vašem počítači zůstávají pouze lokálně

### ✅ Co se DĚJE automaticky:

- **Po push na GitHub se automaticky spustí GitHub Actions**
- GitHub Actions automaticky nasadí změny na web (GitHub Pages)
- Během 2-5 minut jsou změny vidět na https://retrokredenc.cz

---

## 🔄 Workflow (Jak to funguje)

```
1. Upravíte soubory na počítači
   ↓
2. Commitnete změny (git add → git commit)
   ↓
3. Pushnete na GitHub (git push)
   ↓
4. GitHub Actions automaticky nasadí na web (2-5 minut)
   ↓
5. Změny jsou vidět na https://retrokredenc.cz
```

---

## 🚀 Postup pro aktualizaci webu

### Krok 1: Upravte soubory

Upravte soubory v projektu jak potřebujete (např. přidání produktu, změna textu, atd.)

### Krok 2: Otevřete terminál

Otevřete Terminal a přejděte do složky projektu:

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
```

### Krok 3: Přidejte změny

```bash
git add .
```

*(Toto přidá všechny změněné soubory)*

### Krok 4: Vytvořte commit

```bash
git commit -m "Popis změn"
```

**Příklady popisů:**
- `"Přidán nový produkt - hrnek s květinami"`
- `"Změněn text na domovské stránce"`
- `"Aktualizována cena produktu"`
- `"Přidány nové fotky produktů"`

### Krok 5: Push na GitHub

```bash
git push
```

*(Použijete token při prvním push, pak můžete použít SSH nebo token bude uložen)*

### Krok 6: Počkejte na deployment

1. Otevřete repository na GitHub: https://github.com/alesm10/retrokredenc
2. Klikněte na záložku **Actions**
3. Uvidíte běžící workflow "Deploy to GitHub Pages"
4. Počkejte 2-5 minut na dokončení
5. Změny budou vidět na https://retrokredenc.cz

---

## ⚡ Rychlý postup (3 příkazy)

Pokud chcete rychle nahrát změny:

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
git add .
git commit -m "Aktualizace webu"
git push
```

**A pak počkejte 2-5 minut na GitHub Actions.**

---

## 📝 Příklady použití

### Příklad 1: Přidání nového produktu

1. Přidáte fotku do `public/products/`
2. Upravíte `src/data/products.json`
3. V terminálu:
   ```bash
   git add .
   git commit -m "Přidán nový produkt - hrnek s růžemi"
   git push
   ```
4. Počkejte 2-5 minut
5. Nový produkt je na webu!

### Příklad 2: Změna textu

1. Upravíte text v `src/app/page.tsx`
2. V terminálu:
   ```bash
   git add .
   git commit -m "Změněn text hero sekce"
   git push
   ```
3. Počkejte 2-5 minut
4. Změněný text je na webu!

### Příklad 3: Změna ceny produktu

1. Upravíte cenu v `src/data/products.json`
2. V terminálu:
   ```bash
   git add .
   git commit -m "Aktualizována cena produktu hrnek-001"
   git push
   ```
3. Počkejte 2-5 minut
4. Nová cena je na webu!

---

## ⏱️ Časový průběh

- **Commit a push:** ~10-30 sekund
- **GitHub Actions build:** 2-5 minut
- **DNS propagace:** již hotová (pouze při prvním nastavení)
- **Celkem:** ~3-6 minut od push po viditelné změny na webu

---

## 💡 Tipy

### Tip 1: Kontrola stavu před push

Před push můžete zkontrolovat, co se změní:

```bash
git status
```

Uvidíte seznam změněných souborů.

### Tip 2: Zobrazení změn

Chcete vidět, co se změnilo?

```bash
git diff
```

Zobrazí změny v souborech.

### Tip 3: Kontrola deployment

Vždy můžete zkontrolovat, jestli deployment proběhl úspěšně:

1. Otevřete: https://github.com/alesm10/retrokredenc
2. Klikněte na záložku **Actions**
3. Uvidíte historii všech deploymentů
4. Zelená fajfka ✅ = úspěšné
5. Červený křížek ❌ = selhalo (podívejte se do logů)

---

## 🆘 Řešení problémů

### Problém: "nothing to commit, working tree clean"

**Co to znamená:**
- Žádné změny k commitnutí
- Možná jste změny neuložili (Cmd+S v editoru)

**Řešení:**
- Uložte soubory v editoru
- Zkontrolujte `git status`

### Problém: "authentication failed" při push

**Řešení:**
- Použijte Personal Access Token (ne heslo)
- Viz návod: `JAK_VYTVORIT_GITHUB_TOKEN.md`

### Problém: Deployment selhal

**Řešení:**
1. Otevřete **Actions** tab na GitHub
2. Klikněte na selhaný workflow
3. Zkontrolujte logy (kde je chyba)
4. Obvykle je to problém v kódu (syntax error, atd.)
5. Opravte chybu a pushněte znovu

---

## 📚 Užitečné odkazy

- **GitHub repository:** https://github.com/alesm10/retrokredenc
- **GitHub Actions:** https://github.com/alesm10/retrokredenc/actions
- **Web:** https://retrokredenc.cz
- **Git dokumentace:** https://git-scm.com/doc

---

## ✅ Shrnutí

1. ❌ **Není automatická synchronizace** - musíte vždy pushnout
2. ✅ **Po push se automaticky nasadí na web** (GitHub Actions)
3. ⏱️ **Trvá to 2-5 minut** od push po viditelné změny
4. 🔄 **Workflow:** Upravit → Commit → Push → Čekat → Hotovo!

---

**Máte otázky?** Zkontrolujte sekci "Řešení problémů" výše nebo GitHub dokumentaci.
