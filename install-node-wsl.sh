#!/bin/bash

echo "🔧 Installation de Node.js dans WSL..."

# Installer nvm
echo "📦 Installation de nvm..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Charger nvm dans la session actuelle
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Installer Node.js 20 (LTS)
echo "📦 Installation de Node.js 20..."
nvm install 20
nvm use 20
nvm alias default 20

# Vérifier l'installation
echo "✅ Vérification de l'installation..."
node --version
npm --version

# Nettoyer et réinstaller les dépendances
echo "🧹 Nettoyage des anciennes dépendances..."
rm -rf node_modules package-lock.json

echo "📦 Installation des dépendances du projet..."
npm install

echo "🚀 Tout est prêt ! Vous pouvez maintenant lancer : npm run dev"
