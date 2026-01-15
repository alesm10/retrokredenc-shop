# 🔧 Kompletní návod: Nastavení webu na NAS přes QuickConnect

Tento návod vás provede celým procesem nastavení webu na Synology NAS pro přístup přes QuickConnect.

---

## ✅ Co už máte

- ✅ Soubory jsou na NAS v `web/retrokredenc`
- ✅ QuickConnect je aktivní (ID: `alesDonin`)
- ✅ Web Station je nainstalovaný
- ✅ Webová služba "retrokredenc" je vytvořená a běží
- ✅ Lokálně web funguje: `http://10.0.0.25/retrokredenc`

---

## 🔍 Problém

QuickConnect automaticky přesměrovává na port **5001** (DSM), ale Web Station běží na portu **80**. Potřebujeme správně nastavit Web Portal, aby QuickConnect přesměroval na web.

---

## 🔧 ŘEŠENÍ: Použít Web Portal místo Reverse Proxy

**⚠️ DŮLEŽITÉ:** QuickConnect automaticky přesměrovává na port 5001. Místo Reverse Proxy použijeme **Web Portal** v Web Station.

### Krok 1: Smažte všechny Reverse Proxy pravidla pro web

1. **Ovládací panel** → **Přihlašovací portál** → **Reverzní server proxy**
2. Pokud máte pravidlo pro "retrokredenc", klikněte na něj a **"Odstranit"**
3. Nechte Reverse Proxy prázdný (nebo jen pravidla pro jiné služby)

### Krok 2: Nastavte Web Portal v Web Station

1. **Web Station** → **Webový portál** (Web Portal)
2. Klikněte **"Vytvořit"** (Create)

### Krok 3: Nastavte Web Portal

**Záložka "Obecné" (General):**

- **Typ portálu:** Vyberte **"Podle názvu"** (By hostname)
- **Název hostitele:** `retrokredenc.alesDonin.quickconnect.to`
  - ⚠️ **DŮLEŽITÉ:** Použijte subdoménu, ne hlavní doménu!
- **Port:** `80 / 443` (nebo jen `80` pokud nemáte SSL)
- **Služba:** Vyberte **"retrokredenc"** (vaši webovou službu)
- **Alias:** (nechte prázdné)

### Krok 4: Uložte

1. Klikněte **"Vytvořit"** nebo **"Uložit"**
2. Web Portal se vytvoří

---

## 🔄 ALTERNATIVNÍ ŘEŠENÍ: Použít hlavní QuickConnect URL

Pokud subdoména nefunguje, zkuste použít hlavní QuickConnect URL:

### Varianta A: Web Portal s hlavní doménou

1. **Web Station** → **Webový portál** → **"Vytvořit"**
2. **Typ portálu:** **"Podle názvu"**
3. **Název hostitele:** `alesDonin.quickconnect.to`
4. **Port:** `80 / 443`
5. **Služba:** **"retrokredenc"**
6. Uložte

**URL bude:** `http://alesDonin.quickconnect.to/retrokredenc`

### Varianta B: Změnit Document Root na root

Pokud Web Portal nefunguje, zkuste přesunout soubory do rootu:

1. **Web Station** → **Webová služba** → klikněte na **"retrokredenc"** → **"Upravit"**
2. **Kořenová složka dokumentů:** změňte na `web` (místo `web/retrokredenc`)
3. Uložte
4. **File Station:** Přesuňte všechny soubory z `web/retrokredenc` do `web` (přímo do rootu)
5. **Web Portal:** Vytvořte nový portál s hostname `alesDonin.quickconnect.to` a službou "retrokredenc"
6. **URL bude:** `http://alesDonin.quickconnect.to/`

---

## 🔒 Krok 5: Kontrola Firewall

1. **Ovládací panel** → **Zabezpečení** → **Firewall**
2. Zkontrolujte, že jsou povolené:
   - ✅ **Port 5000** (DSM HTTP)
   - ✅ **Port 5001** (DSM HTTPS / QuickConnect)
   - ✅ **Port 80** (HTTP web)
   - ✅ **Port 443** (HTTPS web, pokud používáte)

---

## 🧪 Testování

### Test 1: Lokální přístup

```
http://10.0.0.25/retrokredenc
```

Mělo by fungovat (už funguje).

### Test 2: QuickConnect s cestou

```
http://alesDonin.quickconnect.to/retrokredenc
```

**Nebo pokud jste použili subdoménu:**

```
http://retrokredenc.alesDonin.quickconnect.to/
```

### Test 3: QuickConnect bez cesty (pokud jste použili Variantu B)

```
http://alesDonin.quickconnect.to/
```

---

## 🔍 Diagnostika

### Pokud web stále nefunguje:

1. **Zkontrolujte Web Portal:**
   - **Web Station** → **Webový portál**
   - Měli byste vidět portál s hostname `alesDonin.quickconnect.to` nebo `retrokredenc.alesDonin.quickconnect.to`
   - **Stav** by měl být **"Normální"** (zeleně)

2. **Zkontrolujte Webovou službu:**
   - **Web Station** → **Webová služba**
   - Služba "retrokredenc" by měla mít stav **"Normální"**

3. **Zkontrolujte soubory:**
   - **File Station** → `web/retrokredenc`
   - Měli byste vidět `index.html` a složku `_next`

4. **Zkuste restartovat služby:**
   - **Web Station** → **Přehled** → **Restartovat služby**

---

## 💡 Proč tento přístup funguje lépe

- ✅ **Web Portal** je navržený přímo pro QuickConnect
- ✅ Automaticky řeší přesměrování z QuickConnect na Web Station
- ✅ Nemusíte řešit Reverse Proxy a porty
- ✅ QuickConnect automaticky přesměrovává na správný port

---

## 📝 Co zkuste teď (krok za krokem)

1. ✅ **Smažte Reverse Proxy pravidla** pro web (pokud nějaké máte)
2. ✅ **Web Station** → **Webový portál** → **"Vytvořit"**
3. ✅ **Nastavte:**
   - Typ: **"Podle názvu"**
   - Hostname: `alesDonin.quickconnect.to`
   - Port: `80 / 443`
   - Služba: **"retrokredenc"**
4. ✅ **Uložte**
5. ✅ **Otestujte:** `http://alesDonin.quickconnect.to/retrokredenc`

---

## 🆘 Pokud stále nefunguje

Zkuste **Variantu B** (přesunout soubory do rootu) - to je nejjednodušší řešení, které vždy funguje.

---

**Postupujte krok za krokem a u každého kroku mi dejte vědět, co vidíte!**
