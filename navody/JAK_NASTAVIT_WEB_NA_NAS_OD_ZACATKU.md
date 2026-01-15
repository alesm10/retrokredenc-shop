# 📋 Kompletní návod: Nastavení webu na NAS od začátku

Tento návod vás provede celým procesem nastavení webu na Synology NAS krok za krokem v češtině.

---

## ✅ Kontrolní seznam - Co už máte hotovo

- [x] Web je zbuildovaný (složka `out` existuje)
- [x] QuickConnect je aktivní (ID: `alesDonin`)
- [x] Web Station je nainstalovaný
- [x] Webová služba "retrokredenc" je vytvořená
- [x] Soubory jsou na NAS v `web/retrokredenc`
- [x] Reverse Proxy rule je vytvořený

---

## 🔍 Krok 1: Ověření, že Web Station běží

### 1.1 Otevřete Web Station

1. V hlavním menu DSM klikněte na **"Web Station"**
2. V levém menu klikněte na **"Přehled"** (Overview)
3. Zkontrolujte:
   - ✅ **"Výchozí stav serveru:"** by měl být `Normální` (zeleně)
   - ✅ **"Stav webového portálu:"** by měl být `Normální` (zeleně)

### 1.2 Zkontrolujte webovou službu

1. V levém menu klikněte na **"Webová služba"** (Web Service)
2. V seznamu najděte **"retrokredenc"** pod "Statické webové stránky"
3. Zkontrolujte:
   - ✅ **"Stav:"** by měl být `Normální` (zeleně)
   - ✅ **"Kořenová složka dokumentů:"** by měla být `web/retrokredenc`

**Pokud není "Normální":**
- Klikněte na službu "retrokredenc"
- Klikněte **"Upravit"**
- Zkontrolujte nastavení a uložte

---

## 📁 Krok 2: Ověření souborů na NAS

### 2.1 Otevřete File Station

1. V hlavním menu klikněte na **"File Station"**
2. V levém panelu otevřete složku **"web"**
3. Otevřete složku **"retrokredenc"**

### 2.2 Zkontrolujte soubory

Měli byste vidět:
- ✅ `index.html` (hlavní soubor)
- ✅ `_next/` (složka s JavaScript soubory)
- ✅ `produkty/` (složka se stránkami produktů)
- ✅ `kontakt/`, `o-nas/` (další složky)

**Pokud soubory nejsou:**
- Zkopírujte obsah složky `out` z počítače do `web/retrokredenc` na NAS
- Viz návod: `JAK_SDILET_S_KOLEGOU.md` - Krok 3

---

## 🧪 Krok 3: Test lokálního přístupu

### 3.1 Zjistěte IP adresu NAS

1. **Ovládací panel** → **Síť** → **Síťové rozhraní**
2. Klikněte na aktivní síťové rozhraní (obvykle "LAN 1")
3. Zapište si **IPv4 adresu** (např. `10.0.0.25`)

### 3.2 Otestujte lokálně

1. Otevřete prohlížeč
2. Zadejte: `http://10.0.0.25/retrokredenc`
   - (Nahraďte `10.0.0.25` vaší IP adresou)
3. **Měli byste vidět váš web!**

**Pokud to nefunguje:**
- Zkontrolujte, že Web Station běží (Krok 1)
- Zkontrolujte, že soubory jsou na správném místě (Krok 2)
- Zkuste: `http://10.0.0.25:80/retrokredenc`

---

## 🔧 Krok 4: Nastavení Reverse Proxy (pro QuickConnect)

### 4.1 Otevřete Login Portal

1. **Ovládací panel** → **Přihlašovací portál** (Login Portal)
   - Pokud nevidíte "Přihlašovací portál", hledejte v sekci **"Systém"**

### 4.2 Otevřete Reverse Proxy

1. V **Přihlašovací portál** klikněte na záložku **"Reverzní server proxy"** (Reverse Proxy)
2. Pokud už máte rule "Retro Kredenc Web", klikněte na něj a pak **"Upravit"**
3. Pokud ne, klikněte **"Vytvořit"**

### 4.3 Nastavte Source (Zdroj)

Na záložce **"Obecné"** (General):

- **Název reverzního serveru proxy:** `Retro Kredenc Web`
- **Protokol:** `HTTPS` (nebo `HTTP` pokud nemáte SSL)
- **Název hostitele:** `alesDonin.quickconnect.to`
- **Port:** `5001`
- **Povolit HSTS:** ✅ (zaškrtnuté, pokud používáte HTTPS)

### 4.4 Nastavte Destination (Cíl)

- **Protokol:** `HTTP`
- **Název hostitele:** `localhost`
- **Port:** `80`

### 4.5 Uložte

1. Klikněte **"Uložit"** (Save)
2. Rule se vytvoří/aktualizuje

---

## 🌐 Krok 5: Nastavení QuickConnect pro webové služby

### 5.1 Otevřete QuickConnect nastavení

1. **Ovládací panel** → **Externí přístup** → **QuickConnect**
2. Zkontrolujte:
   - ✅ **"Povolit QuickConnect"** je zaškrtnuté
   - ✅ **QuickConnect ID:** `alesDonin`

### 5.2 Zkontrolujte rozšířená nastavení

