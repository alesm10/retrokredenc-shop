# 🔒 Nastavení Web Station a QuickConnect pro kolegu

Tento návod vás provede nastavením, aby se kolega mohl připojit k webu přes QuickConnect z internetu.

---

## ✅ Co už máte hotovo

- ✅ Soubory jsou na NAS v `web/retrokredenc`
- ✅ QuickConnect je aktivní (ID: `alesDonin`)

---

## 📋 Krok 1: Nastavení Web Station

### 1.1 Otevřete Web Station

1. V hlavním menu DSM klikněte na **"Web Station"**

### 1.2 Vytvořte webovou službu

1. V levém menu klikněte na **"Webová služba"** (Web Service)
2. Klikněte **"Vytvořit"** (Create)

### 1.3 Vyberte typ služby

1. V dialogu vyberte **"Statické webové stránky"** (Static web pages)
2. Klikněte **"Další"** (Next)

### 1.4 Nastavte službu

**Záložka "Obecné" (General):**

- **Název:** `retrokredenc`
- **Popis:** `Retro Kredenc web` (volitelné)
- **Kořenová složka dokumentů:** 
  - Klikněte **"Procházet"** (Browse)
  - Najděte a vyberte složku: `web/retrokredenc`
  - Nebo zadejte ručně: `web/retrokredenc`
- **Server HTTP backend:** Vyberte `Nginx` (nebo `Apache`, pokud máte)

3. Klikněte **"Vytvořit"** (Create) nebo **"Uložit"** (Save)

### 1.5 Ověřte, že služba běží

1. V seznamu webových služeb byste měli vidět **"retrokredenc"**
2. **"Stav"** by měl být **"Normální"** (zeleně)

**Pokud není "Normální":**
- Klikněte na službu "retrokredenc"
- Klikněte **"Upravit"** (Edit)
- Zkontrolujte nastavení a uložte

---

## 🌐 Krok 2: Nastavení QuickConnect

### 2.1 Otevřete QuickConnect

1. **Ovládací panel** → **Externí přístup** → **QuickConnect**
   - Nebo: **Ovládací panel** → **QuickConnect** (záložka "QuickConnect")

### 2.2 Zkontrolujte aktivaci

1. Zkontrolujte, že **"Povolit QuickConnect"** je ✅ zaškrtnuté
2. **QuickConnect ID:** `alesDonin` (mělo by být vyplněné)

**Pokud není aktivní:**
- Zaškrtněte **"Povolit QuickConnect"**
- Zadejte nebo zkontrolujte QuickConnect ID
- Klikněte **"Použít"** (Apply)

### 2.3 Zkontrolujte rozšířená nastavení

1. Klikněte na záložku **"Rozšířené"** (Advanced)
2. Zkontrolujte:
   - ✅ **"Povolit službu přenosu QuickConnect"** je zaškrtnuté
   - ✅ V sekci **"Aplikace/Služby"** je zaškrtnuté **"DSM"**

3. Klikněte **"Použít"** (Apply)

---

## 🔧 Krok 3: Nastavení Reverse Proxy (DŮLEŽITÉ!)

QuickConnect automaticky přesměrovává na port **5001** (DSM), ale Web Station běží na portu **80**. Potřebujeme Reverse Proxy pro přesměrování.

### 3.1 Otevřete Login Portal

1. **Ovládací panel** → **Přihlašovací portál** (Login Portal)
   - Pokud nevidíte "Přihlašovací portál", hledejte v sekci **"Systém"**

### 3.2 Otevřete Reverse Proxy

1. V **Přihlašovací portál** klikněte na záložku **"Reverzní server proxy"** (Reverse Proxy)
2. Pokud už máte rule "Retro Kredenc Web", klikněte na něj a pak **"Upravit"**
3. Pokud ne, klikněte **"Vytvořit"** (Create)

### 3.3 Nastavte Source (Zdroj - odkud přicházejí požadavky)

Na záložce **"Obecné"** (General):

- **Název reverzního serveru proxy:** `Retro Kredenc Web`
- **Protokol:** `HTTPS` (nebo `HTTP` pokud nemáte SSL certifikát)
- **Název hostitele:** `alesDonin.quickconnect.to`
- **Port:** `5001` (port QuickConnect)
- **Povolit HSTS:** ✅ (zaškrtněte, pokud používáte HTTPS)

### 3.4 Nastavte Destination (Cíl - kam přesměrovat)

- **Protokol:** `HTTP`
- **Název hostitele:** `localhost`
- **Port:** `80` (port Web Station)

### 3.5 Uložte

1. Klikněte **"Uložit"** (Save)
2. Reverse Proxy rule se vytvoří/aktualizuje

---

## 🔒 Krok 4: Kontrola Firewall

### 4.1 Otevřete Firewall

1. **Ovládací panel** → **Zabezpečení** → **Firewall**

### 4.2 Zkontrolujte porty

Měly by být povolené:
- ✅ **Port 5000** (DSM HTTP)
- ✅ **Port 5001** (DSM HTTPS / QuickConnect)
- ✅ **Port 80** (HTTP web)

