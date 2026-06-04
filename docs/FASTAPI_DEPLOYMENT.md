# FastAPI Backend Deployment Guide - VPS with Docker

Complete guide for deploying the Athletes Pair Match FastAPI backend on a VPS using Docker, with support for multiple backends sharing a PostgreSQL database.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Initial VPS Setup](#initial-vps-setup)
4. [PostgreSQL Multi-Backend Setup](#postgresql-multi-backend-setup)
5. [Deploying Athletes Pair Match Backend](#deploying-athletes-pair-match-backend)
6. [Nginx Reverse Proxy Configuration](#nginx-reverse-proxy-configuration)
7. [SSL/HTTPS with Let's Encrypt](#sslhttps-with-lets-encrypt)
8. [Adding More Backends](#adding-more-backends)
9. [Monitoring and Maintenance](#monitoring-and-maintenance)
10. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

The deployment architecture consists of:

```
Internet
    ↓
Nginx Reverse Proxy (HTTPS)
    ↓
┌─────────────────────────────────────┐
│  VPS (Ubuntu 22.04 recommended)     │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  Docker Network (shared)      │  │
│  │                               │  │
│  │  ┌────────────────────────┐  │  │
│  │  │ PostgreSQL Container   │  │  │
│  │  │ (shared by all APIs)   │  │  │
│  │  │ - athletes_match_db    │  │  │
│  │  │ - future_app_db        │  │  │
│  │  └────────────────────────┘  │  │
│  │           ↕                   │  │
│  │  ┌────────────────────────┐  │  │
│  │  │ Athletes Match API     │  │  │
│  │  │ Port: 8000             │  │  │
│  │  └────────────────────────┘  │  │
│  │                               │  │
│  │  ┌────────────────────────┐  │  │
│  │  │ Future Backend #2      │  │  │
│  │  │ Port: 8001             │  │  │
│  │  └────────────────────────┘  │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

**Key Features:**
- Single PostgreSQL container shared by all backends
- Each backend has its own database
- Isolated Docker network for security
- Nginx handles SSL termination and routing
- Health checks and automatic restarts

---

## Prerequisites

### On Your Local Machine
- Git
- SSH access to your VPS
- Domain name (for HTTPS)

### On Your VPS
- Ubuntu 22.04 LTS (recommended) or similar Linux distribution
- Minimum 1GB RAM (2GB recommended)
- 20GB storage minimum
- Root or sudo access
- Public IP address
- Domain DNS pointing to your VPS IP

---

## Initial VPS Setup

### 1. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Start Docker
sudo systemctl enable docker
sudo systemctl start docker

# Verify installation
docker --version
docker compose version
```

### 3. Install Nginx

```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 4. Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Verify
sudo ufw status
```

### 5. Create Project Directory

```bash
mkdir -p ~/apps/athletes-pair-match
cd ~/apps/athletes-pair-match
```

---

## PostgreSQL Multi-Backend Setup

### 1. Create Docker Network

```bash
# Create shared network for all backends
docker network create shared_backend_network
```

### 2. Configure Environment Variables

Create a centralized `.env` file for shared PostgreSQL:

```bash
cd ~/apps
nano .env.postgres
```

Add:

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=YOUR_STRONG_PASSWORD_HERE
POSTGRES_MULTIPLE_DATABASES=athletes_match_db

# Add more databases as you add backends:
# POSTGRES_MULTIPLE_DATABASES=athletes_match_db,another_db,third_db
```

**Important:** Replace `YOUR_STRONG_PASSWORD_HERE` with a secure password!

### 3. Create PostgreSQL Init Script

```bash
nano ~/apps/init-db.sh
```

Add:

```bash
#!/bin/bash
set -e

# Script to create multiple databases in shared PostgreSQL container
if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    echo "Creating multiple databases: $POSTGRES_MULTIPLE_DATABASES"
    
    for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        echo "Creating database: $db"
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
            SELECT 'CREATE DATABASE $db'
            WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$db')\gexec
            
            GRANT ALL PRIVILEGES ON DATABASE $db TO $POSTGRES_USER;
EOSQL
    done
    
    echo "Multiple databases created successfully"
fi
```

Make executable:

```bash
chmod +x ~/apps/init-db.sh
```

### 4. Start Shared PostgreSQL

Create `docker-compose.postgres.yml`:

```bash
cd ~/apps
nano docker-compose.postgres.yml
```

Add:

```yaml
version: '3.8'

networks:
  shared_backend_network:
    external: true

volumes:
  postgres_data:
    driver: local

services:
  postgres:
    image: postgres:16-alpine
    container_name: shared_postgres
    restart: unless-stopped
    env_file:
      - .env.postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-db.sh:/docker-entrypoint-initdb.d/init-db.sh:ro
    networks:
      - shared_backend_network
    ports:
      - "127.0.0.1:5432:5432"  # Only accessible from localhost
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
```

Start PostgreSQL:

```bash
docker compose -f docker-compose.postgres.yml up -d
```

Verify:

```bash
docker ps
docker logs shared_postgres
```

---

## Deploying Athletes Pair Match Backend

### 1. Clone Repository

```bash
cd ~/apps/athletes-pair-match
git clone https://github.com/your-username/athletes-pair-match.git .
# Or upload files via SCP/SFTP
```

### 2. Configure Backend Environment

```bash
cd ~/apps/athletes-pair-match/backend
cp .env.example .env
nano .env
```

Update `.env`:

```env
# Database (use shared PostgreSQL)
DATABASE_URL=postgresql://postgres:YOUR_STRONG_PASSWORD_HERE@postgres:5432/athletes_match_db

# API Configuration
SECRET_KEY=generate-a-random-secret-key-here
API_PORT=8000

# CORS - Add your Netlify domain
CORS_ORIGINS=https://your-netlify-app.netlify.app,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60

# Logging
LOG_LEVEL=INFO
```

**Generate a secure SECRET_KEY:**

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3. Update Docker Compose for Production

Edit `backend/docker-compose.yml` to use external network:

```yaml
version: '3.8'

networks:
  shared_backend_network:
    external: true  # Use existing network

services:
  athletes-match-api:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: athletes_match_api
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "127.0.0.1:8000:8000"  # Only localhost access
    depends_on:
      - postgres  # Reference shared postgres
    networks:
      - shared_backend_network
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:8000/api/health || exit 1"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s
```

### 4. Build and Start Backend

```bash
cd ~/apps/athletes-pair-match/backend

# Build image
docker compose build

# Start service
docker compose up -d

# Check logs
docker compose logs -f
```

### 5. Run Database Migrations

The application auto-creates tables on startup, but you can also run manually:

```bash
# Copy migration file
docker cp migrations/001_create_game_completions.sql shared_postgres:/tmp/

# Execute migration
docker exec -it shared_postgres psql -U postgres -d athletes_match_db -f /tmp/001_create_game_completions.sql
```

### 6. Test Backend

```bash
# Health check
curl http://localhost:8000/api/health

# Should return: {"status":"ok","timestamp":"..."}
```

---

## Nginx Reverse Proxy Configuration

### 1. Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/athletes-match-api
```

Add:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;  # Replace with your domain

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

    location / {
        # Apply rate limit
        limit_req zone=api_limit burst=20 nodelay;

        # Proxy to FastAPI
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        
        # Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # CORS (if needed - FastAPI already handles this)
        add_header 'Access-Control-Allow-Origin' '*' always;
    }

    # Health check endpoint (no rate limit)
    location /api/health {
        proxy_pass http://127.0.0.1:8000;
        access_log off;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 2. Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/athletes-match-api /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 3. Update DNS

Point your domain to your VPS IP:

```
Type: A Record
Name: api
Value: YOUR_VPS_IP
TTL: 3600
```

Wait for DNS propagation (5-30 minutes).

---

## SSL/HTTPS with Let's Encrypt

### 1. Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtain SSL Certificate

```bash
sudo certbot --nginx -d api.yourdomain.com
```

Follow prompts:
- Enter email address
- Agree to terms
- Choose to redirect HTTP to HTTPS (option 2)

### 3. Test Auto-Renewal

```bash
sudo certbot renew --dry-run
```

Certificates auto-renew via cron. Check:

```bash
sudo systemctl status certbot.timer
```

### 4. Verify HTTPS

Visit: `https://api.yourdomain.com/api/health`

---

## Adding More Backends

### 1. Update PostgreSQL Databases

Edit `~/apps/.env.postgres`:

```env
POSTGRES_MULTIPLE_DATABASES=athletes_match_db,new_app_db
```

Restart PostgreSQL:

```bash
cd ~/apps
docker compose -f docker-compose.postgres.yml down
docker compose -f docker-compose.postgres.yml up -d
```

### 2. Deploy New Backend

```bash
mkdir -p ~/apps/new-app/backend
cd ~/apps/new-app/backend

# Copy your new backend code
# Create .env with DATABASE_URL pointing to new_app_db
# Use different port: 8001
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

networks:
  shared_backend_network:
    external: true

services:
  new-app-api:
    build: .
    container_name: new_app_api
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "127.0.0.1:8001:8000"  # Different host port!
    networks:
      - shared_backend_network
```

Start:

```bash
docker compose up -d
```

### 3. Add Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/new-app-api
```

Similar config but proxy to `http://127.0.0.1:8001`.

Enable and reload:

```bash
sudo ln -s /etc/nginx/sites-available/new-app-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Monitoring and Maintenance

### Container Status

```bash
# View all containers
docker ps -a

# View specific container logs
docker logs -f athletes_match_api

# View PostgreSQL logs
docker logs -f shared_postgres

# Resource usage
docker stats
```

### Database Backups

```bash
# Create backup script
nano ~/backup-db.sh
```

Add:

```bash
#!/bin/bash
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=~/backups
mkdir -p $BACKUP_DIR

# Backup athletes_match_db
docker exec shared_postgres pg_dump -U postgres athletes_match_db > \
    $BACKUP_DIR/athletes_match_db_$TIMESTAMP.sql

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete

echo "Backup completed: $BACKUP_DIR/athletes_match_db_$TIMESTAMP.sql"
```

Make executable and add to cron:

```bash
chmod +x ~/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add line:
0 2 * * * /home/yourusername/backup-db.sh
```

### Log Rotation

Docker handles log rotation automatically, but verify:

```bash
# Check Docker logging config
docker inspect athletes_match_api | grep -A 10 LogConfig
```

### Updates

```bash
# Update backend code
cd ~/apps/athletes-pair-match
git pull

# Rebuild and restart
cd backend
docker compose build
docker compose up -d

# Verify
docker compose logs -f
```

---

## Troubleshooting

### Backend Not Starting

```bash
# Check logs
docker logs athletes_match_api

# Common issues:
# - Database connection: verify DATABASE_URL in .env
# - Port conflict: check port 8000 is free
# - Network issue: verify shared_backend_network exists
```

### Database Connection Failed

```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Check network connectivity
docker exec athletes_match_api ping postgres

# Test database connection
docker exec -it shared_postgres psql -U postgres -d athletes_match_db
```

### Nginx 502 Bad Gateway

```bash
# Check backend is running
curl http://localhost:8000/api/health

# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Verify Nginx config
sudo nginx -t
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check Nginx SSL config
sudo nginx -t
```

### Rate Limiting Issues

Check FastAPI logs for rate limit violations:

```bash
docker logs athletes_match_api | grep "429"
```

Adjust rate limits in `backend/.env` if needed.

---

## Security Checklist

- [ ] Strong PostgreSQL password set
- [ ] SECRET_KEY is unique and secure
- [ ] Firewall configured (UFW enabled)
- [ ] PostgreSQL only accessible via Docker network
- [ ] API only accessible via Nginx (localhost binding)
- [ ] HTTPS enabled with Let's Encrypt
- [ ] Rate limiting configured
- [ ] Regular backups scheduled
- [ ] `.env` files not in git
- [ ] Docker containers run as non-root users

---

## Frontend Configuration (Netlify)

In your Netlify dashboard:

1. **Environment Variables**:
   - `VITE_API_BASE_URL` = `https://api.yourdomain.com`

2. **Build Settings**:
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Build & Deploy**:
   - Trigger new deploy after updating env var

---

## Performance Optimization

### Database Indexing

Already configured in migration, but verify:

```sql
-- Connect to database
docker exec -it shared_postgres psql -U postgres -d athletes_match_db

-- Check indexes
\di

-- Expected indexes:
-- idx_game_completions_completion_time
-- idx_game_completions_completed_at
-- idx_game_completions_player_name
```

### Nginx Caching (Optional)

For GET endpoints:

```nginx
# Add to location block
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=100m inactive=60m;
proxy_cache api_cache;
proxy_cache_valid 200 5m;
```

### Docker Resource Limits

Add to `docker-compose.yml`:

```yaml
services:
  athletes-match-api:
    # ... other config
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

---

## Useful Commands Reference

```bash
# View all running containers
docker ps

# Restart backend
docker compose -f ~/apps/athletes-pair-match/backend/docker-compose.yml restart

# View backend logs
docker logs -f athletes_match_api

# Shell into backend container
docker exec -it athletes_match_api bash

# Shell into PostgreSQL
docker exec -it shared_postgres psql -U postgres

# Restart Nginx
sudo systemctl restart nginx

# View Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Check disk usage
df -h
docker system df

# Clean up Docker
docker system prune -a
```

---

## Support and Documentation

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **Docker Docs**: https://docs.docker.com/
- **Nginx Docs**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/

---

## Next Steps

1. Deploy backend to VPS following this guide
2. Update Netlify environment variables
3. Test full integration (frontend ↔ backend)
4. Set up monitoring (optional: Prometheus, Grafana)
5. Configure log aggregation (optional: ELK stack)

---

**Document Version**: 1.0  
**Last Updated**: January 13, 2026  
**Author**: Athletes Pair Match Team
