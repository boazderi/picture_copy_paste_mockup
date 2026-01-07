#!/bin/bash

# Script to deploy to GitHub Pages manually

echo "🚀 Building and deploying to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Create gh-pages branch
echo "🌿 Creating gh-pages branch..."
git checkout --orphan gh-pages-deploy

# Remove all files except dist
git rm -rf .
rm -rf .github .gitignore README.md package*.json postcss.config.js src tailwind.config.js vite.config.js index.html

# Copy built files to root
cp -r dist/* .
rm -rf dist node_modules

# Add .nojekyll to prevent Jekyll processing
touch .nojekyll

# Commit
git add -A
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "✅ Build complete!"
echo ""
echo "📤 Now you need to push this branch to GitHub:"
echo ""
echo "Run this command:"
echo "  git push -f origin gh-pages-deploy:gh-pages"
echo ""
echo "Then go to:"
echo "  https://github.com/boazderi/picture_copy_paste_mockup/settings/pages"
echo ""
echo "And set:"
echo "  Source: Deploy from a branch"
echo "  Branch: gh-pages / (root)"
echo ""
echo "Your site will be live at:"
echo "  https://boazderi.github.io/picture_copy_paste_mockup/"
echo ""