**Pokud porty nejsou povolené:**
1. Klikněte **"Vytvořit"** → **"Vytvořit pravidlo brány firewall"**
2. Přidejte potřebné porty
3. Uložte

---

## 🧪 Krok 5: Testování

### 5.1 Test lokálně (ve vaší síti)

1. Otevřete prohlížeč
2. Zadejte: `http://10.0.0.25/retrokredenc`
   - (Nahraďte `10.0.0.25` IP adresou vašeho NAS)
3. **Měli byste vidět váš web!**

**Pokud to nefunguje:**
- Zkontrolujte Krok 1 (Web Station)
- Zkontrolujte, že soubory jsou v `web/retrokredenc`

### 5.2 Test přes QuickConnect

1. Otevřete prohlížeč
2. Zadejte: `https://alesDonin.quickconnect.to:5001/retrokredenc`
3. **Měli byste vidět váš web!**

**Pokud vidíte chybu "ERR_TIMED_OUT":**
- Zkuste: `http://alesDonin.quickconnect.to:5001/retrokredenc` (bez HTTPS)
- Zkontrolujte Krok 3 (Reverse Proxy)
- Zkontrolujte Krok 4 (Firewall)

---

## 👥 Krok 6: Sdílení s kolegou

### 6.1 URL pro kolegu

Pošlete kolegovi tuto URL:

```
https://alesDonin.quickconnect.to:5001/retrokredenc
```

**Nebo pokud HTTPS nefunguje:**

```
http://alesDonin.quickconnect.to:5001/retrokredenc
```

### 6.2 Co kolega potřebuje

- ✅ **Pouze internetové připojení**
- ✅ **Žádné speciální nastavení** - QuickConnect funguje automaticky
- ✅ **Pouze otevřít URL v prohlížeči**

### 6.3 Bezpečnost

- ✅ URL je **neveřejná** - jen lidé s linkem mají přístup
- ✅ QuickConnect používá **šifrování**
- ✅ **Žádné heslo není potřeba** (web je veřejný pro kohokoliv s linkem)

**Pokud chcete přidat heslo:**
- Můžete nastavit autentizaci v Reverse Proxy (rozšířené nastavení)

---

## ✅ Kontrolní seznam

Před sdílením s kolegou zkontrolujte:

- [ ] Web Station běží (Přehled → stav "Normální")
- [ ] Webová služba "retrokredenc" má stav "Normální"
- [ ] Soubory jsou v `web/retrokredenc` (index.html, _next/, atd.)
- [ ] QuickConnect je aktivní (ID: alesDonin)
- [ ] Reverse Proxy je vytvořený a aktivní
- [ ] Firewall povoluje port 5001
- [ ] Lokální test funguje: `http://10.0.0.25/retrokredenc`
- [ ] QuickConnect test funguje: `https://alesDonin.quickconnect.to:5001/retrokredenc`

---

## 🆘 Řešení problémů

### Problém: "ERR_TIMED_OUT"

**Možné příčiny:**
1. QuickConnect není aktivní
   - **Řešení:** Ovládací panel → QuickConnect → zkontrolujte aktivaci

2. Firewall blokuje port
   - **Řešení:** Ovládací panel → Zabezpečení → Firewall → povolte port 5001

3. Reverse Proxy není správně nastavený
   - **Řešení:** Zkontrolujte Krok 3 - Source port musí být 5001, Destination port 80

### Problém: "Page Not Found" (Stránka nebyla nalezena)

**Možné příčiny:**
1. Webová služba neběží
   - **Řešení:** Web Station → Webová služba → zkontrolujte stav služby "retrokredenc"

2. Soubory nejsou na správném místě
   - **Řešení:** File Station → zkontrolujte `web/retrokredenc` → měli byste vidět index.html

3. Reverse Proxy má špatné nastavení
   - **Řešení:** Zkontrolujte, že Destination hostname je `localhost` a port je `80`

### Problém: Web se zobrazí, ale obrázky/JS nefungují

**Možné příčiny:**
1. Cesty k souborům jsou špatné
   - **Řešení:** Zkontrolujte, že všechny soubory jsou v `web/retrokredenc`
   - Zkontrolujte, že složka `_next` obsahuje JavaScript soubory

---

## 📝 Shrnutí

1. ✅ **Web Station** - vytvořte službu "retrokredenc" s Document Root `web/retrokredenc`
2. ✅ **QuickConnect** - zkontrolujte, že je aktivní (ID: alesDonin)
3. ✅ **Reverse Proxy** - vytvořte rule pro přesměrování z portu 5001 na port 80
4. ✅ **Firewall** - povolte port 5001
5. ✅ **Test** - otestujte lokálně i přes QuickConnect
6. ✅ **Sdílení** - pošlete kolegovi URL: `https://alesDonin.quickconnect.to:5001/retrokredenc`

---

**Hotovo!** Kolega se teď může připojit odkudkoliv s internetem pomocí QuickConnect URL.
