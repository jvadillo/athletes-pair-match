# Supabase Project Migration Guide

## What You Need from Your New Supabase Project

Go to your new Supabase project dashboard → Settings → API and collect:

1. **Project URL**: `https://[your-project-ref].supabase.co`
2. **Project Reference**: The part before `.supabase.co` (e.g., `abcdefghijklmnop`)
3. **Anon Key**: The `anon` `public` key (starts with `eyJ...`)

## Files to Update

### 1. src/integrations/supabase/client.ts
Replace:
- `SUPABASE_URL` with your new project URL
- `SUPABASE_PUBLISHABLE_KEY` with your new anon key

### 2. supabase/config.toml
Replace:
- `project_id` with your new project reference

### 3. .vscode/mcp.json
Replace:
- `--project-ref=dzanuwnfcbmdfbstgggy` with `--project-ref=[your-new-project-ref]`

## After Updating Configuration

1. **Clear browser cache/localStorage** to remove old cached data
2. **Restart your development server** (`npm run dev`)
3. **Set up the database** using the migration files in `supabase/migrations/`
4. **Verify the connection** by testing the game's score saving functionality

## Database Setup for New Project

Your new Supabase project will be empty, so you'll need to run the database migrations:

1. Go to your new Supabase project dashboard
2. Navigate to SQL Editor
3. Run each migration file from `supabase/migrations/` in order:
   - `20240923000001_create_game_completions_table.sql`
   - `20240923000002_create_leaderboard_view.sql` 
   - `20240923000003_create_utility_functions.sql`

## Troubleshooting

If you still see old data after updating:
- Clear browser cache and localStorage
- Check browser developer tools → Application → Local Storage
- Restart the development server
- Verify the new URLs are being used in Network tab