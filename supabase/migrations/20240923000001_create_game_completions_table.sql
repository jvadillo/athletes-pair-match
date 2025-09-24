-- Create the game_completions table
create table public.game_completions (
    id uuid default gen_random_uuid() primary key,
    player_name text not null,
    completion_time integer not null,
    moves integer not null,
    completed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add indexes for better query performance
create index idx_game_completions_completion_time on public.game_completions(completion_time);
create index idx_game_completions_completed_at on public.game_completions(completed_at);
create index idx_game_completions_player_name on public.game_completions(player_name);

-- Enable Row Level Security
alter table public.game_completions enable row level security;

-- Create policy to allow anyone to read game completions (for leaderboard)
create policy "Anyone can view game completions" on public.game_completions
    for select using (true);

-- Create policy to allow anyone to insert game completions (for saving scores)
create policy "Anyone can insert game completions" on public.game_completions
    for insert with check (true);

-- Add helpful comments
comment on table public.game_completions is 'Stores completed game records with player names, completion times, and moves';
comment on column public.game_completions.id is 'Unique identifier for each game completion';
comment on column public.game_completions.player_name is 'Name of the player who completed the game';
comment on column public.game_completions.completion_time is 'Time taken to complete the game in seconds';
comment on column public.game_completions.moves is 'Number of moves (card flips) made during the game';
comment on column public.game_completions.completed_at is 'Timestamp when the game was completed';