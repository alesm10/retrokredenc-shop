# 🚀 Jednoduché sdílení webu přes ngrok (5 minut)

Toto je **nejjednodušší a nejspolehlivější** způsob, jak sdílet web s kolegou. Funguje okamžitě a nevyžaduje složité nastavení NAS.

---

## ✅ Co potřebujete

- Web běžící lokálně na vašem počítači
- ngrok nainstalovaný (zdarma)
- 5 minut času

---

## 📋 Krok 1: Nainstalujte ngrok

### Na macOS:

```bash
brew install ngrok/ngrok/ngrok
```

### Nebo stáhněte z webu:

1. Jděte na: https://ngrok.com/download
2. Stáhněte verzi pro macOS
3. Rozbalte a přesuňte do `/usr/local/bin/` nebo kamkoliv do PATH

---

## 📋 Krok 2: Zaregistrujte se a získejte token

1. Jděte na: https://ngrok.com/signup
2. Vytvořte účet (zdarma)
3. Po přihlášení jděte na: https://dashboard.ngrok.com/get-started/your-authtoken
4. Zkopírujte **authtoken** (dlouhý řetězec)

---

## 📋 Krok 3: Přihlaste se do ngrok

V terminálu:

```bash
ngrok config add-authtoken VÁŠ-TOKEN-ZDE
```

Nahraďte `VÁŠ-TOKEN-ZDE` tokenem, který jste zkopírovali.

---

## 📋 Krok 4: Spusťte web lokálně

V jednom terminálu:

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
npm run dev
```

**Zapište si port** (obvykle 3000, 3001, nebo 3002) - uvidíte ho v terminálu.

---

## 📋 Krok 5: Spusťte ngrok

V **novém terminálu** (nechte první běžet):

```bash
ngrok http 3000
```

(Nahraďte `3000` portem, na kterém běží web)

---

## 📋 Krok 6: Zkopírujte URL

ngrok vytvoří URL jako:
```
https://xxxx-xx-xx-xx-xx.ngrok-free.app
```

**Zkopírujte tuto URL a pošlete kolegovi!**

---

## ✅ Hotovo!

Kolega může otevřít URL v prohlížeči a uvidí váš web.

**⚠️ Důležité:**
- URL platí, **dokud ngrok běží** (musíte nechat terminál otevřený)
- URL se mění při každém restartu (pro stálou URL potřebujete placený plán)
- Web je **neveřejný** - jen lidé s linkem mají přístup

---

## 🆘 Řešení problémů

### "authentication failed"
- Zkontrolujte, že jste použili správný authtoken
- Zkuste znovu: `ngrok config add-authtoken VÁŠ-TOKEN`

### "connection refused"
- Ujistěte se, že web běží (`npm run dev`)
- Zkontrolujte, že používáte správný port v ngrok

### URL se mění při každém restartu
- To je normální pro free plán
- Pro stálou URL potřebujete placený plán ngrok

---

## 💡 Tipy

1. **Pro dlouhodobé sdílení:** Použijte placený ngrok plán (stálá URL)
2. **Pro rychlé testování:** Free plán stačí
3. **Pro více lidí:** Sdílejte URL s kýmkoliv - funguje okamžitě

---

**Toto je nejjednodušší způsob!** Funguje okamžitě a nevyžaduje žádné nastavení NAS.
