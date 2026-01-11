# 📦 Instalace Node.js a npm na macOS

Node.js a npm jsou potřebné pro spuštění tohoto projektu. Zde jsou dva způsoby instalace:

## Metoda 1: Oficiální instalátor (Nejjednodušší) ⭐

1. **Stáhněte Node.js:**
   - Jděte na: https://nodejs.org/
   - Stáhněte **LTS verzi** (doporučeno)
   - Vyberte macOS instalátor (.pkg soubor)

2. **Nainstalujte:**
   - Otevřete stažený .pkg soubor
   - Postupujte podle instalačního průvodce
   - Klikněte na "Install" a zadejte heslo

3. **Ověřte instalaci:**
   - Otevřete nový terminál (důležité - musí být nový terminál!)
   - Zadejte:
   ```bash
   node --version
   npm --version
   ```
   - Měly by se zobrazit čísla verzí

## Metoda 2: Homebrew (Pokud máte Homebrew)

1. **Otevřete terminál**

2. **Nainstalujte Node.js:**
   ```bash
   brew install node
   ```

3. **Ověřte instalaci:**
   ```bash
   node --version
   npm --version
   ```

## Po instalaci

1. **Zavřete a znovu otevřete terminál** (důležité!)

2. **Přejděte do složky projektu:**
   ```bash
   cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
   ```

3. **Nainstalujte závislosti:**
   ```bash
   npm install
   ```

4. **Spusťte vývojový server:**
   ```bash
   npm run dev
   ```

5. **Otevřete prohlížeč:**
   - Jděte na: http://localhost:3000

## Řešení problémů

### "Command not found" i po instalaci
- Zavřete a znovu otevřete terminál
- Zkontrolujte, že jste v správné složce
- Zkuste: `which node` - měla by se zobrazit cesta

### Homebrew není nainstalovaný
- Instalujte Homebrew z: https://brew.sh/
- Nebo použijte Metodu 1 (oficiální instalátor)

### Potřebujete pomoct?
- Zkontrolujte, že máte správná oprávnění
- Zkuste restartovat počítač
- Kontaktujte správce projektu

---

**Doporučená verze:** Node.js 18.x nebo novější (LTS)
