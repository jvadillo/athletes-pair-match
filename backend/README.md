# Athletes Pair Match - Backend API

FastAPI backend for the Athletes Pair Match game leaderboard system.

## Architecture

This backend is designed to run in a **multi-backend Docker environment** where:
- Multiple FastAPI applications share a single PostgreSQL container
- Each backend has its own database within the shared PostgreSQL instance
- All backends connect through a shared Docker network

## Features

- ✅ RESTful API with 4 endpoints
- ✅ Rate limiting (10-60 req/min per IP)
- ✅ CORS support for Netlify frontend
- ✅ PostgreSQL with SQLAlchemy ORM
- ✅ Input validation with Pydantic
- ✅ Health checks and monitoring
- ✅ Docker containerized

## API Endpoints

### 1. Save Game Completion
```
POST /api/game-completions
Body: {
  "player_name": "string (3-16 chars)",
  "completion_time": integer (seconds),
  "moves": integer
}
Response: {
  "id": "uuid",
  "player_name": "string",
  "completion_time": integer,
  "moves": integer,
  "completed_at": "datetime",
  "rank": integer,
  "total_players": integer
}
Rate Limit: 10/minute
```

### 2. Get Leaderboard
```
GET /api/game-completions/leaderboard
Response: [{
  "id": "uuid",
  "player_name": "string",
  "completion_time": integer,
  "moves": integer,
  "completed_at": "datetime"
}, ...]
Rate Limit: 30/minute
```

### 3. Calculate Rank
```
GET /api/game-completions/rank?completion_time=123
Response: {
  "better_count": integer,
  "total_count": integer,
  "rank": integer
}
Rate Limit: 30/minute
```

### 4. Health Check
```
GET /api/health
Response: {
  "status": "ok",
  "timestamp": "datetime"
}
```

## Development Setup

### Prerequisites
- Python 3.11+
- Docker & Docker Compose
- PostgreSQL client (optional, for debugging)

### Local Development (without Docker)

1. **Install dependencies**:
```bash
cd backend
pip install -r requirements.txt
```

2. **Set up local PostgreSQL**:
```bash
# Create database
createdb athletes_match_db
```

3. **Configure environment**:
```bash
cp .env.example .env
# Edit .env with local PostgreSQL credentials
```

4. **Run the application**:
```bash
python main.py
# Or with uvicorn directly:
uvicorn main:app --reload --port 8000
```

5. **Access API docs**:
- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

### Docker Development

1. **Start services**:
```bash
cd backend
docker-compose up -d
```

2. **View logs**:
```bash
docker-compose logs -f athletes-match-api
```

3. **Stop services**:
```bash
docker-compose down
```

4. **Rebuild after changes**:
```bash
docker-compose up -d --build
```

## Production Deployment

See [docs/FASTAPI_DEPLOYMENT.md](../docs/FASTAPI_DEPLOYMENT.md) for VPS deployment instructions.

## Database Schema

### Table: `game_completions`

| Column | Type | Constraints |
|--------|------|-------------|
| id | VARCHAR (UUID) | PRIMARY KEY |
| player_name | VARCHAR | NOT NULL |
| completion_time | INTEGER | NOT NULL |
| moves | INTEGER | NOT NULL |
| completed_at | TIMESTAMP | NOT NULL, DEFAULT NOW() |

**Indexes**:
- `idx_game_completions_completion_time` (for leaderboard sorting)
- `idx_game_completions_completed_at` (for recent games)
- `idx_game_completions_player_name` (for player lookups)

## Security

- **Rate Limiting**: Per-IP rate limits prevent abuse
- **Input Validation**: Pydantic models validate all input
- **CORS**: Restricted to configured origins
- **No Authentication**: Public leaderboard (by design)
- **SQL Injection Prevention**: SQLAlchemy ORM parameterization

## Adding More Backends

To add another FastAPI backend to the shared PostgreSQL:

1. **Create new backend directory**:
```bash
mkdir ../another-backend
```

2. **Update `docker-compose.yml`**:
```yaml
services:
  postgres:
    environment:
      POSTGRES_MULTIPLE_DATABASES: athletes_match_db,another_db  # Add new DB

  another-api:
    build:
      context: ../another-backend
    ports:
      - "8001:8000"  # Different port!
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/another_db
```

3. **Restart PostgreSQL**:
```bash
docker-compose down
docker-compose up -d
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `SECRET_KEY` | API secret key | Required |
| `CORS_ORIGINS` | Allowed origins (comma-separated) | localhost |
| `RATE_LIMIT_PER_MINUTE` | Max requests per minute | 60 |
| `LOG_LEVEL` | Logging level | INFO |
| `API_PORT` | Port to run on | 8000 |

## Monitoring

- **Health endpoint**: `/api/health`
- **Container health check**: Built-in Docker healthcheck
- **Logs**: `docker-compose logs -f`

## Testing

Run tests with pytest (tests to be added):
```bash
pytest
```

## License

Same as parent project.
