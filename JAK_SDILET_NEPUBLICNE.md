# 🔒 Jak sdílet web neveřejně s kolegou

## Možnost 1: Cloudflare Tunnel (Nejjednodušší a bezpečné) ⭐

### Co to je:
- **Zdarma** služba Cloudflare
- Vytvoří **bezpečný tunel** k vašemu webu
- **Neveřejné** - jen lidé s linkem mají přístup
- Funguje i přes CGNAT/firewall

### Jak na to:

1. **Vytvořte účet na Cloudflare:**
   - Jděte na: https://dash.cloudflare.com/sign-up
   - Zaregistrujte se (zdarma)

2. **Nainstalujte Cloudflared na NAS nebo počítač:**

   **Na Synology NAS:**
   - Otevřete **Container Manager**
   - Stáhněte image: `cloudflare/cloudflared:latest`
   - Vytvořte kontejner s:
     ```yaml
     command: tunnel run
     environment:
       TUNNEL_TOKEN: "váš-token-z-cloudflare"
     ```

   **Nebo na počítači, kde běží web:**
   ```bash
   brew install cloudflare/cloudflare/cloudflared
   ```

3. **Vytvořte tunnel na Cloudflare:**
   - V Cloudflare Dashboard → **Zero Trust** → **Networks** → **Tunnels**
   - Klikněte **Create a tunnel**
   - Zkopírujte **Tunnel Token**

4. **Nastavte tunnel:**
   ```bash
   cloudflared tunnel run --token váš-token
   ```

5. **Získejte veřejnou URL:**
   - Cloudflare vám dá URL jako: `https://retrokredenc-xxxxx.trycloudflare.com`
   - Tato URL je **pouze pro vás** (ne veřejná)
   - Sdílejte ji s kolegou

**Výhody:**
- ✅ Zdarma
- ✅ Bezpečné (HTTPS)
- ✅ Neveřejné (jen lidé s linkem)
- ✅ Funguje z jakékoliv sítě

---

## Možnost 2: ngrok (Rychlé řešení) 🚀

### Co to je:
- **Zdarma** tunelová služba
- Okamžité vytvoření tunelu
- **URL platí, dokud tunnel běží**

### Jak na to:

1. **Zaregistrujte se:**
   - Jděte na: https://ngrok.com/signup
   - Vytvořte účet (zdarma)

2. **Získejte authtoken:**
   - Po registraci dostanete authtoken
   - Zkopírujte si ho

3. **Nainstalujte ngrok:**
   ```bash
   brew install ngrok/ngrok/ngrok
   ```

4. **Přihlaste se:**
   ```bash
   ngrok config add-authtoken váš-token
   ```

5. **Spusťte tunnel k vašemu webu:**
   ```bash
   ngrok http 3000
   ```
   (Pokud web běží na portu 3000)

6. **Zkopírujte URL:**
   - ngrok vytvoří URL: `https://xxxx-xx-xx-xx-xx.ngrok-free.app`
   - Tuto URL pošlete kolegovi
   - **URL platí, dokud ngrok běží**

**Výhody:**
- ✅ Rychlé a jednoduché
- ✅ Zdarma
- ✅ Okamžitě funguje

**Nevýhody:**
- ❌ URL se mění při každém spuštění (pokud nemáte placenou verzi)
- ❌ Tunnel se musí udržovat spuštěný

---

## Možnost 3: Synology QuickConnect (Pokud máte NAS)

### Co to je:
- Funkce Synology NAS
- Bezpečný přístup k NAS z internetu
- Funguje i přes CGNAT

### Jak na to:

1. **Nastavte QuickConnect na NAS:**
   - **Control Panel** → **QuickConnect**
   - Aktivujte QuickConnect
   - Zadejte QuickConnect ID (např. `vas-nas`)

2. **Nastavte Web Station na NAS:**
   - Nainstalujte **Web Station** z Package Center
   - Vytvořte Virtual Host pro retrokredenc

3. **Nahrajte web na NAS:**
   - Zkopírujte složku `out` (po buildu) na NAS do `/web/retrokredenc/`

4. **Sdílejte link:**
   - URL bude: `http://vas-nas.quickconnect.to/retrokredenc`
   - Pošlete kolegovi

**Výhody:**
- ✅ Trvalé řešení
- ✅ Zdarma (součást NAS)
- ✅ Bezpečné

---

## Možnost 4: GitHub Pages s privátním repositářem

### Jak na to:

1. **Vytvořte privátní repository:**
   - GitHub → **New repository**
   - Zaškrtněte **Private**
   - Název: `retrokredenc` (nebo jiný)

2. **Přidejte kolegu jako collaboratora:**
   - Settings → **Collaborators** → **Add people**
   - Přidejte email kolegy

3. **Nastavte GitHub Pages:**
   - Settings → **Pages**
   - Source: **GitHub Actions**
   - Web bude na: `https://vas-username.github.io/retrokredenc/`

4. **Pushte kód:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/vas-username/retrokredenc.git
   git push -u origin main
   ```

**Výhody:**
- ✅ Trvalé řešení
- ✅ Automatický deployment
- ✅ Verzování

**Nevýhody:**
- ❌ GitHub Pages je **veřejné** (i s privátním repo)
- ❌ URL je viditelná všem (ale nemůžou editovat)

---

## Možnost 5: VPN přes NAS (Nejbezpečnější)

### Co to je:
- Vytvoříte VPN server na NAS
- Kolega se připojí k VPN
- Pak přistupuje k webu přes lokální IP

### Jak na to:

1. **Nastavte VPN Server na Synology NAS:**
   - **Control Panel** → **VPN Server**
   - **OpenVPN** → **Enable OpenVPN server**
   - Vygenerujte konfigurační soubor

2. **Sdílejte konfiguraci s kolegou:**
   - Pošlete mu `.ovpn` soubor
   - Nainstaluje OpenVPN klienta

3. **Kolega se připojí:**
   - Připojí se k VPN
   - Otevře web na: `http://[IP-NAS]/retrokredenc`

**Výhody:**
- ✅ Nejbezpečnější
- ✅ Plná kontrola přístupu

**Nevýhody:**
- ❌ Složitější nastavení
- ❌ Kolega musí mít VPN klienta

---

## Doporučení

**Pro rychlé sdílení s kolegou:**
→ Použijte **ngrok** (Možnost 2) - nejrychlejší

**Pro trvalé řešení:**
→ Použijte **Cloudflare Tunnel** (Možnost 1) - nejlepší poměr jednoduchost/bezpečnost

**Pokud máte NAS:**
→ Použijte **QuickConnect** (Možnost 3) - integrované řešení

---

## Rychlý návod - ngrok (5 minut)

```bash
# 1. Nainstalujte ngrok
brew install ngrok/ngrok/ngrok

# 2. Zaregistrujte se na ngrok.com a získejte token

# 3. Přihlaste se
ngrok config add-authtoken váš-token

# 4. Spusťte web lokálně
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
npm run dev

# 5. V novém terminálu spusťte ngrok
ngrok http 3000

# 6. Zkopírujte URL z ngrok (např. https://xxxx.ngrok-free.app)
# 7. Pošlete kolegovi
```

**Hotovo!** Kolega může otevřít web na dané URL. 🎉
