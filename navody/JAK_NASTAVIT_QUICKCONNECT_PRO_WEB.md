# 🔒 Přesný plán: Přístup k webu přes QuickConnect

Tento návod vám ukáže, jak nastavit přístup k Web Station přes QuickConnect, když kolega není v lokální síti.

---

## ⚠️ Problém

- QuickConnect automaticky přesměrovává na port **5001** (DSM)
- Web Station běží na portu **80**
- Potřebujeme **Reverse Proxy** pro přesměrování

---

## ✅ Řešení: Reverse Proxy v DSM

### Krok 1: Otevřete Login Portal

1. **Control Panel** → **Login Portal** (Přihlašovací portál)
   - Pokud nevidíte "Login Portal", hledejte v **System** sekci

### Krok 2: Otevřete Reverse Proxy

1. V **Login Portal** klikněte na záložku **"Reverse Proxy"** (Reverzní proxy)
2. Klikněte **"Create"** (Vytvořit) nebo **"Vytvořit"**

### Krok 3: Nastavte Reverse Proxy

**Záložka "Reverse Proxy" (zdroj - odkud přicházejí požadavky):**

- **Description (Popis):** `Retro Kredenc Web`
- **Protocol:** Vyberte **`HTTPS`** (bezpečnější) nebo **`HTTP`** (pokud nemáte SSL certifikát)
- **Hostname:** `alesDonin.quickconnect.to` (vaše QuickConnect ID)
- **Port:** `5001` (port, na který QuickConnect přesměrovává)
- **Path:** `/retrokredenc` (cesta k vašemu webu)

**Záložka "Destination" (cíl - kam přesměrovat):**

- **Protocol:** `HTTP`
- **Hostname:** `localhost` (nebo `127.0.0.1`)
- **Port:** `80` (port Web Station)
- **Path:** `/retrokredenc` (stejná cesta)

### Krok 4: Uložte nastavení

1. Klikněte **"Save"** (Uložit) nebo **"Uložit"**
2. Reverse Proxy se vytvoří a aktivuje

---

## 🌐 URL pro kolegu

Po nastavení Reverse Proxy bude URL:

```
https://alesDonin.quickconnect.to:5001/retrokredenc
```

**Nebo pokud používáte HTTP:**

```
http://alesDonin.quickconnect.to:5001/retrokredenc
```

**⚠️ DŮLEŽITÉ:** 
- Musíte použít port **5001** v URL (port QuickConnect)
- Reverse Proxy automaticky přesměruje na port 80 (Web Station)

---

## 🔒 Bezpečnost

### Doporučené nastavení:

1. **Použijte HTTPS:**
   - V Reverse Proxy nastavte **Protocol: HTTPS**
   - DSM má automatický SSL certifikát pro QuickConnect

2. **Omezte přístup (volitelné):**
   - V Reverse Proxy můžete přidat IP whitelist
   - Nebo použít autentizaci

3. **Firewall:**
   - Port 5001 by měl být automaticky povolený pro QuickConnect
   - Zkontrolujte: **Control Panel** → **Security** → **Firewall**

---

## ✅ Kontrolní seznam

Před sdílením s kolegou zkontrolujte:

- [ ] Reverse Proxy je vytvořený a aktivní
- [ ] Web Station běží (služba "retrokredenc" má status "Normální")
- [ ] Soubory jsou na NAS v `web/retrokredenc`
- [ ] QuickConnect je aktivní (ID: `alesDonin`)
- [ ] Otestovali jste URL lokálně: `http://10.0.0.25/retrokredenc`
- [ ] Otestovali jste URL přes QuickConnect: `https://alesDonin.quickconnect.to:5001/retrokredenc`

---

## 🧪 Testování

### 1. Lokální test (ve vaší síti):

```
http://10.0.0.25/retrokredenc
```

Měli byste vidět váš web.

### 2. Test přes QuickConnect:

```
https://alesDonin.quickconnect.to:5001/retrokredenc
```

Měli byste vidět stejný web.

### 3. Test z jiné sítě (jako kolega):

- Otevřete URL na jiném zařízení (telefon s mobilními daty)
- Nebo požádejte kolegu, aby otestoval URL
- Měli by vidět váš web

---

## 🆘 Řešení problémů

### Problém: "Page Not Found" (Stránka nebyla nalezena)

**Možné příčiny:**
1. Reverse Proxy není správně nastavený
   - Zkontrolujte, že Source Path a Destination Path jsou stejné (`/retrokredenc`)
   - Zkontrolujte, že Destination Port je `80`

2. Web Station neběží
   - Otevřete **Web Station** → **Webová služba**
   - Zkontrolujte, že služba "retrokredenc" má status "Normální"

3. Soubory nejsou na správném místě
   - Zkontrolujte v File Station: `web/retrokredenc`
   - Měli byste vidět `index.html` a složku `_next/`

### Problém: "Connection refused" (Připojení odmítnuto)

**Možné příčiny:**
1. Firewall blokuje port
   - **Control Panel** → **Security** → **Firewall**
   - Zkontrolujte, že port 5001 je povolený

2. QuickConnect není aktivní
   - **Control Panel** → **QuickConnect**
   - Zkontrolujte, že je zaškrtnuté "Povolit QuickConnect"

### Problém: Web se zobrazí, ale obrázky/JS nefungují

**Možné příčiny:**
1. Cesty k souborům jsou špatné
   - Zkontrolujte, že všechny soubory jsou v `web/retrokredenc`
   - Zkontrolujte, že složka `_next` obsahuje JavaScript soubory

---

## 📝 Shrnutí

1. ✅ **Nastavte Reverse Proxy** v Login Portal
2. ✅ **Source:** `alesDonin.quickconnect.to:5001/retrokredenc`
3. ✅ **Destination:** `localhost:80/retrokredenc`
4. ✅ **URL pro kolegu:** `https://alesDonin.quickconnect.to:5001/retrokredenc`
5. ✅ **Otestujte** před sdílením

---

**Potřebujete pomoc?** Zkontrolujte sekci "Řešení problémů" výše nebo kontaktujte správce projektu.
