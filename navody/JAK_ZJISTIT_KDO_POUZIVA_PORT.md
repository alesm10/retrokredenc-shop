# 🔍 Jak zjistit, kdo používá port 5001

Tento návod vám ukáže, jak zjistit, která služba používá port 5001 na vašem NAS.

---

## 📋 Krok 1: Zkontrolujte v Informačním centru

1. **Ovládací panel** → **Informační centrum** (Info Center)
2. Klikněte na záložku **"Služba"** (Service)
3. V tabulce najděte služby, které používají port **5001**

**Měli byste vidět:**
- **DSM** nebo **Synology DiskStation Manager** - port 5001 (HTTPS)

Port 5001 je standardní port pro **DSM HTTPS** a **QuickConnect**.

---

## 📋 Krok 2: Zkontrolujte v síťových nastaveních

1. **Ovládací panel** → **Síť** → **Síťové rozhraní**
2. Zkontrolujte aktivní síťová rozhraní
3. Port 5001 by měl být používán DSM

---

## 📋 Krok 3: Zkontrolujte přes SSH (pokud máte přístup)

Pokud máte SSH přístup, můžete použít:

```bash
sudo netstat -tulpn | grep 5001
```

Nebo:

```bash
sudo lsof -i :5001
```

---

## ✅ Odpověď

**Port 5001 používá:**
- ✅ **DSM (Synology DiskStation Manager)** - HTTPS přístup
- ✅ **QuickConnect** - automaticky používá port 5001 pro HTTPS

To je **normální a správné** - port 5001 je rezervovaný pro DSM.

---

## 🔧 Problém s Reverse Proxy

Problém je, že **Reverse Proxy nemůže použít port 5001 jako Source port**, protože ten port už používá DSM/QuickConnect.

**Řešení:**
- Reverse Proxy **nemůže** používat port 5001 jako Source
- QuickConnect automaticky přesměrovává na port 5001
- Potřebujeme jiný přístup

---

## 💡 Správné řešení

Protože port 5001 je používán DSM, Reverse Proxy musí fungovat **jinak**. 

**Správné nastavení Reverse Proxy:**
- **Source:** QuickConnect automaticky přesměrovává na port 5001, ale Reverse Proxy by měl **zachytit požadavky na cestu `/retrokredenc`**
- **Destination:** `localhost:80` (Web Station)

**Problém může být v tom, že:**
- Reverse Proxy neřeší cesty správně
- Nebo potřebujeme použít jiný přístup

---

## 🔄 Alternativní řešení

Místo použití portu 5001 v Reverse Proxy Source, zkuste:

1. **Použít Web Portal** místo Reverse Proxy
2. **Nebo přesunout soubory do rootu** (jak jsem navrhl dříve)
3. **Nebo použít jiný port** pro web (ale pak nebude fungovat přes QuickConnect)

---

**Závěr:** Port 5001 používá DSM/QuickConnect - to je normální. Problém je v tom, jak Reverse Proxy řeší cesty.
