# 🤖 Automatické přidávání fotek do složky

Návod na nastavení automatického workflow, které přidá fotky z telefonu přímo do složky `public/products/` bez manuálního zasahování.

---

## 🎯 Jak to funguje

1. **Žena vyfotí hrnek** na telefonu
2. **Pošle fotku** emailem / WhatsApp / Google Drive
3. **Automaticky se stáhne** a zkopíruje do `public/products/`
4. **Hotovo!** ✅ (Vy jen upravíte `products.json` a pushnete)

---

## 📋 Možnosti automatizace

### Možnost 1: Google Drive + Automatická synchronizace (Nejjednodušší) ⭐

**Jak to funguje:**
- Vytvoříte složku na Google Drive
- Google Drive se automaticky synchronizuje s počítačem
- Žena nahraje fotku do složky → automaticky se objeví na počítači

**Výhody:**
- ✅ Velmi jednoduché nastavení
- ✅ Funguje okamžitě
- ✅ Bez dalších nástrojů
- ✅ Žena jen nahraje fotku do složky

**Nevýhody:**
- ⚠️ Potřebujete Google účet
- ⚠️ Potřebujete Google Drive desktop aplikaci

---

### Možnost 2: Email + n8n Automation (Pokročilé)

**Jak to funguje:**
- n8n sleduje email schránku
- Když přijde email s fotkou, automaticky stáhne přílohu
- Zkopíruje fotku do `public/products/`

**Výhody:**
- ✅ Plně automatické
- ✅ Můžete přidat další logiku (přejmenování, validace)

**Nevýhody:**
- ⚠️ Potřebujete n8n (na NAS nebo cloud)
- ⚠️ Složitější nastavení

---

### Možnost 3: WhatsApp + Automatizace (Pokročilé)

**Jak to funguje:**
- WhatsApp Web API nebo bot
- Automaticky stahuje fotky z WhatsApp
- Kopíruje do složky

**Výhody:**
- ✅ Žena používá WhatsApp (známé prostředí)

**Nevýhody:**
- ⚠️ Nejsložitější nastavení
- ⚠️ WhatsApp API je omezené

---

## 🚀 Možnost 1: Google Drive + Automatická synchronizace (Doporučeno)

### Krok 1: Vytvoření složky na Google Drive

1. **Otevřete Google Drive** v prohlížeči: https://drive.google.com
2. **Vytvořte novou složku:**
   - Klikněte na **"Nový"** → **"Složka"**
   - Název: `Retro Kredenc - Fotky produktů`
   - Vytvořte složku

3. **Sdílejte složku s ženou:**
   - Pravé tlačítko na složku → **"Sdílet"**
   - Zadejte email vaší ženy
   - Nastavte oprávnění: **"Editor"** (může přidávat soubory)
   - Klikněte **"Odeslat"**

---

### Krok 2: Instalace Google Drive Desktop

1. **Stáhněte Google Drive Desktop:**
   - Jděte na: https://www.google.com/drive/download/
   - Klikněte **"Stáhnout Drive pro počítač"**
   - Nainstalujte aplikaci

2. **Přihlaste se:**
   - Otevřete Google Drive Desktop
   - Přihlaste se svým Google účtem
   - Vyberte složky, které chcete synchronizovat

3. **Nastavte synchronizaci:**
   - Najděte složku **"Retro Kredenc - Fotky produktů"**
   - Zaškrtněte ji pro synchronizaci
   - Složka se zobrazí na vašem počítači

---

### Krok 3: Propojení s projektem

