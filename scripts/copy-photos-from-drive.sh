#!/bin/bash

# Skript pro automatické kopírování fotek z Google Drive do public/products/
# Použití: Spusťte každých 5 minut pomocí crontab nebo Task Scheduler

# Cesta k Google Drive složce (UPRAVTE podle vašeho nastavení)
DRIVE_FOLDER="$HOME/Google Drive/Retro Kredenc - Fotky produktů"

# Cesta k projektu (UPRAVTE podle vašeho nastavení)
PROJECT_FOLDER="/Volumes/Data/Cursor vibecoding/retrokredenc/public/products"

# Soubor pro sledování poslední synchronizace
LAST_SYNC_FILE="$PROJECT_FOLDER/.last-sync"

# Zkontrolujte, zda Google Drive složka existuje
if [ ! -d "$DRIVE_FOLDER" ]; then
    echo "Chyba: Google Drive složka neexistuje: $DRIVE_FOLDER"
    echo "Zkontrolujte cestu ve skriptu nebo vytvořte složku na Google Drive."
    exit 1
fi

# Zkontrolujte, zda projektová složka existuje
if [ ! -d "$PROJECT_FOLDER" ]; then
    echo "Chyba: Projektová složka neexistuje: $PROJECT_FOLDER"
    echo "Zkontrolujte cestu ve skriptu."
    exit 1
fi

# Vytvořte soubor pro sledování, pokud neexistuje
if [ ! -f "$LAST_SYNC_FILE" ]; then
    touch "$LAST_SYNC_FILE"
fi

# Počet zkopírovaných souborů
COPIED=0

# Najděte a zkopírujte všechny nové fotky
find "$DRIVE_FOLDER" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -newer "$LAST_SYNC_FILE" | while read -r file; do
    filename=$(basename "$file")
    dest="$PROJECT_FOLDER/$filename"
    
    # Zkopírujte soubor
    cp "$file" "$dest"
    
    if [ $? -eq 0 ]; then
        echo "✓ Zkopírováno: $filename"
        COPIED=$((COPIED + 1))
    else
        echo "✗ Chyba při kopírování: $filename"
    fi
done

# Aktualizujte čas poslední synchronizace
touch "$LAST_SYNC_FILE"

if [ $COPIED -gt 0 ]; then
    echo "Hotovo! Zkopírováno $COPIED souborů."
else
    echo "Žádné nové fotky k zkopírování."
fi
