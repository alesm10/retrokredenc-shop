# 🔧 Oprava: ngrok se připojuje na špatný port

## Problém

Chyba `ERR_NGROK_8012` znamená, že ngrok se snaží připojit k `http://localhost:80`, ale váš web **neběží na portu 80**.

Next.js web běží obvykle na portu **3000, 3001, nebo 3002** (ne na 80!).

---

## Řešení

### Krok 1: Zjistěte, na jakém portu běží web

Podívejte se do terminálu, kde jste spustili `npm run dev`. Měli byste vidět zprávu:

```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in Xms
```

Zapište si číslo portu (např. **3000**, **3001**, nebo **3002**).

---

### Krok 2: Zastavte současný ngrok

V terminálu, kde běží ngrok:
- Stiskněte **`Ctrl + C`** (zastaví ngrok)

---

### Krok 3: Spusťte ngrok se SPRÁVNÝM portem

```bash
# Nahraďte 3000 portem, na kterém skutečně běží web
ngrok http 3000
```

**Příklady:**
- Pokud web běží na portu 3000: `ngrok http 3000`
- Pokud web běží na portu 3001: `ngrok http 3001`
- Pokud web běží na portu 3002: `ngrok http 3002`

---

### Krok 4: Zkopírujte novou URL

ngrok vytvoří novou URL (např. `https://xxxx-xx-xx-xx.ngrok-free.app`).

**Zkopírujte tuto URL a pošlete kolegovi.**

---

## Kompletní postup

```bash
# 1. Zjistěte port z terminálu, kde běží npm run dev
# (Obvykle: 3000, 3001, nebo 3002)

# 2. V terminálu s ngrok stiskněte Ctrl+C (zastavte ngrok)

# 3. Spusťte ngrok se správným portem
ngrok http 3000

# 4. Zkopírujte novou URL z ngrok
# 5. Pošlete kolegovi
```

---

## Jak zkontrolovat, na jakém portu web běží

### Metoda 1: Podívejte se do terminálu
V terminálu, kde běží `npm run dev`, hledejte:
```
- Local:        http://localhost:XXXX
```

### Metoda 2: Zkuste otevřít v prohlížeči
- `http://localhost:3000` - zkuste otevřít
- Pokud nefunguje, zkuste `http://localhost:3001`
- Nebo `http://localhost:3002`

### Metoda 3: Příkaz v terminálu
```bash
# Zkontrolujte, který port je obsazený
lsof -i :3000
lsof -i :3001
lsof -i :3002
```

---

## Časté chyby

**Chyba: "connection refused"**
- ✅ Ujistěte se, že web běží (`npm run dev`)
- ✅ Použijte správný port v ngrok

**Chyba: "port already in use"**
- ✅ Zkuste jiný port pro ngrok (ale to není nutné)
- ✅ Hlavní je použít správný port, kde běží web

**Chyba: "ngrok not found"**
- ✅ Ujistěte se, že ngrok je nainstalovaný: `brew install ngrok/ngrok/ngrok`

---

## Tip

**Pro snadnější práci můžete vytvořit alias:**

V terminálu přidejte do `~/.bashrc` nebo `~/.zshrc`:
```bash
alias ngrok-dev='ngrok http 3000'
```

Pak stačí napsat:
```bash
ngrok-dev
```

---

**Řekněte mi, na jakém portu web běží (měli byste to vidět v terminálu s npm run dev), a já vám pomůžu spustit ngrok správně!**