1. **Najděte synchronizovanou složku:**
   - Obvykle: `~/Google Drive/Retro Kredenc - Fotky produktů/`
   - Nebo: `C:\Users\VaseJmeno\Google Drive\Retro Kredenc - Fotky produktů\`

2. **Vytvořte symbolický odkaz** (nebo použijte skript):

**Na Mac:**
```bash
ln -s ~/Google\ Drive/Retro\ Kredenc\ -\ Fotky\ produktů "/Volumes/Data/Cursor vibecoding/retrokredenc/public/products-incoming"
```

**Na Windows (PowerShell jako správce):**
```powershell
New-Item -ItemType SymbolicLink -Path "C:\cesta\k\projektu\retrokredenc\public\products-incoming" -Target "C:\Users\VaseJmeno\Google Drive\Retro Kredenc - Fotky produktů"
```

**Nebo jednoduše:**
- Použijte skript, který automaticky kopíruje fotky (viz Krok 4)

---

### Krok 4: Automatické kopírování fotek (Skript)

Vytvořte skript, který automaticky zkopíruje fotky z Google Drive do `public/products/`:

**Mac/Linux skript:** `scripts/copy-photos-from-drive.sh`

```bash
#!/bin/bash

# Cesta k Google Drive složce
DRIVE_FOLDER="$HOME/Google Drive/Retro Kredenc - Fotky produktů"
# Cesta k projektu
PROJECT_FOLDER="/Volumes/Data/Cursor vibecoding/retrokredenc/public/products"

# Zkontrolujte, zda složka existuje
if [ ! -d "$DRIVE_FOLDER" ]; then
    echo "Chyba: Google Drive složka neexistuje: $DRIVE_FOLDER"
    exit 1
fi

# Zkopírujte všechny nové fotky
find "$DRIVE_FOLDER" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -newer "$PROJECT_FOLDER/.last-sync" -exec cp {} "$PROJECT_FOLDER/" \;

# Aktualizujte čas poslední synchronizace
touch "$PROJECT_FOLDER/.last-sync"

echo "Fotky zkopírovány!"
```

**Windows skript:** `scripts/copy-photos-from-drive.bat`

```batch
@echo off
set "DRIVE_FOLDER=%USERPROFILE%\Google Drive\Retro Kredenc - Fotky produktů"
set "PROJECT_FOLDER=C:\cesta\k\projektu\retrokredenc\public\products"

if not exist "%DRIVE_FOLDER%" (
    echo Chyba: Google Drive složka neexistuje
    exit /b 1
)

xcopy "%DRIVE_FOLDER%\*.jpg" "%PROJECT_FOLDER%\" /Y /D
xcopy "%DRIVE_FOLDER%\*.jpeg" "%PROJECT_FOLDER%\" /Y /D
xcopy "%DRIVE_FOLDER%\*.png" "%PROJECT_FOLDER%\" /Y /D

echo Fotky zkopírovány!
```

**Nastavení automatického spouštění:**

**Mac (crontab):**
```bash
# Spouštět každých 5 minut
*/5 * * * * /Volumes/Data/Cursor\ vibecoding/retrokredenc/scripts/copy-photos-from-drive.sh
```

**Windows (Task Scheduler):**
1. Otevřete **Plánovač úloh**
2. Vytvořte novou úlohu
3. Nastavte spouštění každých 5 minut
4. Akce: Spustit skript `copy-photos-from-drive.bat`

---

### Krok 5: Použití

**Pro vaši ženu:**
1. Vyfotí hrnek na telefonu
2. Otevře Google Drive aplikaci na telefonu
3. Najde složku **"Retro Kredenc - Fotky produktů"**
4. Nahraje fotku do složky
5. **Hotovo!** ✅

**Pro vás:**
1. Fotka se automaticky objeví v `public/products/` (během 5 minut)
2. Přejmenujte fotku podle pravidel (např. `hrnek-modry.jpg`)
3. Upravte `products.json`
4. Pushněte na GitHub

---

## 🔧 Možnost 2: Email + n8n Automation

### Předpoklady

- n8n nainstalované (na NAS nebo cloud)
- Email účet s IMAP přístupem

### Krok 1: Vytvoření n8n workflow

1. **Otevřete n8n:** `http://[IP-NAS]:5678`

2. **Vytvořte nový workflow:**
   - Klikněte **"New Workflow"**
   - Pojmenujte: "Automatické stahování fotek produktů"

