# PowerShell скрипт для сборки проекта с автоматической генерацией sitemap.xml
# Использование: .\build.ps1

Write-Host "🚀 Starting build process..." -ForegroundColor Cyan
Write-Host ""

# Шаг 1: Генерация sitemap.xml
Write-Host "📍 Step 1: Generating sitemap.xml..." -ForegroundColor Yellow
node scripts/generate-sitemap.js

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate sitemap" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Шаг 2: Сборка проекта
Write-Host "📍 Step 2: Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host "📦 Your project is ready in the dist/ folder" -ForegroundColor Green
