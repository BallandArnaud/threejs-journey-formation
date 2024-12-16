#!/bin/bash

# Nettoyer le répertoire dist
rm -rf dist
mkdir dist

# Copier index.html et les assets dans dist
cp index.html dist/
cp style.css dist/
cp projects.json dist/
cp -r assets dist/

# Construire chaque projet dans demo/
for dir in demo/*; do
  if [ -d "$dir" ]; then
    echo "Building $dir"
    cd $dir
    npm install
    npm run build
    cd ../../
    
    # Copier le résultat du build dans un sous-dossier de dist/
    project_name=$(basename $dir)
    mkdir -p dist/$project_name
    cp -r $dir/dist/* dist/$project_name/
  fi
done

echo "Build complete! Everything is in the dist/ folder."
