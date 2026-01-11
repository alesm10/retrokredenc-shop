# 🔧 Řešení problému "Operation not permitted"

Pokud vidíte chybu "Operation not permitted (os error 1)", zkuste následující řešení:

## Řešení 1: Zkuste znovu spustit server

1. Zastavte server (pokud běží): Stiskněte `Ctrl + C` v terminálu
2. Smažte cache:
   ```bash
   cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
   rm -rf .next
   ```
3. Spusťte znovu:
   ```bash
   npm run dev
   ```

## Řešení 2: Zkontrolujte oprávnění

Problém může být s oprávněními k souborům. Zkuste:

```bash
cd "/Volumes/Data/Cursor vibecoding/retrokredenc"
chmod -R u+rw node_modules
```

## Řešení 3: Přesunout projekt (Pokud problém přetrvává)

Pokud problém přetrvává kvůli mezerám v cestě, můžete přesunout projekt:

1. Vytvořte novou složku bez mezer:
   ```bash
   mkdir ~/retrokredenc
   ```
2. Zkopírujte projekt:
   ```bash
   cp -R "/Volumes/Data/Cursor vibecoding/retrokredenc" ~/retrokredenc
   ```
3. Pracujte z nové složky:
   ```bash
   cd ~/retrokredenc
   npm install
   npm run dev
   ```

## Řešení 4: Použít jiný port

Pokud port 3000 je obsazený:

```bash
PORT=3001 npm run dev
```

Pak otevřete: http://localhost:3001

## Kontakt

Pokud problém přetrvává, kontaktujte správce projektu s chybovou zprávou.
