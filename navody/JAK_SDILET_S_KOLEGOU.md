# 👥 Jak sdílet web s kolegou pro feedback a úpravy

Tento návod vám ukáže, jak neveřejně sdílet web s kolegou, aby mohl prohlédnout web, přidat poznámky a navrhnout úpravy.

---

## 🎯 Co potřebujete

- Web běžící lokálně na vašem počítači (viz `JAK_SPUSTIT.md`)
- Kolega s přístupem k internetu
- Jeden z následujících způsobů sdílení

---

## 🚀 Rychlé řešení: ngrok (5 minut) ⭐

**Nejrychlejší způsob** pro rychlé sdílení a feedback.

### Krok 1: Nainstalujte ngrok

```bash
brew install ngrok/ngrok/ngrok
```

### Krok 2: Zaregistrujte se a získejte token

1. Jděte na: https://ngrok.com/signup
2. Vytvořte účet (zdarma)
3. Zkopírujte **authtoken** z dashboardu

### Krok 3: Přihlaste se

```bash
ngrok config add-authtoken váš-token
```

### Krok 4: Spusťte web lokálně

V jednom terminálu:
```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
npm run dev
```

**Zapište si port** (obvykle 3000, 3001, nebo 3002) - uvidíte ho v terminálu.

### Krok 5: Spusťte ngrok

V **novém terminálu** (nechte první běžet):
```bash
ngrok http 3000
```
(Nahraďte `3000` portem, na kterém běží web)

### Krok 6: Zkopírujte URL a sdílejte

ngrok vytvoří URL jako: `https://xxxx-xx-xx-xx-xx.ngrok-free.app`

**Pošlete tuto URL kolegovi** (email, WhatsApp, SMS, atd.)

### Krok 7: Kolega otevře web

Kolega jednoduše otevře URL v prohlížeči a uvidí váš web!

**⚠️ Důležité:**
- URL platí, **dokud ngrok běží** (musíte nechat terminál otevřený)
- URL se mění při každém restartu (pro stálou URL potřebujete placený plán)
- Web je **neveřejný** - jen lidé s linkem mají přístup

---

## 🏠 Trvalé řešení: Synology NAS (Pokud máte NAS)

**📖 Pro podrobný návod od začátku v češtině viz:** `JAK_NASTAVIT_WEB_NA_NAS_OD_ZACATKU.md`

**Nejlepší pro dlouhodobé sdílení** - web běží na NAS a je dostupný přes QuickConnect.

### Možnost A: QuickConnect + Web Station

#### Krok 1: Nastavte QuickConnect na NAS

1. **Control Panel** → **QuickConnect**
2. Aktivujte QuickConnect
3. Zadejte QuickConnect ID (např. `vas-nas`)
4. Uložte

#### Krok 2: Nainstalujte Web Station

1. **Package Center** → Vyhledejte **Web Station**
2. Klikněte **Install**

#### Krok 3: Nahrajte web na NAS

1. **Build webu** na počítači (pokud jste ještě neudělali):
   ```bash
   cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
   npm run build
   ```
   
   Po buildu se vytvoří složka `out` s hotovým webem.

2. **Vytvořte složku na NAS přes File Station:**
   
   a) **Otevřete File Station** na NAS (v hlavním menu DSM)
   
   b) **Najděte nebo vytvořte složku `web`:**
      - Pokud už máte složku `web`, klikněte na ni
      - Pokud ne, vytvořte ji: klikněte **Create** → **Create Shared Folder**
        - Název: `web`
        - Popis: "Webové projekty"
        - Klikněte **OK**
   
   c) **Vytvořte složku `retrokredenc` ve složce `web`:**
      - Otevřete složku `web` v File Station
      - Klikněte **Create** → **Create Folder**
      - Název: `retrokredenc`
      - Klikněte **OK**

