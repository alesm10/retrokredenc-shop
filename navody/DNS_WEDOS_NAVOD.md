# 🌐 Podrobný návod: Nastavení DNS u Wedos pro GitHub Pages

Tento návod vám krok za krokem ukáže, jak nastavit DNS záznamy u Wedos pro vaši doménu retrokredenc.cz, aby fungovala s GitHub Pages.

---

## 📋 Co budeme nastavovat

Pro GitHub Pages potřebujeme nastavit:

1. **4 A záznamy** pro root doménu (`retrokredenc.cz`)
   - IP adresy GitHub Pages:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

2. **CNAME záznam** pro www subdoménu (`www.retrokredenc.cz`) - volitelné
   - Hodnota: `vas-username.github.io`

---

## 🔑 Krok 1: Přihlášení do Wedos

1. Otevřete webový prohlížeč (Chrome, Safari, Firefox, atd.)
2. Jděte na: **https://client.wedos.com/**
3. Přihlaste se pomocí svých přihlašovacích údajů (email a heslo)

**Pokud si nepamatujete heslo:**
- Klikněte na "Zapomněli jste heslo?"
- Postupujte podle instrukcí pro obnovení hesla

---

## 📁 Krok 2: Otevření DNS zóny

1. Po přihlášení uvidíte hlavní stránku klienta Wedos
2. V levém menu najděte a klikněte na **"DNS zóny"** (nebo **"DNS zones"**)
3. Uvidíte seznam všech vašich domén
4. Najděte doménu **retrokredenc.cz** v seznamu
5. Klikněte na ni (nebo klikněte na ikonu tužky/ozubeného kolečka pro úpravu)

**Vzhled rozhraní se může lišit podle verze, ale struktura je podobná:**
- Obvykle uvidíte seznam záznamů s kolonkami: Název, Typ, Hodnota, TTL
- Nebo možná uvidíte tlačítko "Upravit DNS záznamy" nebo "Edit DNS records"

---

## ➕ Krok 3: Přidání A záznamů

### 3.1 Přidání prvního A záznamu

1. Najděte tlačítko **"Přidat záznam"** nebo **"Add record"** (obvykle v horní části stránky)
2. Klikněte na něj
3. Vyplňte formulář:
   - **Název/Host/Name:** Zadejte `@` (zavináč) nebo **ponechte prázdné** - to znamená root doménu (retrokredenc.cz bez www)
   - **Typ/Type:** Vyberte **`A`** z dropdown menu
   - **Hodnota/Value/IP adresa:** Zadejte `185.199.108.153`
   - **TTL:** Ponechte výchozí hodnotu (obvykle `3600`) nebo zadejte `3600`
4. Klikněte **"Uložit"**, **"Přidat"**, nebo **"Save"**

### 3.2 Přidání druhého A záznamu

1. Znovu klikněte **"Přidat záznam"**
2. Vyplňte:
   - **Název/Host:** `@` (nebo prázdné)
   - **Typ:** `A`
   - **Hodnota:** `185.199.109.153`
   - **TTL:** `3600`
3. Klikněte **"Uložit"**

### 3.3 Přidání třetího A záznamu

1. Znovu klikněte **"Přidat záznam"**
2. Vyplňte:
   - **Název/Host:** `@` (nebo prázdné)
   - **Typ:** `A`
   - **Hodnota:** `185.199.110.153`
   - **TTL:** `3600`
3. Klikněte **"Uložit"**

### 3.4 Přidání čtvrtého A záznamu

1. Znovu klikněte **"Přidat záznam"**
2. Vyplňte:
   - **Název/Host:** `@` (nebo prázdné)
   - **Typ:** `A`
   - **Hodnota:** `185.199.111.153`
   - **TTL:** `3600`
3. Klikněte **"Uložit"**

### 3.5 Ověření

Měli byste nyní vidět **4 A záznamy** v seznamu DNS záznamů, všechny s:
- **Název:** `@` (nebo prázdné)
- **Typ:** `A`
- **Hodnota:** Jedna z GitHub Pages IP adres (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)

---

## 🌐 Krok 4: Přidání CNAME záznamu pro www (volitelné)

Pokud chcete, aby `www.retrokredenc.cz` také fungovala (doporučeno):

### Možnost A: CNAME záznam (jednodušší)

1. Klikněte **"Přidat záznam"**
2. Vyplňte:
   - **Název/Host:** `www`
   - **Typ:** Vyberte **`CNAME`** z dropdown menu
   - **Hodnota/Value/Target:** Zadejte `vas-username.github.io` (nahraďte `vas-username` vaším skutečným GitHub uživatelským jménem)
     - **Příklad:** Pokud je vaše GitHub jméno `alesmiclik`, zadejte: `alesmiclik.github.io`
   - **TTL:** `3600`
3. Klikněte **"Uložit"**

**Poznámka:** CNAME hodnotu můžete upravit později, až zjistíte své GitHub uživatelské jméno.

### Možnost B: A záznamy pro www (alternativa)

Místo CNAME můžete přidat 4 A záznamy pro `www` se stejnými IP adresami:

1. Přidejte 4 záznamy stejným způsobem jako výše, ale:
   - **Název/Host:** `www` (místo `@`)
   - **Typ:** `A`
   - **Hodnota:** Jedna z 4 GitHub Pages IP adres (každý záznam jinou IP)

---

## 💾 Krok 5: Uložení změn

1. Zkontrolujte, že všechny záznamy jsou správně přidané
2. Najděte tlačítko **"Uložit změny"**, **"Apply"**, **"Save"**, nebo podobné
3. Klikněte na něj
4. Počkejte na potvrzení, že změny byly uloženy

**Některé systémy ukládají změny automaticky** - v tom případě jen zkontrolujte, že záznamy zůstaly v seznamu.

---

## ✅ Krok 6: Kontrola záznamů

Před odchodem zkontrolujte, že:

- ✅ Máte **4 A záznamy** pro `@` (root doménu)
- ✅ Každý A záznam má jednu z GitHub Pages IP adres:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- ✅ Máte **CNAME záznam** pro `www` (pokud jste ho přidali)
- ✅ Všechny záznamy mají TTL 3600 (nebo výchozí hodnotu)

**Výsledek by měl vypadat přibližně takto:**

```
@    A    185.199.108.153    3600
@    A    185.199.109.153    3600
@    A    185.199.110.153    3600
@    A    185.199.111.153    3600
www  CNAME vas-username.github.io  3600
```

---

## ⏱️ Krok 7: Propagace DNS

**Důležité:** DNS změny se neprojeví okamžitě!

- ⏱️ **Typická doba propagace:** 5-30 minut
- ⏱️ **Maximální doba propagace:** až 24-48 hodin
- 🌍 **Propagace probíhá postupně** po celém internetu

**Co můžete udělat:**
- Počkejte 30 minut a zkuste otevřít web v prohlížeči
- Nebo použijte nástroje pro kontrolu DNS propagace (viz Krok 8)

---

## 🔍 Krok 8: Kontrola DNS propagace

### Online kontrola:

1. Jděte na: **https://www.whatsmydns.net/**
2. Do vyhledávacího pole zadejte: `retrokredenc.cz`
3. Vyberte typ záznamu: **A**
4. Klikněte "Search"
5. Měli byste vidět 4 IP adresy GitHub Pages z různých míst na světě

**Pokud vidíte správné IP adresy ze všech míst = DNS je propagováno!**

### Kontrola v terminálu (Mac):

Otevřete Terminal a zadejte:

```bash
dig retrokredenc.cz
```

**Co hledat:**
- V sekci "ANSWER SECTION" byste měli vidět 4 A záznamy s GitHub Pages IP adresami
- Vypadá to přibližně takto:
```
;; ANSWER SECTION:
retrokredenc.cz.     3600    IN      A       185.199.108.153
retrokredenc.cz.     3600    IN      A       185.199.109.153
retrokredenc.cz.     3600    IN      A       185.199.110.153
retrokredenc.cz.     3600    IN      A       185.199.111.153
```

---

## 🐛 Řešení problémů

### Problém: Nevidím tlačítko "Přidat záznam"

**Řešení:**
- Zkuste najít tlačítko s názvem "Add record", "New record", "Vytvořit záznam"
- Některé rozhraní má ikonu `+` (plus) pro přidání záznamu
- Možná je potřeba kliknout na doménu pro detail a pak na "Edit" nebo "Upravit"

### Problém: Nevíte, jaký je váš GitHub username

**Řešení:**
- GitHub username najdete v pravém horním rohu na GitHub.com (po přihlášení)
- Nebo můžete použít A záznamy místo CNAME (viz Možnost B výše)
- CNAME můžete přidat nebo upravit později

### Problém: DNS záznamy se nezobrazují po přidání

**Řešení:**
- Zkuste obnovit stránku (F5 nebo Cmd+R)
- Zkontrolujte, že jste klikli "Uložit" nebo "Save"
- Některé systémy vyžadují kliknout "Apply changes" nebo podobné tlačítko navíc

### Problém: DNS se nepropaguje

**Řešení:**
- Počkejte 24-48 hodin (obvykle stačí 30 minut)
- Zkontrolujte, že záznamy jsou správně nastavené u Wedos
- Zkuste vymazat DNS cache v prohlížeči (nebo použijte anonymní režim)

---

## 📞 Potřebujete pomoc?

- **Wedos podpora:** https://kb.wedos.com/ nebo kontaktujte Wedos podporu
- **GitHub Pages dokumentace:** https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- **Kontrola DNS:** https://www.whatsmydns.net/

---

## ✅ Hotovo!

Pokud jste nastavili všechny 4 A záznamy a ověřili, že jsou správně uložené, máte hotovo!

**Další krok:** Pokračujte návodem v `NASTAVENI_HOSTINGU.md` - Fáze 2: Vytvoření GitHub repository.

---

**Poznámka:** Tento návod je specifický pro Wedos. Pokud máte doménu u jiného poskytovatele (např. Active24, Forpsi, atd.), proces je podobný, ale rozhraní se může lišit. Princip zůstává stejný - potřebujete 4 A záznamy s GitHub Pages IP adresami.