3. **Přidejte moduly:**

**Modul 1: Email Trigger**
- **Modul:** Email > Watch Emails (IMAP)
- **Nastavení:**
  - Server: `imap.gmail.com` (nebo váš email server)
  - Port: `993`
  - Security: `SSL/TLS`
  - Mailbox: `INBOX`
  - Filter: `has:attachment`

**Modul 2: Filter**
- **Modul:** Flow control > Filter
- **Podmínka:** 
  ```
  {{$json.attachments.length}} > 0
  ```

**Modul 3: Download Attachment**
- **Modul:** Email > Download Attachment
- **Nastavení:**
  - Attachment ID: `{{$json.attachments[0].id}}`

**Modul 4: Save File**
- **Modul:** Files > Write Binary File
- **Nastavení:**
  - File Name: `{{$json.attachments[0].filename}}`
  - File Path: `/docker/retrokredenc/public/products/`
  - Binary Data: `{{$json.data}}`

4. **Uložte workflow:**
   - Klikněte **"Save"**
   - Zapněte workflow (tlačítko vpravo nahoře)

---

### Krok 2: Použití

**Pro vaši ženu:**
1. Vyfotí hrnek
2. Pošle fotku emailem na váš email
3. **Hotovo!** ✅

**Pro vás:**
1. Fotka se automaticky stáhne do `public/products/`
2. Přejmenujte fotku
3. Upravte `products.json`
4. Pushněte na GitHub

---

## 📱 Možnost 3: WhatsApp + Automatizace (Pokročilé)

Tato možnost je nejkomplexnější a vyžaduje:
- WhatsApp Business API
- Nebo WhatsApp Web scraping (neoficiální, může porušovat ToS)

**Doporučení:** Použijte Možnost 1 (Google Drive) - je nejjednodušší a nejspolehlivější.

---

## ✅ Doporučené řešení

**Pro vás doporučuji:** **Možnost 1 - Google Drive + Automatická synchronizace**

**Proč:**
- ✅ Nejjednodušší nastavení
- ✅ Žena jen nahraje fotku do složky
- ✅ Funguje okamžitě
- ✅ Bez složitých nástrojů
- ✅ Spolehlivé

---

## 🆘 Řešení problémů

### Google Drive se nesynchronizuje

**Řešení:**
1. Zkontrolujte, že Google Drive Desktop běží
2. Zkontrolujte, že složka je zaškrtnutá pro synchronizaci
3. Restartujte Google Drive Desktop

### Skript nekopíruje fotky

**Řešení:**
1. Zkontrolujte cesty ve skriptu
2. Zkontrolujte oprávnění (skript musí mít právo zapisovat)
3. Spusťte skript ručně a zkontrolujte chyby

### n8n workflow nefunguje

**Řešení:**
1. Zkontrolujte logy v n8n
2. Otestujte každý modul zvlášť
3. Zkontrolujte email přihlašovací údaje

---

## 💡 Tipy

- **Pojmenování:** Požádejte ženu, aby pojmenovala fotky před nahráním (např. `hrnek-modry.jpg`)
- **Kontrola:** Pravidelně kontrolujte složku `public/products/` na nové fotky
- **Backup:** Google Drive automaticky zálohuje fotky

---

## 📚 Související návody

- **[JAK_VYFOTIT_A_POSLAT_FOTKU.md](JAK_VYFOTIT_A_POSLAT_FOTKU.md)** - Jak vyfotit a poslat fotku z telefonu
- **[JAK_SPRAVOVAT_WEB.md](JAK_SPRAVOVAT_WEB.md)** - Jak spravovat produkty na webu
- **[N8N_INSTALACE.md](../../N8N_INSTALACE.md)** - Jak nainstalovat n8n (pokud používáte Možnost 2)

---

**Potřebujete pomoct s nastavením?** Kontaktujte správce projektu nebo zkontrolujte sekci "Řešení problémů" výše.
