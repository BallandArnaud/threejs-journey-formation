#!/bin/bash

#set -e # Arrête le script en cas d'erreur

# Nettoyer le répertoire dist
echo "Nettoyage du dossier dist..."
rm -rf dist
mkdir dist

#Generate projects.json
echo "Generate projects.json..."
node generatePortofolio.js

# Copier index.html et les assets dans dist
echo "Copie des fichiers principaux..."
cp index.html dist/
cp style.css dist/
cp projects.json dist/
cp -r assets dist/

# Construire chaque projet dans demo/
echo "Construction des sous-projets..."
for dir in demo/*; do
  if [ -d "$dir" ]; then
    echo "Construction du projet dans $dir..."
    cd $dir
    npm install
    npm run build
    cd ../../
    
    # Copier le résultat du build dans un sous-dossier de dist/
    project_name=$(basename $dir)
    mkdir -p dist/$project_name
    cp -r $dir/dist/* dist/$project_name/
    echo "Projet $dir construit et copié dans dist/$project_name."
  fi
done

echo "Construction terminée ! Tous les fichiers sont dans le dossier dist."
