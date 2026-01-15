# 🧪 Jak otestovat web přes QuickConnect

Rychlý návod pro testování webu přes QuickConnect po nasazení na NAS.

---

## ✅ Před testováním

1. ✅ **Build proběhl:** `npm run build` dokončen
2. ✅ **Soubory zkopírované:** Obsah složky `out/` je v `web/retrokredenc` na NAS
3. ✅ **Web Station běží:** Služba "retrokredenc" má stav "Normální"
4. ✅ **QuickConnect aktivní:** ID `alesDonin` je aktivní

---

## 🧪 Test 1: Lokální test (ve vaší síti)

### Krok 1: Zjistěte IP adresu NAS

1. Otevřete **DSM** (DiskStation Manager)
2. **Ovládací panel** → **Síť** → **Síťové rozhraní**
3. Najděte **IPv4 adresu** (např. `10.0.0.25`)

### Krok 2: Otevřete web lokálně

V prohlížeči zadejte:

```
http://10.0.0.25/retrokredenc
```

*(Nahraďte `10.0.0.25` IP adresou vašeho NAS)*

**Co byste měli vidět:**
- ✅ Domovská stránka Retro Kredenc
- ✅ Obrázky se zobrazují
- ✅ Navigace funguje
- ✅ Produkty se zobrazují

**Pokud nefunguje:**
- Zkontrolujte, že Web Station běží
- Zkontrolujte, že soubory jsou v `web/retrokredenc`
- Zkuste: `http://10.0.0.25/` (bez `/retrokredenc`)

---

## 🌐 Test 2: QuickConnect test (z internetu)

### Krok 1: Otevřete QuickConnect URL

V prohlížeči zadejte:

```
https://alesDonin.quickconnect.to:5001/retrokredenc
```

**Nebo pokud HTTPS nefunguje:**

```
http://alesDonin.quickconnect.to:5001/retrokredenc
```

### Krok 2: Co byste měli vidět

- ✅ Domovská stránka Retro Kredenc
- ✅ Obrázky se zobrazují
- ✅ Navigace funguje
- ✅ Produkty se zobrazují

---

## 🔍 Kontrola, že vše funguje

### ✅ Kontrola 1: Obrázky se zobrazují

1. Otevřete web přes QuickConnect
2. Zkontrolujte, že hlavní obrázek kredencu se zobrazuje
3. Otevřete stránku Produkty
4. Zkontrolujte, že fotky produktů se zobrazují

**Pokud obrázky nejsou vidět:**
- Otevřete Developer Tools (F12)
- Záložka **Network**
- Obnovte stránku (F5)
- Podívejte se, které soubory se nenačítají (červeně)
- Zkontrolujte URL - měly by začínat `/retrokredenc/_next/` nebo `/retrokredenc/images/`

### ✅ Kontrola 2: Navigace funguje

1. Klikněte na **"Produkty"** v menu
2. Měli byste vidět seznam produktů
3. Klikněte na produkt
4. Měli byste vidět detail produktu s fotkami

**Pokud navigace nefunguje:**
- Zkontrolujte, že všechny soubory jsou v `web/retrokredenc`
- Zkontrolujte, že složka `_next` obsahuje JavaScript soubory

### ✅ Kontrola 3: CSS styly fungují

1. Web by měl mít správné barvy a rozložení
2. Text by měl být čitelný
3. Tlačítka by měla být viditelná

**Pokud styly nefungují:**
- Otevřete Developer Tools (F12)
- Záložka **Console**
- Podívejte se na chyby
- Zkontrolujte, že CSS soubory se načítají z `/retrokredenc/_next/`

---

## 🆘 Řešení problémů

### Problém: "ERR_TIMED_OUT"

**Co to znamená:**
- QuickConnect se nemůže připojit k vašemu NAS

**Řešení:**
1. Zkontrolujte, že QuickConnect je aktivní:
   - **Ovládací panel** → **QuickConnect**
   - Zkontrolujte, že je zaškrtnuté "Povolit QuickConnect"
2. Zkontrolujte firewall:
   - **Ovládací panel** → **Zabezpečení** → **Firewall**
   - Port 5001 musí být povolený