1. Klikněte na záložku **"Rozšířené"** (Advanced)
2. Zkontrolujte, že **"Povolit službu přenosu QuickConnect"** je zaškrtnuté
3. V sekci **"Aplikace/Služby"** by mělo být zaškrtnuté:
   - ✅ **"DSM"**
   - ✅ Ostatní služby podle potřeby

**Poznámka:** Web Station není v seznamu, protože QuickConnect automaticky zpřístupňuje webové služby přes port 5001.

---

## 🔒 Krok 6: Kontrola Firewall

### 6.1 Otevřete Firewall

1. **Ovládací panel** → **Zabezpečení** → **Firewall**

### 6.2 Zkontrolujte porty

Měly by být povolené:
- ✅ **Port 5000** (DSM HTTP)
- ✅ **Port 5001** (DSM HTTPS / QuickConnect)
- ✅ **Port 80** (HTTP web)
- ✅ **Port 443** (HTTPS web, pokud používáte)

**Pokud porty nejsou povolené:**
1. Klikněte **"Vytvořit"** → **"Vytvořit pravidlo brány firewall"**
2. Přidejte potřebné porty
3. Uložte

---

## 🧪 Krok 7: Testování QuickConnect

### 7.1 Test z lokální sítě

1. Otevřete prohlížeč
2. Zadejte: `https://alesDonin.quickconnect.to:5001/retrokredenc`
3. Měli byste vidět váš web

**Pokud vidíte chybu "ERR_TIMED_OUT":**

**Možnost A: Zkuste bez HTTPS**
```
http://alesDonin.quickconnect.to:5001/retrokredenc
```

**Možnost B: Zkuste bez portu**
```
http://alesDonin.quickconnect.to/retrokredenc
```

**Možnost C: Zkuste jiný formát**
```
https://alesDonin.direct.quickconnect.to:5001/retrokredenc
```

### 7.2 Test z jiné sítě (jako kolega)

1. Otevřete prohlížeč na jiném zařízení (telefon s mobilními daty)
2. Zadejte: `https://alesDonin.quickconnect.to:5001/retrokredenc`
3. Měli by vidět váš web

---

## 🆘 Řešení problémů

### Problém: "ERR_TIMED_OUT"

**Možné příčiny:**
1. QuickConnect není aktivní
   - **Řešení:** Ovládací panel → QuickConnect → zkontrolujte, že je aktivní

2. Firewall blokuje port
   - **Řešení:** Ovládací panel → Zabezpečení → Firewall → povolte port 5001

3. Reverse Proxy není správně nastavený
   - **Řešení:** Zkontrolujte Krok 4

4. Web Station neběží
   - **Řešení:** Zkontrolujte Krok 1

### Problém: "Page Not Found" (Stránka nebyla nalezena)

**Možné příčiny:**
1. Soubory nejsou na správném místě
   - **Řešení:** Zkontrolujte Krok 2

2. Webová služba není správně nastavená
   - **Řešení:** Web Station → Webová služba → upravte službu "retrokredenc"

3. Reverse Proxy má špatnou cestu
   - **Řešení:** V Reverse Proxy zkuste přidat cestu do hostname:
     - Cíl hostname: `localhost/retrokredenc`

### Problém: Web se zobrazí, ale obrázky/JS nefungují

**Možné příčiny:**
1. Cesty k souborům jsou špatné
   - **Řešení:** Zkontrolujte, že všechny soubory jsou v `web/retrokredenc`
   - Zkontrolujte, že složka `_next` obsahuje JavaScript soubory

---

## 📝 Shrnutí - Co zkontrolovat

Projděte si tento seznam:

- [ ] Web Station běží (Přehled → stav "Normální")
- [ ] Webová služba "retrokredenc" má stav "Normální"
- [ ] Soubory jsou v `web/retrokredenc` (index.html, _next/, atd.)
- [ ] Lokální přístup funguje: `http://10.0.0.25/retrokredenc`
- [ ] Reverse Proxy je vytvořený a aktivní
- [ ] QuickConnect je aktivní (ID: alesDonin)
- [ ] Firewall povoluje port 5001
- [ ] Test QuickConnect URL: `https://alesDonin.quickconnect.to:5001/retrokredenc`

---

## 🎯 Finální URL pro kolegu

Po úspěšném nastavení bude URL:

```
https://alesDonin.quickconnect.to:5001/retrokredenc
```

**Nebo zkuste tyto varianty, pokud první nefunguje:**

```
http://alesDonin.quickconnect.to:5001/retrokredenc
http://alesDonin.quickconnect.to/retrokredenc
https://alesDonin.direct.quickconnect.to:5001/retrokredenc
```

---

## 💡 Tipy

1. **Nejprve otestujte lokálně** - pokud `http://10.0.0.25/retrokredenc` funguje, pak je problém v QuickConnect/Reverse Proxy

2. **Zkontrolujte logy** - Web Station → Přehled → můžete vidět chyby

3. **Restartujte služby** - Pokud nic nepomáhá, zkuste:
   - Web Station → Webová služba → zastavte a spusťte službu "retrokredenc"
   - Nebo restartujte celý NAS

---

**Potřebujete pomoc?** Postupujte krok za krokem podle tohoto návodu a u každého kroku zkontrolujte, že vše funguje před přechodem na další krok.
