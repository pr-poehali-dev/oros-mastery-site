#!/bin/bash

# Скрипт для сборки проекта с автоматической генерацией sitemap.xml
# Использование: ./build.sh или bash build.sh

echo "🚀 Starting build process..."
echo ""

# Шаг 1: Генерация sitemap.xml
echo "📍 Step 1: Generating sitemap.xml..."
node scripts/generate-sitemap.js

if [ $? -ne 0 ]; then
  echo "❌ Failed to generate sitemap"
  exit 1
fi

echo ""

# Шаг 2: Сборка проекта
echo "📍 Step 2: Building project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo ""
echo "✅ Build completed successfully!"
echo "📦 Your project is ready in the dist/ folder"