3. **Zkopírujte obsah složky `out` na NAS:**
   
   **Metoda A: Přes File Station (doporučeno):**
   
   a) **Na počítači:** Otevřete Finder (Mac) nebo Průzkumník (Windows)
   
   b) **Připojte se k NAS:**
      - V Finderu: Stiskněte `Cmd + K` a zadejte: `smb://[IP-ADRESA-NAS]`
        - Např: `smb://192.168.1.100`
      - V Průzkumníku: Zadejte do adresního řádku: `\\[IP-ADRESA-NAS]`
      - Přihlaste se pomocí vašich DSM přihlašovacích údajů
   
   c) **Otevřete složku:** `web` → `retrokredenc`
   
   d) **Zkopírujte všechny soubory:**
      - Na počítači otevřete složku `out` (v projektu retrokredenc)
        - Cesta: `/Volumes/Data/Cursor vibecoding/retrokredenc/out`
      - **Vyberte všechny soubory a složky UVNITŘ složky `out`** (Cmd+A nebo Ctrl+A)
        - ⚠️ **DŮLEŽITÉ:** Nevybírejte složku `out` samotnou, ale její OBSAH!
        - Měli byste vidět: `index.html`, `_next/`, `produkty/`, atd.
      - **Přetáhněte je** do složky `retrokredenc` na NAS
      - Nebo: Kopírovat (Cmd+C) → Vložit (Cmd+V) do složky na NAS
   
   **Metoda B: Přes File Station (webové rozhraní):**
   
   a) **Otevřete File Station** na NAS
   
   b) **Přejděte do složky:** `web` → `retrokredenc`
   
   c) **Klikněte Upload** (nahoru v menu)
   
   d) **Vyberte všechny soubory** ze složky `out` na počítači
   
   e) **Počkejte na dokončení nahrávání**

4. **Ověřte, že soubory jsou na NAS:**
   - V File Station otevřete `web/retrokredenc`
   - Měli byste vidět soubory přímo v této složce:
     - ✅ `index.html` (hlavní soubor)
     - ✅ `_next/` (složka s JavaScript soubory)
     - ✅ `produkty/` (složka se stránkami produktů)
     - ✅ `kontakt/`, `o-nas/` (další složky)
   - ⚠️ **Pokud vidíte složku `out` místo těchto souborů**, znamená to, že jste zkopírovali celou složku místo jejího obsahu. V tom případě:
     - Otevřete složku `out` na NAS
     - Zkopírujte všechny soubory z `out` do `retrokredenc`
     - Složku `out` na NAS můžete smazat

5. **Nastavte Virtual Host v Web Station:**
   
   a) **Otevřete Web Station** (v hlavním menu DSM)
   
   b) **V levém menu klikněte na "Webová služba"** (v anglické verzi je to "Virtual Host")
      - Pokud nevidíte "Webová služba", zkuste "Web Service" nebo hledejte ikonu s "www" nebo "server"
   
   c) **Klikněte Create** (nebo "Vytvořit") → **Create Virtual Host** (nebo "Vytvořit virtuální host")
   
   d) **Vyplňte údaje:**
      - **Description (Popis):** `Retro Kredenc`
      - **Port:** `80` (nebo `8080` pokud 80 je obsazený)
        - Pokud je port 80 obsazený, použijte `8080` nebo jiný volný port
      - **Document Root (Kořenový adresář dokumentů):** Vyberte `/web/retrokredenc`
        - Klikněte **Browse** (nebo "Procházet") a najděte složku `web/retrokredenc`
        - Nebo zadejte ručně: `/web/retrokredenc`
      - **HTTP Backend Server:** Vyberte `Nginx` (doporučeno) nebo `Apache` (podle toho, co máte nainstalované)
        - V přehledu vidíte, že máte Nginx nainstalovaný a běžící
      - **PHP:** Můžete ponechat výchozí nebo vybrat PHP 8.2 (které máte nainstalované)
   
   e) **Klikněte Create** (nebo "Vytvořit") a uložte

6. **Otestujte web:**
   - Otevřete prohlížeč
   - Jděte na: `http://[IP-NAS]/retrokredenc`
     - Např: `http://192.168.1.100/retrokredenc`
   - Měli byste vidět váš Retro Kredenc web!

