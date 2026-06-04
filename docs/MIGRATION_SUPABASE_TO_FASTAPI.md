# Migration from Supabase to FastAPI Backend

This document explains the migration from Supabase to a self-hosted FastAPI backend.

## Summary of Changes

### Backend
- **Before**: Supabase (hosted PostgreSQL + API)
- **After**: FastAPI + self-hosted PostgreSQL in Docker

### Frontend
- Removed dependency: `@supabase/supabase-js`
- Added: Custom API client (`src/lib/api-client.ts`)
- Updated components to use new API client

### Database
- **Same schema**: `game_completions` table structure is identical
- **Different connection**: Now connects to FastAPI instead of Supabase API
- **Data migration**: Export/import required (see below)

---

## Data Migration (Optional)

If you have existing data in Supabase and want to migrate it:

### 1. Export from Supabase

```bash
# Using Supabase CLI
supabase db dump -f supabase_data.sql

# Or via SQL in Supabase dashboard:
# SELECT * FROM game_completions;
# Export as CSV
```

### 2. Import to New PostgreSQL

```bash
# Copy SQL dump to PostgreSQL container
docker cp supabase_data.sql shared_postgres:/tmp/

# Import data
docker exec -it shared_postgres psql -U postgres -d athletes_match_db -f /tmp/supabase_data.sql
```

### 3. Verify Import

```bash
# Connect to database
docker exec -it shared_postgres psql -U postgres -d athletes_match_db

# Check data
SELECT COUNT(*) FROM game_completions;
SELECT * FROM game_completions LIMIT 5;
```

---

## API Endpoint Changes

All endpoints maintain the same data structure, but URLs have changed:

### Supabase (Old)
```typescript
// Insert
await supabase.from("game_completions").insert({...})

// Select all
await supabase.from("game_completions").select("*")

// Select with filter
await supabase.from("game_completions").select("id").lt("completion_time", time)
```

### FastAPI (New)
```typescript
// Save completion (includes rank calculation)
await saveGameCompletion(playerName, time, moves)
// Returns: { id, player_name, completion_time, moves, completed_at, rank, total_players }

// Get leaderboard
await getLeaderboard()
// Returns: Array of game completions

// Calculate rank
await calculateRank(completionTime)
// Returns: { better_count, total_count, rank }
```

---

## Breaking Changes

### None for End Users
The API maintains the same response structure (snake_case) as Supabase, so frontend changes are transparent to users.

### For Developers

1. **Environment Variables**:
   - **Before**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - **After**: `VITE_API_BASE_URL`

2. **Dependencies**:
   - **Removed**: `@supabase/supabase-js` (and all its sub-dependencies)
   - **Added**: None (using native fetch API)

3. **Client Import**:
   - **Before**: `import { supabase } from "@/integrations/supabase/client"`
   - **After**: `import { saveGameCompletion, getLeaderboard } from "@/lib/api-client"`

4. **Error Handling**:
   - **Before**: Supabase returns `{ data, error }` with `error` object
   - **After**: Same structure maintained for compatibility

---

## Advantages of FastAPI Backend

### Performance
- ✅ Faster response times (no third-party API)
- ✅ Optimized queries with SQLAlchemy ORM
- ✅ Better control over caching

### Cost
- ✅ No Supabase subscription fees
- ✅ Predictable VPS costs
- ✅ Shared PostgreSQL across multiple projects

### Control
- ✅ Full control over database and API
- ✅ Custom rate limiting per endpoint
- ✅ Easier debugging and monitoring
- ✅ No vendor lock-in

### Scalability
- ✅ Horizontal scaling possible
- ✅ Multiple backends can share one PostgreSQL
- ✅ Can add caching layer (Redis)

---

## Files Modified

### New Files Created

**Backend:**
- `backend/main.py` - FastAPI application
- `backend/routes.py` - API endpoints
- `backend/models.py` - Pydantic schemas
- `backend/database.py` - SQLAlchemy models
- `backend/config.py` - Settings
- `backend/Dockerfile` - Container image
- `backend/docker-compose.yml` - Orchestration
- `backend/requirements.txt` - Python dependencies
- `backend/migrations/001_create_game_completions.sql` - Database schema

**Frontend:**
- `src/lib/api-client.ts` - API client (replaces Supabase client)
- `.env.example` - Environment template

**Documentation:**
- `docs/FASTAPI_DEPLOYMENT.md` - Deployment guide
- `backend/README.md` - Backend documentation
- `start-dev.sh` / `start-dev.ps1` - Quick start scripts

### Files Modified

**Frontend:**
- `src/components/WinModal.tsx` - Uses new API client
- `src/components/RankingTable.tsx` - Uses new API client
- `src/components/game/GameResultService.tsx` - Uses new API client
- `package.json` - Removed Supabase dependency
- `README.md` - Updated documentation

### Files to Delete (After Migration)

These files are no longer needed but kept for reference:
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `supabase/config.toml`
- `docs/SUPABASE_SETUP.md` (legacy documentation)
- `docs/SUPABASE_PROJECT_MIGRATION.md` (legacy documentation)

**Note**: Don't delete immediately - keep until you verify the new backend works.

---

## Testing the Migration

### 1. Local Testing

```bash
# Start backend
cd backend
docker-compose up -d

# Start frontend
npm run dev

# Visit http://localhost:5173
# Play a game and save score
# Check leaderboard
```

### 2. Verify Backend

```bash
# Health check
curl http://localhost:8000/api/health

# Get leaderboard
curl http://localhost:8000/api/game-completions/leaderboard

# Check database
docker exec -it shared_postgres psql -U postgres -d athletes_match_db -c "SELECT * FROM game_completions;"
```

### 3. Test Rate Limiting

```bash
# Send multiple requests quickly (should get rate limited)
for i in {1..20}; do curl -X POST http://localhost:8000/api/game-completions \
  -H "Content-Type: application/json" \
  -d '{"player_name":"Test","completion_time":60,"moves":20}'; done
```

---

## Rollback Plan

If you need to rollback to Supabase:

1. **Restore Supabase dependency**:
   ```bash
   npm install @supabase/supabase-js@^2.49.1
   ```

2. **Restore original files**:
   ```bash
   git checkout HEAD -- src/components/WinModal.tsx
   git checkout HEAD -- src/components/RankingTable.tsx
   git checkout HEAD -- src/components/game/GameResultService.tsx
   ```

3. **Remove new files**:
   ```bash
   rm -rf backend/
   rm src/lib/api-client.ts
   ```

4. **Restore environment variables** in Netlify

---

## Support

If you encounter issues during migration:

1. Check [docs/FASTAPI_DEPLOYMENT.md](FASTAPI_DEPLOYMENT.md) for deployment help
2. Check backend logs: `docker logs athletes_match_api`
3. Verify environment variables in `.env` files
4. Test API directly: `curl http://localhost:8000/api/health`

---

## Next Steps After Migration

1. ✅ Test all game functionality
2. ✅ Deploy backend to VPS
3. ✅ Update Netlify environment variables
4. ✅ Test production deployment
5. ✅ Monitor logs for errors
6. ✅ Set up database backups
7. ✅ Configure monitoring (optional)
8. ✅ Delete Supabase project (when ready)

---

**Migration Completed**: January 13, 2026  
**Backend Version**: 1.0.0  
**API Compatibility**: 100% (maintains Supabase response structure)
