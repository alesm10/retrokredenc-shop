# 🔧 Oprava: Web se dlouho načítá přes QuickConnect

Tento návod vám pomůže opravit problém s dlouhým načítáním webu přes QuickConnect.

---

## 🔍 Problém

- Web Portal je vytvořený ✅
- Firewall není zapnutý ✅
- Web se lokálně načítá rychle ✅
- Ale přes QuickConnect se načítá dlouho nebo vůbec ❌

---

## ✅ Řešení krok za krokem

### Krok 1: Otestujte Web Portal lokálně

1. Otevřete v prohlížeči: `http://10.0.0.25/retrokredenc`
   - (Nahraďte `10.0.0.25` IP adresou vašeho NAS)
2. **Funguje to rychle?**
   - Pokud ano → problém je v QuickConnect/Reverse Proxy
   - Pokud ne → problém je v Web Portal

### Krok 2: Zkontrolujte Web Portal nastavení

1. **Web Station** → **Webový portál** (Web Portal)
2. Klikněte na portál **"retrokredenc"**
3. Klikněte **"Upravit"** (Edit)
4. Zkontrolujte:
   - **Služba:** `retrokredenc`
   - **Název hostitele:** `retrokredenc`
   - **Port:** `80 / 443` (zaškrtnuté)

### Krok 3: Zkuste různé URL formáty

Zkuste otevřít tyto URL v prohlížeči:

1. `http://alesDonin.quickconnect.to:5001/retrokredenc`
2. `http://retrokredenc.alesDonin.quickconnect.to:5001/`
3. `http://alesDonin.quickconnect.to/retrokredenc` (bez portu)
4. `http://10.0.0.25/retrokredenc` (lokálně - pro srovnání)

**Která z nich funguje?**

### Krok 4: Zkontrolujte Reverse Proxy

1. **Ovládací panel** → **Přihlašovací portál** → **Reverzní server proxy**
2. Zkontrolujte, jestli tam je rule "Retro Kredenc Web"
3. Pokud je, klikněte na něj a zkontrolujte nastavení

**Možná je problém v tom, že:**
- Reverse Proxy a Web Portal se konfliktují
- Nebo Reverse Proxy není správně nastavený

### Krok 5: Zkuste smazat Reverse Proxy rule

1. **Ovládací panel** → **Přihlašovací portál** → **Reverzní server proxy**
2. Pokud tam je rule "Retro Kredenc Web", smažte ho
3. Web Portal by měl fungovat samostatně
4. Otestujte: `http://alesDonin.quickconnect.to:5001/retrokredenc`

---

## 🔄 Alternativní řešení

### Možnost 1: Použít jen Web Portal (bez Reverse Proxy)

Web Portal by měl fungovat samostatně. Zkuste:

1. Smažte Reverse Proxy rule (pokud existuje)
2. Otestujte Web Portal přímo: `http://alesDonin.quickconnect.to:5001/retrokredenc`

### Možnost 2: Přesunout soubory do rootu

1. Zkopírujte soubory z `web/retrokredenc` do `web` (root)
2. Upravte Web Station službu: Document Root = `web`
3. Upravte Web Portal: Služba = výchozí služba
4. URL bude: `http://alesDonin.quickconnect.to:5001/`

---

## 🧪 Diagnostika

### Zkontrolujte logy

1. **Web Station** → **Přehled**
2. Podívejte se, jestli tam nejsou chybové zprávy
3. Nebo zkuste restartovat službu "retrokredenc"

### Zkontrolujte, jestli Web Portal běží

1. **Web Station** → **Webový portál**
2. Zkontrolujte, že portál "retrokredenc" má stav "Normální"

---

## 📝 Co zkuste nejdřív

1. **Smažte Reverse Proxy rule** (pokud existuje)
2. **Otestujte Web Portal:** `http://alesDonin.quickconnect.to:5001/retrokredenc`
3. **Pokud to nefunguje, zkuste:** `http://retrokredenc.alesDonin.quickconnect.to:5001/`

**Dejte mi vědět, co vidíte!**
