# 📱 Jak přidat fotky z telefonu na web

## Přehled řešení

Máte několik možností, jak žena může přidávat fotky z telefonu, aby se automaticky zobrazily na webu.

---

## Možnost 1: Synology Photos + Automatizace (Doporučeno) ⭐

### Jak to funguje:
1. Žena nafotí produkt na telefonu
2. Otevře aplikaci **Synology Photos** na telefonu
3. Nahraje fotky do složky "retrokredenc"
4. Automatizace (skript nebo n8n) zjistí nové fotky
5. Automaticky aktualizuje `products.json`
6. Web se automaticky rebuildne a zobrazí fotky

### Nastavení:

#### Krok 1: Nainstalujte Synology Photos na NAS
1. **Package Center** → Vyhledejte **Synology Photos**
2. Klikněte **Install**
3. Po instalaci vytvořte složku `/photos/retrokredenc/`

#### Krok 2: Nastavte aplikaci Synology Photos na telefonu
1. Stáhněte aplikaci **Synology Photos** z App Store (iOS) nebo Google Play (Android)
2. Přihlaste se pomocí QuickConnect ID nebo IP adresy NAS
3. Vytvořte album nebo složku: **"Retrokredenc produkty"**

#### Krok 3: Vytvořte automatizační skript
- Skript, který monitoruje složku `/photos/retrokredenc/`
- Když najde nové fotky, aktualizuje `products.json`
- Můžu vytvořit skript, který to udělá automaticky

**Výhody:**
- ✅ Jednoduché pro ženu (jen nahrát fotku)
- ✅ Automatické zpracování
- ✅ Organizace fotek na jednom místě

---

## Možnost 2: Google Drive / Dropbox + Automatizace

### Jak to funguje:
1. Vytvoříte složku na Google Drive/Dropbox: "Retrokredenc produkty"
2. Žena pošle fotku z telefonu do této složky (přes Google Drive/Dropbox app)
3. Automatizace (n8n nebo skript) zjistí nové fotky
4. Stáhne je na NAS/server
5. Aktualizuje `products.json`

### Nastavení:

#### Krok 1: Vytvořte složku na Google Drive
1. Vytvořte složku: "Retrokredenc produkty"
2. Sdílejte ji s ženou (přístup pro psaní)

#### Krok 2: Nastavte automatizaci (n8n nebo skript)
- Monitorujte složku na Google Drive
- Když se přidá nový soubor, stáhněte ho
- Aktualizujte web

**Výhody:**
- ✅ Žena už může mít Google Drive/Dropbox
- ✅ Snadné sdílení fotek

**Nevýhody:**
- ❌ Vyžaduje automatizaci (n8n nebo skript)

---

## Možnost 3: Email přímo na NAS (Nejjednodušší) ⭐⭐⭐

### Jak to funguje:
1. Nastavíte email na NAS (např. `produkty@vas-domena.cz`)
2. Žena pošle email s fotkou jako přílohou
3. Automatizace zpracuje email, stáhne fotku
4. Aktualizuje web

### Nastavení:

#### Krok 1: Nastavte email na NAS
1. **Control Panel** → **Notification** → **Email**
2. Nastavte SMTP server (Gmail, Outlook, atd.)
3. Vytvořte emailovou adresu: `produkty@vas-domena.cz` (nebo použijte existující)

#### Krok 2: Nastavte automatizaci (n8n nebo skript)
- Monitorujte emailovou schránku
- Když přijde email s přílohou, stáhněte fotku
- Aktualizujte `products.json`

**Výhody:**
- ✅ **Nejjednodušší** pro ženu (jen poslat email)
- ✅ Funguje z jakéhokoliv telefonu
- ✅ Nemusí instalovat aplikaci

---

## Možnost 4: WhatsApp / Telegram Bot (Pokročilé)

### Jak to funguje:
1. Vytvoříte Telegram/WhatsApp bot
2. Žena pošle fotku boto přes WhatsApp/Telegram
3. Bot zpracuje fotku a aktualizuje web

### Nastavení:
- Vyžaduje vytvoření bota (můžu pomoct)
- Automatizace přes n8n nebo vlastní server

**Výhody:**
- ✅ Velmi jednoduché pro ženu
- ✅ Rychlé

**Nevýhody:**
- ❌ Vyžaduje vytvoření bota
- ❌ Složitější setup

---

## Možnost 5: Jednoduchý webový formulář (Pro ženu)

### Jak to funguje:
1. Vytvoříte jednoduchou stránku na webu: `/admin/pridat-produkt`
2. Žena se přihlásí (heslo)
3. Vyplní formulář: název, cena, popis
4. Nahraje fotku
5. Web automaticky přidá produkt

### Nastavení:
- Vytvoříte admin stránku s formulářem
- Automatické zpracování a aktualizace `products.json`

**Výhody:**
- ✅ Vše na jednom místě
- ✅ Jednoduché rozhraní
- ✅ Může přidat i text produktu

**Nevýhody:**
- ❌ Vyžaduje vytvoření admin rozhraní

---

## Moje doporučení

### Pro začátek (nejjednodušší):
**Možnost 3: Email** - Žena jen pošle email s fotkou, automatizace udělá zbytek.

### Pro dlouhodobé řešení:
**Možnost 1: Synology Photos** - Organizované, automatické, profesionální.

### Pro úplnou jednoduchost:
**Možnost 5: Webový formulář** - Vše na webu, jednoduché rozhraní pro ženu.

---

## Co potřebuji vědět od vás:

1. **Má žena Synology Photos aplikaci?**
   - Pokud ano → Možnost 1
   - Pokud ne → Možnost 3 (Email)

2. **Máte n8n na NAS?**
   - Pokud ano → Můžu vytvořit automatizaci
   - Pokud ne → Můžu vytvořit jednoduchý skript

3. **Chcete admin rozhraní?**
   - Pokud ano → Vytvořím Možnost 5 (webový formulář)
   - Pokud ne → Použijeme automatizaci

4. **Jak často bude přidávat produkty?**
   - Často → Automatizace (Možnost 1 nebo 3)
   - Občas → Webový formulář (Možnost 5)

---

## Co můžu vytvořit:

- ✅ Automatizační skript pro zpracování fotek
- ✅ n8n workflow pro automatizaci
- ✅ Admin webový formulář pro přidávání produktů
- ✅ Instrukce pro ženu (jednoduchý návod)

**Řekněte mi, kterou možnost preferujete, a připravím kompletní řešení!**
