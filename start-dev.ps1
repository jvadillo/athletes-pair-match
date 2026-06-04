# Quick Start Script for Athletes Pair Match (Windows PowerShell)
# Starts both backend and frontend for local development

Write-Host "🚀 Starting Athletes Pair Match Development Environment" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Docker is not running. Please start Docker first." -ForegroundColor Red
    exit 1
}

# Start backend
Write-Host "📦 Starting FastAPI backend..." -ForegroundColor Yellow
Set-Location backend

if (!(Test-Path .env)) {
    Write-Host "⚠️  No .env file found, copying from .env.example" -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  Please update backend\.env with your configuration" -ForegroundColor Yellow
}

docker-compose up -d

Write-Host "⏳ Waiting for backend to be healthy..." -ForegroundColor Yellow
$maxAttempts = 30
$attempt = 0
$backendReady = $false

while ($attempt -lt $maxAttempts) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8000/api/health" -UseBasicParsing -TimeoutSec 2
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Backend is up and running!" -ForegroundColor Green
            $backendReady = $true
            break
        }
    } catch {
        # Backend not ready yet
    }
    $attempt++
    Start-Sleep -Seconds 1
}

if (!$backendReady) {
    Write-Host "❌ Backend failed to start. Check logs with: docker-compose logs" -ForegroundColor Red
    exit 1
}

# Go back to root
Set-Location ..

# Install frontend dependencies if needed
if (!(Test-Path node_modules)) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Check frontend .env
if (!(Test-Path .env)) {
    Write-Host "⚠️  No .env file found, copying from .env.example" -ForegroundColor Yellow
    Copy-Item .env.example .env
}

# Display info
Write-Host ""
Write-Host "🎮 Game will be available at: http://localhost:5173" -ForegroundColor Green
Write-Host "📡 API is running at: http://localhost:8000" -ForegroundColor Green
Write-Host "📚 API docs: http://localhost:8000/api/docs" -ForegroundColor Green
Write-Host ""
Write-Host "Press Ctrl+C to stop (backend will keep running)" -ForegroundColor Yellow
Write-Host "To stop backend: cd backend && docker-compose down" -ForegroundColor Yellow
Write-Host ""

# Start frontend
npm run dev
