# Database Migrations

This directory contains SQL migration files for the Athletes Pair Match database.

## Running Migrations

### Using psql (PostgreSQL client)

```bash
# Connect to database
psql -U postgres -d athletes_match_db

# Run migration
\i migrations/001_create_game_completions.sql
```

### Using Docker

```bash
# Copy migration file into container
docker cp migrations/001_create_game_completions.sql shared_postgres:/tmp/

# Execute migration
docker exec -it shared_postgres psql -U postgres -d athletes_match_db -f /tmp/001_create_game_completions.sql
```

### Using Python (SQLAlchemy)

The application automatically creates tables on startup via `database.py::init_db()`.

No manual migration needed if using Docker Compose from scratch.

## Migration Files

| File | Description | Date |
|------|-------------|------|
| `001_create_game_completions.sql` | Initial schema - game_completions table | 2026-01-13 |

## Notes

- Migrations are **idempotent** - safe to run multiple times
- Use `CREATE IF NOT EXISTS` for all objects
- Always add indexes for query performance
- Document changes with comments in SQL

## Future Migrations

To add a new migration:

1. Create file: `002_description.sql`
2. Write idempotent SQL
3. Test locally
4. Document in this README
5. Run on production after testing