7. **Kde najdete přesnou URL:**
   
   **V Web Station:**
   - Otevřete **Web Station** → **Webová služba**
   - V seznamu najdete vaši službu "retrokredenc"
   - Klikněte na ni a uvidíte detaily včetně URL
   
   **Lokální URL (v síti):**
   - Zjistěte IP adresu NAS: **Control Panel** → **Network** → **Network Interface**
   - URL bude: `http://[IP-NAS]/retrokredenc`
     - Např: `http://192.168.1.100/retrokredenc`
   
   **Přes QuickConnect (z internetu):**
   - Pokud máte QuickConnect nastavený (viz Krok 1)
   - URL bude: `http://[VAŠE-QUICKCONNECT-ID].quickconnect.to/retrokredenc`
     - Např: `http://vas-nas.quickconnect.to/retrokredenc`
   - Zjistíte QuickConnect ID: **Control Panel** → **QuickConnect**

#### Krok 4: Nastavte Reverse Proxy (DŮLEŽITÉ pro QuickConnect)

QuickConnect automaticky přesměrovává na port 5001 (DSM), ale Web Station běží na portu 80. Potřebujeme nastavit Reverse Proxy:

1. **Otevřete Control Panel** → **Login Portal** (Přihlašovací portál)
   
2. **Klikněte na záložku "Reverse Proxy"** (Reverzní proxy)
   
3. **Klikněte "Create"** (Vytvořit)
   
4. **Vyplňte nastavení:**
   
   **Záložka "Reverse Proxy":**
   - **Description:** `Retro Kredenc Web`
   - **Source Protocol:** `HTTPS` (nebo HTTP, pokud nemáte SSL)
   - **Hostname:** `alesDonin.quickconnect.to` (vaše QuickConnect ID)
   - **Port:** `5001` (port QuickConnect)
   - **Path:** `/retrokredenc`
   
   **Záložka "Destination":**
   - **Protocol:** `HTTP`
   - **Hostname:** `localhost` (nebo `127.0.0.1`)
   - **Port:** `80` (port Web Station)
   - **Path:** `/retrokredenc`
   
5. **Klikněte "Save"** (Uložit)

#### Krok 5: Sdílejte link

URL bude: `https://alesDonin.quickconnect.to:5001/retrokredenc`

**⚠️ DŮLEŽITÉ:** Použijte port 5001 v URL, protože QuickConnect automaticky přesměrovává na tento port.

**Pošlete tuto URL kolegovi.**

**Výhody:**
- ✅ Trvalé řešení (web běží na NAS)
- ✅ Zdarma (součást NAS)
- ✅ Bezpečné (QuickConnect šifrování)
- ✅ Kolega může přistupovat kdykoliv

### Možnost B: VPN přes NAS (Nejbezpečnější)

Pokud chcete ještě větší bezpečnost:

1. **Nastavte VPN Server** na NAS:
   - **Control Panel** → **VPN Server**
   - **OpenVPN** → **Enable OpenVPN server**
   - Vygenerujte konfigurační soubor (`.ovpn`)

2. **Pošlete `.ovpn` soubor kolegovi**

3. **Kolega se připojí k VPN** (potřebuje OpenVPN klienta)

4. **Kolega otevře web** na: `http://[IP-NAS]/retrokredenc`

**Výhody:**
- ✅ Nejbezpečnější (plně privátní)
- ✅ Plná kontrola přístupu

**Nevýhody:**
- ❌ Složitější nastavení
- ❌ Kolega musí mít VPN klienta

---

## 💻 Řešení přes GitHub

**Dobré pro verzování a automatické nasazení.**

### Možnost A: Privátní repository + GitHub Pages

#### Krok 1: Vytvořte privátní repository

1. GitHub → **New repository**
2. Název: `retrokredenc`
3. Zaškrtněte **Private**
4. Vytvořte repository

#### Krok 2: Přidejte kolegu jako collaboratora

1. Settings → **Collaborators** → **Add people**
2. Zadejte email kolegy
3. Kolega přijme pozvánku

