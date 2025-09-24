# Supabase Database Setup Guide

This guide explains how to set up the database structure for the Athletes Pair Match game in Supabase.

## Overview

The database consists of:
- **game_completions** table: Stores player game results
- **leaderboard** view: Provides ranked game results
- **Utility functions**: Helper functions for statistics and rankings

## Setup Methods

### Method 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run each migration file in order:

#### Step 1: Create the main table
Copy and run the contents of `supabase/migrations/20240923000001_create_game_completions_table.sql`

#### Step 2: Create the leaderboard view
Copy and run the contents of `supabase/migrations/20240923000002_create_leaderboard_view.sql`

#### Step 3: Create utility functions
Copy and run the contents of `supabase/migrations/20240923000003_create_utility_functions.sql`

### Method 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Initialize Supabase (if not already done)
supabase init

# Link to your project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push
```

## Database Schema

### game_completions Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key, auto-generated |
| player_name | text | Player's name (required) |
| completion_time | integer | Time to complete game in seconds (required) |
| moves | integer | Number of card flips made (required) |
| completed_at | timestamptz | When the game was completed (auto-set) |

### Indexes

- `idx_game_completions_completion_time`: For fast leaderboard queries
- `idx_game_completions_completed_at`: For recent games queries  
- `idx_game_completions_player_name`: For player-specific queries

### Row Level Security (RLS)

- **Read access**: Anyone can view game completions (for leaderboards)
- **Write access**: Anyone can insert new game completions (for saving scores)
- **No update/delete**: Prevents score tampering

## Available Functions

### get_player_stats(player_name)
Returns statistics for a specific player:
- Total games played
- Best completion time
- Best moves count
- Average completion time and moves
- First and last play dates

```sql
SELECT * FROM get_player_stats('John Doe');
```

### get_top_players(limit)
Returns top players by completion time:
```sql
SELECT * FROM get_top_players(10);
```

### get_recent_games(limit)
Returns most recent games:
```sql
SELECT * FROM get_recent_games(20);
```

## Usage Examples

### Insert a new game result
```sql
INSERT INTO game_completions (player_name, completion_time, moves)
VALUES ('Alice', 120, 24);
```

### Get leaderboard
```sql
SELECT * FROM leaderboard LIMIT 10;
```

### Get player's best score
```sql
SELECT MIN(completion_time) as best_time, MIN(moves) as best_moves
FROM game_completions 
WHERE player_name = 'Alice';
```

## Testing the Setup

After running the migrations, you can test the setup with:

```sql
-- Insert test data
INSERT INTO game_completions (player_name, completion_time, moves) VALUES
('Test Player 1', 95, 18),
('Test Player 2', 120, 22),
('Test Player 3', 85, 16);

-- Verify the data
SELECT * FROM leaderboard;

-- Test functions
SELECT * FROM get_top_players(5);
SELECT * FROM get_player_stats('Test Player 1');
```

## Security Notes

- The database uses Row Level Security (RLS) to control access
- Anonymous users can read and insert game completions but cannot modify or delete them
- This prevents score tampering while allowing the game to function properly
- Consider adding rate limiting in your application to prevent spam

## Performance Considerations

- Indexes are created on frequently queried columns
- The leaderboard view provides optimized ranking queries
- Functions are written in SQL for optimal performance
- Consider adding pagination for large datasets in your application

## Maintenance

- Regularly monitor the `game_completions` table size
- Consider archiving old records if the table grows very large
- Monitor query performance and add additional indexes if needed
- Update the TypeScript types in `src/integrations/supabase/types.ts` if you modify the schema