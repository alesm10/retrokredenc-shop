#!/bin/bash

# Skript pro první push kódu na GitHub
# Použití: ./PUSH_NA_GITHUB.sh VASE-UZIVATELSKE-JMENO

# Kontrola, zda je zadáno uživatelské jméno
if [ -z "$1" ]; then
    echo "❌ Chyba: Musíte zadat GitHub uživatelské jméno"
    echo ""
    echo "Použití: ./PUSH_NA_GITHUB.sh VASE-UZIVATELSKE-JMENO"
    echo "Příklad: ./PUSH_NA_GITHUB.sh alesmiclik"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_NAME="retrokredenc"
REPO_URL="https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

echo "🚀 Příprava push na GitHub..."
echo "📦 Repository: $REPO_URL"
echo ""

# Kontrola, zda už existuje .git složka
if [ -d ".git" ]; then
    echo "✅ Git už je inicializovaný"
else
    echo "📝 Inicializace Git..."
    git init
fi

# Kontrola, zda už existuje remote origin
if git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Remote 'origin' už existuje"
    echo "   Aktuální URL: $(git remote get-url origin)"
    read -p "Chcete ho přepsat? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin "$REPO_URL"
        echo "✅ Remote URL aktualizován"
    else
        echo "⏭️  Přeskakuji nastavení remote"
    fi
else
    echo "🔗 Přidávání GitHub remote..."
    git remote add origin "$REPO_URL"
    echo "✅ Remote přidán"
fi

# Přidání všech souborů
echo ""
echo "📁 Přidávání souborů..."
git add .

# Vytvoření commitu
echo ""
echo "💾 Vytváření commitu..."
git commit -m "Initial commit - Retro Kredenc e-shop" || {
    echo "⚠️  Žádné změny k commitu (možná už je vše commitnuto)"
}

# Nastavení main branch
echo ""
echo "🌿 Nastavení main branch..."
git branch -M main

# Push na GitHub
echo ""
echo "⬆️  Push na GitHub..."
echo "📝 Poznámka: Budete požádáni o GitHub credentials"
echo "   Username: $GITHUB_USERNAME"
echo "   Password: použijte Personal Access Token (ne běžné heslo!)"
echo ""
read -p "Pokračovat? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Zrušeno uživatelem"
    exit 0
fi

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Úspěšně pushnuto na GitHub!"
    echo ""
    echo "🌐 Další kroky:"
    echo "1. Otevřete repository: https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo "2. Pokračujte podle návodu v NASTAVENI_HOSTINGU.md"
    echo "   - Nastavte GitHub Pages (Settings → Pages)"
    echo "   - Přidejte custom domain: retrokredenc.cz"
else
    echo ""
    echo "❌ Chyba při push"
    echo ""
    echo "💡 Tipy:"
    echo "- Zkontrolujte, že máte správné GitHub credentials"
    echo "- Použijte Personal Access Token jako heslo"
    echo "- Zkontrolujte, že repository existuje na GitHub"
    echo ""
    echo "📖 Viz návod: NASTAVENI_HOSTINGU.md - Fáze 3"
fi
