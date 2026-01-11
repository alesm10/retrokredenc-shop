# 🔧 Oprava chyb - Rychlý návod

## Problém 1: npm run dev nefunguje

**Chyba:** `Could not read package.json` - běžíte ve špatné složce!

**Řešení:**
```bash
# 1. Přejděte do správné složky projektu
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"

# 2. Ověřte, že jste ve správné složce
pwd
# Mělo by ukázat: /Volumes/Data/Cursor vibecoding/retrokredenc

# 3. Zkontrolujte, že package.json existuje
ls package.json

# 4. Teď spusťte server
npm run dev
```

---

## Problém 2: ngrok není přihlášený

**Chyba:** `authentication failed: Usage of ngrok requires a verified account and authtoken`

**Řešení:**

### Krok 1: Zaregistrujte se na ngrok
1. Jděte na: https://dashboard.ngrok.com/signup
2. Zaregistrujte se (zdarma)
3. Po registraci se přihlaste

### Krok 2: Získejte authtoken
1. Po přihlášení jděte na: https://dashboard.ngrok.com/get-started/your-authtoken
2. Zkopírujte váš **authtoken** (dlouhý řetězec)

### Krok 3: Nastavte authtoken v terminálu
```bash
ngrok config add-authtoken váš-authtoken-tady
```

**Příklad:**
```bash
ngrok config add-authtoken 2abc123XYZ456def789ghi012jkl345mno678pqr
```

### Krok 4: Ověřte, že funguje
```bash
ngrok version
# Mělo by ukázat verzi
```

---

## Kompletní postup pro sdílení webu s kolegou

```bash
# 1. Přejděte do projektu
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"

# 2. Spusťte web (v jednom terminálu)
npm run dev

# 3. Počkejte, až se web spustí (uvidíte: "Ready in Xms")
# 4. Zapište si port (obvykle 3000, 3001, nebo 3002)

# 5. Otevřete NOVÝ terminál (ne zavřete ten první!)
# 6. Přihlaste se do ngrok (pokud ještě nejste)
ngrok config add-authtoken váš-authtoken

# 7. Spusťte ngrok (nahraďte 3000 portem, který vidíte v prvním terminálu)
ngrok http 3000

# 8. Zkopírujte URL z ngrok (např. https://xxxx.ngrok-free.app)
# 9. Pošlete kolegovi tuto URL
```

---

## Alternativa: Bez ngrok (pokud chcete rychleji)

Pokud ngrok nechcete používat, můžete:

### Možnost A: Cloudflare Tunnel (bez registrace tokenu)
- Podobné jako ngrok, ale bez nutnosti tokenu pro základní použití

### Možnost B: Použít QuickConnect na NAS
- Pokud máte Synology NAS s QuickConnect
- Nastavte web na NAS a sdílejte QuickConnect URL

### Možnost C: Použít GitHub Pages s privátním repo
- Vytvořte privátní repository
- Přidejte kolegu jako collaboratora
- Web bude na GitHub Pages (ale URL je veřejná)

---

## Tipy

**Pokud zapomenete port:**
- Podívejte se do terminálu, kde běží `npm run dev`
- Tam uvidíte: `- Local: http://localhost:3000` (nebo jiný port)

**Pokud ngrok nefunguje:**
- Zkontrolujte, že máte internetové připojení
- Zkuste znovu: `ngrok config add-authtoken váš-token`
- Pokud problém přetrvává, použijte Cloudflare Tunnel

---

**Potřebujete pomoct s konkrétním krokem?** Napište, kde se zasekáváte!
