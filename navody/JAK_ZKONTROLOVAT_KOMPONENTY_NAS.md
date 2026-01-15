# 🔍 Kontrola komponent pro Web Station a Reverse Proxy

Tento návod vám pomůže zkontrolovat, jestli máte všechny potřebné komponenty pro Web Station a Reverse Proxy.

---

## ✅ Co je potřeba pro Web Station

Při instalaci Web Station se automaticky nainstaluje:
- ✅ **Nginx** nebo **Apache** (web server)
- ✅ **PHP** (8.1, 8.2, nebo jiná verze)

---

## 🔍 Krok 1: Zkontrolujte Web Station komponenty

### 1.1 Otevřete Web Station

1. **Web Station** → **Přehled** (Overview)
2. V sekci **"Balíčky serveru backend"** zkontrolujte:

**Měli byste vidět:**
- ✅ **Nginx:** Stav "Normální" (zeleně)
- ✅ **PHP 8.2:** Stav "Normální" (zeleně)
- ✅ Nebo **Apache HTTP Server 2.4:** Stav "Normální" (zeleně)

**Pokud vidíte "Není nainstalováno":**
- Klikněte na ikonu šipky vedle služby
- Nainstalujte chybějící komponentu

### 1.2 Zkontrolujte stav Web Station

V **Přehled** zkontrolujte:
- ✅ **"Výchozí stav serveru:"** = "Normální" (zeleně)
- ✅ **"Stav webového portálu:"** = "Normální" (zeleně)

---

## 🔍 Krok 2: Zkontrolujte Reverse Proxy komponenty

### 2.1 Otevřete Login Portal

1. **Ovládací panel** → **Přihlašovací portál** (Login Portal)
2. Zkontrolujte, že záložka **"Reverzní server proxy"** (Reverse Proxy) je dostupná

**Pokud nevidíte "Přihlašovací portál":**
- Možná není nainstalovaný nebo není dostupný ve vaší verzi DSM
- Zkuste: **Ovládací panel** → **Systém** → **Přihlašovací portál**

### 2.2 Zkontrolujte Reverse Proxy rule

1. V **Přihlašovací portál** → **Reverzní server proxy**
2. Měli byste vidět rule "Retro Kredenc Web"
3. Klikněte na něj a zkontrolujte nastavení

---

## 🔍 Krok 3: Zkontrolujte, jestli Nginx/Apache běží

### 3.1 V Web Station

1. **Web Station** → **Přehled**
2. V sekci **"Balíčky serveru backend"** zkontrolujte:
   - **Nginx** nebo **Apache** by měl mít stav "Normální"

### 3.2 V Package Center

1. **Package Center** → **Nainstalováno** (Installed)
2. Zkontrolujte, že vidíte:
   - ✅ **Web Station**
   - ✅ **Nginx** (nebo Apache)
   - ✅ **PHP 8.2** (nebo jiná verze)

**Pokud něco chybí:**
- Klikněte na balíček
- Klikněte **"Otevřít"** nebo **"Spustit"**

---

## 🔍 Krok 4: Zkontrolujte oprávnění složky

### 4.1 Zkontrolujte oprávnění pro `web/retrokredenc`

1. **File Station** → otevřete složku `web`
2. Klikněte pravým tlačítkem na složku `retrokredenc`
3. **Vlastnosti** (Properties) → **Oprávnění** (Permissions)
4. Zkontrolujte:
   - ✅ **http** nebo **httpd** má oprávnění **Read** (nebo Read/Write)
   - ✅ **www** má oprávnění **Read** (nebo Read/Write)

**Pokud chybí oprávnění:**
- Klikněte **"Upravit"** (Edit)
- Přidejte uživatele **http** nebo **httpd** s oprávněním **Read**
- Uložte

---

## 🔍 Krok 5: Zkontrolujte logy

### 5.1 Logy Web Station

1. **Web Station** → **Přehled**
2. Podívejte se, jestli tam nejsou nějaké chybové zprávy

### 5.2 Logy Reverse Proxy

1. **Ovládací panel** → **Přihlašovací portál** → **Reverzní server proxy**
2. Klikněte na rule "Retro Kredenc Web"
3. Možná uvidíte logy nebo chyby

---

## 🆘 Co zkontrolovat, pokud to stále nefunguje

### 1. Restartujte služby

1. **Web Station** → **Webová služba**
2. Klikněte na službu "retrokredenc"
3. Klikněte **"Akce"** (Actions) → **"Zastavit"** (Stop)
4. Počkejte chvíli
5. Klikněte **"Akce"** → **"Spustit"** (Start)

### 2. Restartujte Nginx/Apache

1. **Web Station** → **Přehled**
2. V sekci **"Balíčky serveru backend"** klikněte na ikonu vedle **Nginx** (nebo Apache)
3. Zkuste restartovat službu

### 3. Zkontrolujte firewall

1. **Ovládací panel** → **Zabezpečení** → **Firewall**
2. Zkontrolujte, že port **80** a **5001** jsou povolené

### 4. Zkuste jiný port

Možná port 80 je obsazený jinou službou:
1. **Web Station** → **Webová služba** → **"retrokredenc"** → **"Upravit"**
2. Zkuste změnit port na **8080** (nebo jiný volný port)
3. V Reverse Proxy změňte **Destination Port** na **8080**

---

## 📝 Kontrolní seznam

Projděte si tento seznam:

- [ ] Web Station je nainstalovaný
- [ ] Nginx (nebo Apache) je nainstalovaný a běží (stav "Normální")
- [ ] PHP je nainstalované (stav "Normální")
- [ ] Web Station služba "retrokredenc" má stav "Normální"
- [ ] Složka `web/retrokredenc` má správná oprávnění (http/httpd má Read)
- [ ] Reverse Proxy rule je vytvořený a aktivní
- [ ] Firewall povoluje porty 80 a 5001
- [ ] Lokální přístup funguje: `http://10.0.0.25/retrokredenc`

---

**Postupujte krok za krokem a u každého kroku mi dejte vědět, co vidíte!**
