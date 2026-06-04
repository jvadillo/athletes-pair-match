-- Migration: Create game_completions table
-- Description: Initial schema for Athletes Pair Match leaderboard
-- Date: 2026-01-13

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create game_completions table
CREATE TABLE IF NOT EXISTS game_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    player_name VARCHAR(255) NOT NULL,
    completion_time INTEGER NOT NULL CHECK (completion_time > 0),
    moves INTEGER NOT NULL CHECK (moves > 0),
    completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_game_completions_completion_time 
    ON game_completions(completion_time);

CREATE INDEX IF NOT EXISTS idx_game_completions_completed_at 
    ON game_completions(completed_at DESC);

CREATE INDEX IF NOT EXISTS idx_game_completions_player_name 
    ON game_completions(player_name);

-- Add comments for documentation
COMMENT ON TABLE game_completions IS 'Stores game completion records for the Athletes Pair Match leaderboard';
COMMENT ON COLUMN game_completions.id IS 'Unique identifier for each game completion';
COMMENT ON COLUMN game_completions.player_name IS 'Display name of the player (3-16 characters)';
COMMENT ON COLUMN game_completions.completion_time IS 'Time taken to complete the game in seconds';
COMMENT ON COLUMN game_completions.moves IS 'Number of card flips made during the game';
COMMENT ON COLUMN game_completions.completed_at IS 'Timestamp when the game was completed';
