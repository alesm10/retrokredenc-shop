# 🔑 Jak vytvořit GitHub Personal Access Token

Tento návod vám krok za krokem ukáže, jak vytvořit Personal Access Token pro push na GitHub.

---

## 🎯 Krok 1: Přejděte na stránku s tokeny

### Metoda A: Přímý odkaz (nejrychlejší)

1. Otevřete tento odkaz v prohlížeči:
   **https://github.com/settings/tokens**

### Metoda B: Přes GitHub Settings

1. Otevřete GitHub: https://github.com
2. V pravém horním rohu klikněte na vaši **ikonu profilu** (avatar)
3. V dropdown menu klikněte na **Settings** (Nastavení)
4. V levém menu scrollujte dolů a najděte sekci **Developer settings** (Nastavení vývojáře)
5. Klikněte na **Developer settings**
6. V levém menu klikněte na **Personal access tokens** → **Tokens (classic)**

---

## 🔐 Krok 2: Vytvoření nového tokenu

1. Na stránce s tokeny klikněte na zelené tlačítko **"Generate new token"** (Vygenerovat nový token)
2. Vyberte **"Generate new token (classic)"** (Vygenerovat nový token (classic))

---

## ⚙️ Krok 3: Nastavení tokenu

Vyplňte formulář:

1. **Note** (Poznámka):
   - Zadejte popisný název, např.: `Retro Kredenc deployment`
   - Nebo: `Push kódu pro retrokredenc`

2. **Expiration** (Doba platnosti):
   - Vyberte podle potřeby:
     - `90 days` (90 dní)
     - `No expiration` (Bez expirace) - pokud chcete, aby token nikdy nevypršel
     - Nebo jinou dobu podle potřeby

3. **Select scopes** (Vyberte oprávnění):
   - **DŮLEŽITÉ:** Zaškrtněte `repo` (plná kontrola privátních repozitářů)
     - To automaticky zaškrtne: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
   - Pro GitHub Pages můžete také zaškrtnout `workflow` (pokud chcete spouštět GitHub Actions)

---

## ✅ Krok 4: Vygenerování tokenu

1. Scrollujte dolů na konec stránky
2. Klikněte na zelené tlačítko **"Generate token"** (Vygenerovat token)

---

## 📋 Krok 5: Zkopírování tokenu

**⚠️ DŮLEŽITÉ:** Token se zobrazí jen jednou! Zkopírujte ho hned!

1. Po kliknutí na "Generate token" uvidíte stránku s vaším tokenem
2. Token vypadá nějak takto: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
3. **Zkopírujte celý token** (můžete kliknout na ikonu kopírování vedle tokenu)
4. **Uložte ho někam bezpečně** (např. do poznámek, ale nezveřejňujte ho!)

---

## 🚀 Krok 6: Použití tokenu při push

1. Otevřete terminál
2. Přejděte do složky projektu:
   ```bash
   cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
   ```

3. Spusťte push:
   ```bash
   git push -u origin main
   ```

4. Git vás požádá o **Username**:
   - Zadejte: `alesm10`

5. Git vás požádá o **Password**:
   - **NEPOUŽÍVEJTE vaše běžné heslo!**
   - Vložte zkopírovaný **Personal Access Token** (token, který jste právě vytvořili)
   - Token začíná: `ghp_...`

6. Po úspěšném push uvidíte zprávu podobnou:
   ```
   Enumerating objects: 66, done.
   Counting objects: 100% (66/66), done.
   Writing objects: 100% (66/66), done.
   To https://github.com/alesm10/retrokredenc.git
    * [new branch]      main -> main
   ```

---

## 🎉 Hotovo!

Pokud push proběhl úspěšně:

1. ✅ Otevřete repository: https://github.com/alesm10/retrokredenc
2. ✅ Měli byste vidět všechny soubory
3. ✅ Pokračujte nastavením GitHub Pages (viz `NASTAVENI_HOSTINGU.md`)

---

## 🆘 Řešení problémů

### Problém: "Authentication failed" (Autentizace selhala)

**Řešení:**
- Ujistěte se, že používáte token (ne heslo)
- Zkontrolujte, že token začíná `ghp_`
- Zkontrolujte, že jste zkopírovali celý token
- Zkontrolujte, že token má oprávnění `repo`

### Problém: "Token expired" (Token vypršel)

**Řešení:**
- Vytvořte nový token (podle kroků výše)
- Nastavte delší dobu expirace nebo "No expiration"

### Problém: Nemůžu najít "Developer settings"

**Řešení:**
- Scrollujte dolů v levém menu Settings
- Nebo použijte přímý odkaz: https://github.com/settings/tokens
- Nebo vyhledejte v Settings: "Personal access tokens"

---

## 💡 Tipy

- **Bezpečnost:** Nikdy nezveřejňujte token! Pokud ho omylem zveřejníte, smažte ho a vytvořte nový.
- **Uložení tokenu:** Můžete ho uložit do poznámek, ale ujistěte se, že máte bezpečný přístup.
- **Použití tokenu:** Token použijte při každém push, pokud nepoužíváte SSH keys.

---

## 📚 Užitečné odkazy

- **GitHub Personal Access Tokens:** https://github.com/settings/tokens
- **GitHub dokumentace o tokenech:** https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
- **Přímý odkaz na vytvoření tokenu:** https://github.com/settings/tokens/new

---

**Máte otázky?** Zkontrolujte sekci "Řešení problémů" výše nebo GitHub dokumentaci.
