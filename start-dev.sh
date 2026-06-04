#!/bin/bash

# Quick Start Script for Athletes Pair Match
# Starts both backend and frontend for local development

set -e

echo "🚀 Starting Athletes Pair Match Development Environment"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start backend
echo "📦 Starting FastAPI backend..."
cd backend

if [ ! -f .env ]; then
    echo "⚠️  No .env file found, copying from .env.example"
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your configuration"
fi

docker-compose up -d

echo "⏳ Waiting for backend to be healthy..."
for i in {1..30}; do
    if curl -s http://localhost:8000/api/health > /dev/null; then
        echo "✅ Backend is up and running!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Backend failed to start. Check logs with: docker-compose logs"
        exit 1
    fi
    sleep 1
done

# Go back to root
cd ..

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Check frontend .env
if [ ! -f .env ]; then
    echo "⚠️  No .env file found, copying from .env.example"
    cp .env.example .env
fi

# Start frontend
echo "🌐 Starting Vite frontend..."
echo ""
echo "🎮 Game will be available at: http://localhost:5173"
echo "📡 API is running at: http://localhost:8000"
echo "📚 API docs: http://localhost:8000/api/docs"
echo ""
echo "Press Ctrl+C to stop both services"
echo ""

# Trap Ctrl+C to stop backend
trap "echo ''; echo '🛑 Stopping services...'; cd backend; docker-compose down; exit" INT

npm run dev
