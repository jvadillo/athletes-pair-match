# Athletes Pair Match

A multilingual memory card game where players match famous Spanish female athletes with their achievements. Built with React, TypeScript, and FastAPI.

## Features

- 🧠 Memory card matching gameplay
- 🌍 Multi-language support (English, Spanish, Basque, Catalan, Galician)
- 🏆 Global leaderboard with score tracking
- 📱 Responsive design for mobile and desktop
- ⚡ FastAPI backend with PostgreSQL database
- 🐳 Docker-ready for easy deployment

## Architecture

- **Frontend**: React + TypeScript + Vite (deployed on Netlify)
- **Backend**: FastAPI + PostgreSQL (deployed on VPS with Docker)
- **Rate Limiting**: 10 req/min for saves, 30 req/min for reads
- **Multi-Backend Support**: Shared PostgreSQL container for multiple APIs

## Backend Setup

The project now uses a FastAPI backend instead of Supabase. See:

1. **Backend README**: [backend/README.md](backend/README.md)
2. **Deployment Guide**: [docs/FASTAPI_DEPLOYMENT.md](docs/FASTAPI_DEPLOYMENT.md)
3. **Database Migrations**: [backend/migrations/](backend/migrations/)

### Quick Start (Development)

```bash
# Backend
cd backend
docker-compose up -d

# Frontend
npm install
npm run dev
```

## Game Configuration

The game pairs are easily configurable through JSON files:

- **Game pairs**: `src/data/gamePairs.json`
- **Person translations**: `src/translations/card.ts`
- **Achievement translations**: `src/translations/achievement.ts`

See [docs/GAME_PAIRS_CONFIGURATION.md](docs/GAME_PAIRS_CONFIGURATION.md) for instructions on adding new pairs.

## Development

### Quick Start (Recommended)

**Linux/Mac:**
```bash
./start-dev.sh
```

**Windows (PowerShell):**
```powershell
.\start-dev.ps1
```

This will start both backend and frontend automatically.

### Manual Start

**Backend:**
```bash
cd backend
docker-compose up -d
```

**Frontend:**
```bash
npm install
npm run dev
```

### Access Points

- **Game**: http://localhost:5173
- **API**: http://localhost:8000
- **API Docs**: http://localhost:8000/api/docs

## Deployment

### Backend (VPS with Docker)

See complete guide: [docs/FASTAPI_DEPLOYMENT.md](docs/FASTAPI_DEPLOYMENT.md)

**Quick steps:**
1. Set up VPS with Docker
2. Configure shared PostgreSQL
3. Deploy FastAPI backend
4. Configure Nginx reverse proxy
5. Enable HTTPS with Let's Encrypt

### Frontend (Netlify)

```bash
# Build and verify
npm run deploy
```

**Netlify Configuration:**
- Set environment variable: `VITE_API_BASE_URL=https://api.yourdomain.com`
- Build command: `npm run build`
- Publish directory: `dist`

The project includes Netlify-specific configuration files:
- `netlify.toml` - Main configuration
- `public/_headers` - MIME type headers
- `public/_redirects` - SPA routing

See [docs/NETLIFY_DEPLOYMENT.md](docs/NETLIFY_DEPLOYMENT.md) for detailed deployment instructions.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
