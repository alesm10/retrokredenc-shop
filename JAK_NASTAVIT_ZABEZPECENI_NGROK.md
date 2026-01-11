# 🔒 Jak nastavit zabezpečení ngrok tunelu

## Rychlá odpověď: Pro sdílení s kolegou NENÍ nutné nastavovat zabezpečení

URL z ngrok je **náhodně generovaná** a není veřejně známá. Kdo nemá link, nemůže se na web dostat.

**Stačí:**
- ✅ Sdílet URL pouze s kolegou
- ✅ URL se mění při každém restartu (pro další úroveň bezpečnosti)

---

## Volitelné: Jednoduché zabezpečení (pokud chcete)

Pokud chcete ještě více zabezpečit přístup, můžete použít:

### Možnost 1: IP Adresa Restriction (Nejjednodušší)

**Jak to funguje:**
- Povolíte přístup jen z IP adresy kolegy
- Ostatní se na web nedostanou

**Jak na to:**

1. **Získejte IP adresu kolegy:**
   - Kolega jde na: https://whatismyipaddress.com/
   - Zkopíruje si svoji IP adresu

2. **V ngrok Dashboard:**
   - Jděte na: https://dashboard.ngrok.com/cloud-edge/tcp-edge-editor
   - Nebo v terminálu použijte:
   ```bash
   ngrok http 3000 --domain=valorie-enabling-kristeen.ngrok-free.dev
   ```
   - Pak v Dashboard → **IP Restrictions** → Přidejte IP adresu kolegy

**Výhody:**
- ✅ Jen kolega s danou IP může přistupovat
- ✅ Ostatní jsou automaticky blokováni

**Nevýhody:**
- ❌ Pokud kolega změní IP (jiná síť), nebude fungovat
- ❌ Vyžaduje statickou IP (nebo dynamickou, kterou aktualizujete)

---

### Možnost 2: Základní HTTP Autentizace (Jednoduché heslo)

**Jak to funguje:**
- Přidáte uživatelské jméno a heslo
- Při otevření webu se zobrazí přihlašovací okno
- Kolega zadá heslo a dostane se na web

**Jak na to:**

```bash
# Zastavte současný ngrok (Ctrl+C)

# Spusťte ngrok s autentizací
ngrok http 3000 --basic-auth="uživatelské-jméno:heslo"
```

**Příklad:**
```bash
ngrok http 3000 --basic-auth="kolega:moje-heslo-123"
```

**Pak:**
- Kolega otevře URL
- Zobrazí se okno: "Sign in" (Přihlásit se)
- Zadeje: `kolega` / `moje-heslo-123`
- Web se zobrazí

**Výhody:**
- ✅ Jednoduché heslo
- ✅ Funguje z jakékoliv sítě
- ✅ Snadno se nastaví

---

### Možnost 3: Ignorovat zabezpečení (doporučeno pro testování)

**Pro sdílení s kolegou stačí:**
- ✅ URL je náhodně generovaná (neveřejná)
- ✅ Sdílejte URL pouze s kolegou
- ✅ Po ukončení testování tunnel ukončete (Ctrl+C)

**To je bezpečné, protože:**
- Nikdo jiný URL nezná
- URL je dlouhá a náhodná
- Po ukončení ngrok už URL nefunguje

---

## Co dělat teď?

### Pro rychlé sdílení (doporučeno):

1. **Zkopírujte URL z terminálu:**
   ```
   https://valorie-enabling-kristeen.ngrok-free.dev
   ```

2. **Pošlete kolegovi:**
   - Email, WhatsApp, SMS, atd.
   - Kolega otevře URL v prohlížeči
   - Web se zobrazí!

3. **Hotovo!** ✅

---

### Pokud chcete přidat heslo (volitelné):

1. **Zastavte ngrok:** Stiskněte `Ctrl + C` v terminálu, kde běží ngrok

2. **Spusťte s heslem:**
   ```bash
   ngrok http 3000 --basic-auth="kolega:heslo123"
   ```
   (Nahraďte `kolega` a `heslo123` vlastními hodnotami)

3. **Nová URL:**
   - ngrok vytvoří novou URL
   - Zkopírujte ji a pošlete kolegovi
   - Kolega zadá heslo při otevření

---

## Důležité poznámky:

⚠️ **URL se mění při každém restartu ngrok:**
- Při každém spuštění `ngrok http 3000` dostanete novou URL
- Pokud chcete stejnou URL, potřebujete placený plán ngrok

⚠️ **URL platí, dokud ngrok běží:**
- Pokud ukončíte ngrok (Ctrl+C), URL přestane fungovat
- Pro trvalý přístup potřebujete ngrok nechat běžet

⚠️ **Free plán má limity:**
- URL se mění při každém restartu
- Můžete mít jen jeden aktivní tunnel
- Pro statickou URL potřebujete placený plán

---

## Moje doporučení:

**Pro testování s kolegou:**
- ✅ Použijte URL bez dalšího zabezpečení
- ✅ Sdílejte URL pouze s kolegou
- ✅ Po testování ngrok ukončete

**Pro dlouhodobé použití:**
- Zvažte Cloudflare Tunnel (statická URL)
- Nebo Synology QuickConnect (pokud máte NAS)
- Nebo GitHub Pages s privátním repo

---

**Co teď udělat:**
1. Zkopírujte URL: `https://valorie-enabling-kristeen.ngrok-free.dev`
2. Pošlete kolegovi
3. Kolega otevře v prohlížeči
4. Hotovo! 🎉

**Potřebujete přidat heslo?** Dejte vědět a nastavím to!
