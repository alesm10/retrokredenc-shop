# 🔧 Oprava: Web Portal má port 8080 místo 80/443

Vidím, že váš Web Portal má port **8080**, ale QuickConnect přesměrovává na port **5001**. To je problém!

---

## 🔍 Problém

- Web Portal běží na portu **8080**
- QuickConnect přesměrovává na port **5001**
- Tyto porty se neshodují → web nefunguje

---

## ✅ Řešení: Změnit port Web Portal na 80/443

### Krok 1: Upravte Web Portal

1. **Web Station** → **Webový portál**
2. Klikněte na portál **"retrokredenc"**
3. Klikněte **"Upravit"** (Edit)
4. V sekci **"Port"**:
   - **Odškrtněte** checkbox "8080" (pokud je zaškrtnutý)
   - **Zaškrtněte** checkbox **"80 / 443"**
5. Klikněte **"Vytvořit"** nebo **"Uložit"**

### Krok 2: Otestujte lokálně

1. Otevřete: `http://10.0.0.25/retrokredenc`
   - (Nahraďte `10.0.0.25` IP adresou vašeho NAS)
2. Mělo by to fungovat rychle

### Krok 3: Otestujte přes QuickConnect

1. Otevřete: `http://alesDonin.quickconnect.to:5001/retrokredenc`
2. Nebo zkuste: `http://retrokredenc.alesDonin.quickconnect.to:5001/`

---

## 🔄 Alternativní řešení: Reverse Proxy na port 8080

Pokud nemůžete změnit port Web Portal na 80/443, použijte Reverse Proxy:

### Krok 1: Vytvořte Reverse Proxy rule

1. **Ovládací panel** → **Přihlašovací portál** → **Reverzní server proxy**
2. Klikněte **"Vytvořit"**
3. Nastavte:

**Source:**
- **Protokol:** `HTTP`
- **Hostname:** `alesDonin.quickconnect.to`
- **Port:** `5001`

**Destination:**
- **Protokol:** `HTTP`
- **Hostname:** `localhost`
- **Port:** `8080`

**Cesta (Path):**
- **Source:** `/retrokredenc`
- **Destination:** `/retrokredenc`

4. Klikněte **"Vytvořit"**

### Krok 2: Otestujte

1. Otevřete: `http://alesDonin.quickconnect.to:5001/retrokredenc`
2. Mělo by to fungovat

---

## 📝 Co zkuste nejdřív

**Nejjednodušší řešení:**
1. Upravte Web Portal: změňte port z **8080** na **80 / 443**
2. Otestujte: `http://alesDonin.quickconnect.to:5001/retrokredenc`

**Pokud to nefunguje:**
- Použijte Reverse Proxy (viz výše)

---

**Dejte mi vědět, jestli se vám podařilo změnit port na 80/443!**
