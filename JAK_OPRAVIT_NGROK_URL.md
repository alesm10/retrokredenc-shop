# 🔧 Oprava ngrok URL

## Problém

Ngrok vytvořil URL: `https://valorie-enabling-kristeen.ngrok-free.dev`, ale pokud vidíte chybu `ERR_NGROK_8012`, znamená to, že ngrok se snaží připojit k špatnému portu.

---

## Rychlé řešení

### Krok 1: Zastavte současný ngrok

V terminálu, kde běží ngrok:
- Stiskněte **`Ctrl + C`**

### Krok 2: Zjistěte, na jakém portu běží web

Podívejte se do terminálu, kde běží `npm run dev`. Měli byste vidět:

```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000    ← TOHLE JE PORT
  - Ready in Xms
```

**Zapište si číslo portu** (např. **3000**, **3001**, nebo **3002**).

### Krok 3: Spusťte ngrok se SPRÁVNÝM portem

```bash
# Nahraďte 3000 portem, na kterém skutečně běží web
ngrok http 3000
```

**Příklad:**
- Pokud web běží na `localhost:3000` → `ngrok http 3000`
- Pokud web běží na `localhost:3001` → `ngrok http 3001`
- Pokud web běží na `localhost:3002` → `ngrok http 3002`

### Krok 4: Zkopírujte novou URL

ngrok vytvoří **novou URL** (jinou než předtím).

**Zkopírujte tuto URL a pošlete kolegovi.**

---

## Kompletní postup (krok za krokem)

**Terminál 1 (nechte běžet):**
```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
npm run dev
```
→ Zapište si port (např. 3000, 3001, 3002)

**Terminál 2:**
```bash
# 1. Zastavte starý ngrok (pokud běží): Ctrl+C

# 2. Spusťte ngrok se správným portem (nahraďte XXXX portem z terminálu 1)
ngrok http XXXX

# 3. Zkopírujte novou URL (např. https://xxxx.ngrok-free.app)
```

**Terminál 3 (nebo prohlížeč):**
- Otevřete URL z terminálu 2
- Měli byste vidět váš web!

---

## Ověření, že to funguje

### Ověřte lokálně:
1. Otevřete v prohlížeči: `http://localhost:3000` (nebo 3001/3002)
2. Měli byste vidět váš Retro Kredenc web

### Ověřte přes ngrok:
1. Zkopírujte URL z ngrok terminálu
2. Otevřete v prohlížeči
3. Měli byste vidět stejný web

---

## Co když to stále nefunguje?

### Zkontrolujte, že web běží:
```bash
# Zkuste otevřít lokálně:
open http://localhost:3000
```

### Zkontrolujte, že ngrok používá správný port:
- V ngrok terminálu byste měli vidět: `Forwarding https://xxxx → http://localhost:XXXX`
- `XXXX` musí být stejný port, na kterém běží web

### Zkuste restartovat:
1. Zastavte ngrok: `Ctrl + C`
2. Zastavte web: `Ctrl + C` (v terminálu s npm run dev)
3. Spusťte znovu web: `npm run dev`
4. Zapište si port
5. Spusťte ngrok: `ngrok http [PORT]`

---

## Tip

**Pro snadnější práci můžete zkontrolovat port v terminálu:**

V terminálu, kde běží `npm run dev`, hledejte řádek:
```
  - Local:        http://localhost:XXXX
```

Toto **XXXX** je port, který musíte použít v ngrok!

---

**Zkuste to prosím a dejte mi vědět, na jakém portu web běží (měli byste to vidět v terminálu s npm run dev)!**
