#!/bin/bash

echo "🚀 Configuration du push vers GitHub"
echo ""
echo "Tu as besoin d'un Personal Access Token de GitHub."
echo "1. Va sur: https://github.com/settings/tokens"
echo "2. Clique sur 'Generate new token (classic)'"
echo "3. Coche 'repo' (accès complet aux repositories)"
echo "4. Génère et copie le token"
echo ""
read -p "Colle ton token GitHub ici: " TOKEN
echo ""

if [ -z "$TOKEN" ]; then
    echo "❌ Aucun token fourni. Annulation."
    exit 1
fi

echo "📝 Configuration du remote avec le token..."
git remote set-url origin "https://${TOKEN}@github.com/Ahmorie/Focus-timer.git"

echo "⬆️  Push vers GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push réussi ! 🎉"
    echo "Ton projet est maintenant sur GitHub : https://github.com/Ahmorie/Focus-timer"
else
    echo ""
    echo "❌ Erreur lors du push"
fi