#### Krok 3: Pushněte kód

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/VASE-UZIVATELSKE-JMENO/retrokredenc.git
git push -u origin main
```

#### Krok 4: Nastavte GitHub Pages

1. Settings → **Pages**
2. Source: **GitHub Actions**
3. Web bude na: `https://VASE-UZIVATELSKE-JMENO.github.io/retrokredenc/`

**⚠️ Poznámka:** GitHub Pages je veřejné (i s privátním repo), ale URL není snadno uhodnutelná.

**Výhody:**
- ✅ Trvalé řešení
- ✅ Automatický deployment při každém push
- ✅ Verzování změn
- ✅ Kolega může vidět historii změn

### Možnost B: Pouze privátní repository (bez Pages)

Kolega může:
- Prohlédnout kód na GitHubu
- Vytvořit Issues s feedbackem
- Navrhnout změny přes Pull Requests

**Výhody:**
- ✅ Plně privátní
- ✅ Strukturovaný feedback (Issues)
- ✅ Spolupráce na kódu

---

## 📝 Jak kolega může přidat feedback

### Metoda 1: Email nebo zpráva

Kolega vám pošle:
- Email s poznámkami
- WhatsApp/SMS zprávu
- Seznam úprav v dokumentu

### Metoda 2: GitHub Issues (Pokud používáte GitHub)

1. Kolega jde na repository
2. Klikne **Issues** → **New Issue**
3. Napíše feedback s:
   - Popisem problému/úpravy
   - Screenshoty (pokud má)
   - Návrhy řešení

### Metoda 3: Dokument s poznámkami

Vytvořte sdílený dokument (Google Docs, Notion, atd.) a kolega tam přidá poznámky.

---

## 🔒 Bezpečnost

### Pro rychlé sdílení (ngrok):
- ✅ URL je náhodně generovaná (neveřejná)
- ✅ Sdílejte URL pouze s kolegou
- ✅ Po ukončení ngrok URL přestane fungovat

### Pro trvalé sdílení (NAS/GitHub):
- ✅ Použijte silná hesla
- ✅ Omezte přístup jen na potřebné osoby
- ✅ Pravidelně kontrolujte přístupy

---

## 💡 Doporučení podle situace

### Rychlý feedback (1-2 dny):
→ **ngrok** - nejrychlejší, stačí 5 minut

### Pravidelné sdílení (týdny/měsíce):
→ **NAS QuickConnect** - trvalé, jednoduché

### Spolupráce na kódu:
→ **GitHub privátní repo** - verzování, Issues, Pull Requests

### Maximální bezpečnost:
→ **VPN přes NAS** - plně privátní přístup

---

## 🆘 Řešení problémů

### ngrok: "authentication failed"
- Zkontrolujte, že jste použili správný authtoken
- Zkuste znovu: `ngrok config add-authtoken váš-token`

### ngrok: "connection refused"
- Ujistěte se, že web běží (`npm run dev`)
- Zkontrolujte, že používáte správný port v ngrok

### NAS: Kolega se nemůže připojit
- Zkontrolujte, že QuickConnect je aktivní
- Ověřte, že Web Station běží
- Zkuste restartovat služby na NAS

### GitHub: Kolega nemá přístup
- Ověřte, že jste přidali kolegu jako collaboratora
- Kolega musí přijmout pozvánku v emailu

---

## ✅ Kontrolní seznam

Před sdílením zkontrolujte:
- [ ] Web běží lokálně bez chyb
- [ ] Všechny fotky produktů se zobrazují
- [ ] Všechny stránky fungují (domovská, produkty, kontakt, atd.)
- [ ] Zvolili jste způsob sdílení
- [ ] Máte připravenou URL nebo instrukce pro kolegu
- [ ] Kolega ví, jak přidat feedback

---

## 📚 Související návody

- `JAK_SPUSTIT.md` - Jak spustit web lokálně
- `JAK_AKTUALIZOVAT_WEB.md` - Jak aktualizovat web po úpravách
- `SPRAVA_PRODUKTU.md` - Jak přidat produkty
- `README.md` - Kompletní dokumentace

---

**Potřebujete pomoc?** Kontaktujte správce projektu.
