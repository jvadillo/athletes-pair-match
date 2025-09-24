-- Database Setup Verification Script
-- Run this script after setting up the database to verify everything is working correctly

-- 1. Verify table exists and has correct structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' AND table_name = 'game_completions'
ORDER BY ordinal_position;

-- 2. Verify indexes exist
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'game_completions' AND schemaname = 'public';

-- 3. Verify RLS is enabled
SELECT 
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'game_completions' AND schemaname = 'public';

-- 4. Verify policies exist
SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'game_completions' AND schemaname = 'public';

-- 5. Verify view exists
SELECT 
    table_name,
    view_definition
FROM information_schema.views 
WHERE table_schema = 'public' AND table_name = 'leaderboard';

-- 6. Verify functions exist
SELECT 
    routine_name,
    routine_type,
    data_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('get_player_stats', 'get_top_players', 'get_recent_games');

-- 7. Test basic functionality with sample data
-- Insert test records
INSERT INTO game_completions (player_name, completion_time, moves) VALUES
('Alice Test', 95, 18),
('Bob Test', 120, 22),
('Charlie Test', 85, 16)
ON CONFLICT (id) DO NOTHING;

-- Verify data was inserted
SELECT COUNT(*) as total_records FROM game_completions WHERE player_name LIKE '%Test';

-- Test leaderboard view
SELECT rank, player_name, completion_time, moves 
FROM leaderboard 
WHERE player_name LIKE '%Test'
ORDER BY rank;

-- Test utility functions
SELECT * FROM get_top_players(5);
SELECT * FROM get_player_stats('Alice Test');
SELECT * FROM get_recent_games(5);

-- Clean up test data (optional)
-- DELETE FROM game_completions WHERE player_name LIKE '%Test';

-- Success message
SELECT 'Database setup verification completed successfully!' as status;