3. Zkuste znovu za 1-2 minuty (QuickConnect může potřebovat čas)

---

### Problém: "Page Not Found" nebo prázdná stránka

**Co to znamená:**
- Web Station nenašel soubory nebo Reverse Proxy není správně nastavený

**Řešení:**
1. Zkontrolujte Web Station:
   - **Web Station** → **Webová služba**
   - Služba "retrokredenc" musí mít stav "Normální"
   - Document Root musí být `web/retrokredenc`
2. Zkontrolujte soubory:
   - **File Station** → `web/retrokredenc`
   - Měli byste vidět `index.html`
   - Měli byste vidět složku `_next`
3. Zkontrolujte Reverse Proxy:
   - **Ovládací panel** → **Přihlašovací portál** → **Reverzní server proxy**
   - Rule "Retro Kredenc Web" musí existovat
   - Source port: `5001`
   - Destination port: `80`

---

### Problém: Web se zobrazí, ale obrázky/JS nefungují

**Co to znamená:**
- Cesty k souborům jsou špatné (basePath není správně nastavený)

**Řešení:**
1. Zkontrolujte `.env.local`:
   ```bash
   cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
   cat .env.local
   ```
   Mělo by obsahovat:
   ```
   NEXT_PUBLIC_BASE_PATH=/retrokredenc
   NEXT_PUBLIC_ASSET_PREFIX=/retrokredenc
   ```

2. Pokud `.env.local` neexistuje nebo je špatný:
   - Vytvořte/zkontrolujte `.env.local` (viz návod `JAK_OPRAVIT_CESTY_PRO_HOSTING.md`)
   - Znovu buildujte: `npm run build`
   - Znovu zkopírujte obsah `out/` na NAS

3. Zkontrolujte v prohlížeči (F12 → Network):
   - Jaké URL se snaží načíst?
   - Měly by začínat `/retrokredenc/_next/` nebo `/retrokredenc/images/`
   - Pokud začínají jen `/` nebo `/_next/`, basePath není správně nastavený

---

### Problém: Web funguje lokálně, ale ne přes QuickConnect

**Co to znamená:**
- Reverse Proxy není správně nastavený

**Řešení:**
1. Zkontrolujte Reverse Proxy:
   - **Ovládací panel** → **Přihlašovací portál** → **Reverzní server proxy**
   - Rule "Retro Kredenc Web" musí mít:
     - **Source:** `alesDonin.quickconnect.to:5001`
     - **Destination:** `localhost:80`
2. Pokud rule neexistuje:
   - Vytvořte nový rule (viz `JAK_NASTAVIT_QUICKCONNECT_PRO_KOLEGU.md`)

---

## ✅ Kontrolní seznam před sdílením s kolegou

- [ ] Lokální test funguje: `http://10.0.0.25/retrokredenc`
- [ ] QuickConnect test funguje: `https://alesDonin.quickconnect.to:5001/retrokredenc`
- [ ] Obrázky se zobrazují správně
- [ ] Navigace funguje (kliknutí na Produkty, Kontakt, atd.)
- [ ] CSS styly fungují (správné barvy, rozložení)
- [ ] JavaScript funguje (galerie produktů, formulář)
- [ ] Všechny stránky se načítají bez chyb

---

## 📝 URL pro sdílení s kolegou

Po úspěšném testování pošlete kolegovi tuto URL:

```
https://alesDonin.quickconnect.to:5001/retrokredenc
```

**Nebo pokud HTTPS nefunguje:**

```
http://alesDonin.quickconnect.to:5001/retrokredenc
```

---

## 💡 Tipy

1. **První připojení může trvat déle** - QuickConnect potřebuje navázat spojení
2. **Pokud něco nefunguje, zkuste obnovit stránku** (F5 nebo Cmd+R)
3. **Developer Tools (F12) jsou váš přítel** - zobrazí všechny chyby a problémy
4. **Vždy nejdřív otestujte lokálně** - pokud nefunguje lokálně, nebude fungovat ani přes QuickConnect

---

**Hotovo!** Pokud všechny testy projdou, můžete sdílet URL s kolegou. 🎉
