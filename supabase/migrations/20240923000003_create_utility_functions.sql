-- Optional: Add some useful functions for game statistics

-- Function to get player statistics
create or replace function public.get_player_stats(player_name_param text)
returns table(
    total_games bigint,
    best_time integer,
    best_moves integer,
    average_time numeric,
    average_moves numeric,
    first_played timestamp with time zone,
    last_played timestamp with time zone
) 
language sql
as $$
    select 
        count(*) as total_games,
        min(completion_time) as best_time,
        min(moves) as best_moves,
        round(avg(completion_time), 2) as average_time,
        round(avg(moves), 2) as average_moves,
        min(completed_at) as first_played,
        max(completed_at) as last_played
    from public.game_completions 
    where game_completions.player_name = player_name_param;
$$;

-- Function to get top players by completion time
create or replace function public.get_top_players(limit_count integer default 10)
returns table(
    rank bigint,
    player_name text,
    completion_time integer,
    moves integer,
    completed_at timestamp with time zone
)
language sql
as $$
    select 
        row_number() over (order by completion_time asc) as rank,
        gc.player_name,
        gc.completion_time,
        gc.moves,
        gc.completed_at
    from public.game_completions gc
    order by completion_time asc
    limit limit_count;
$$;

-- Function to get recent games
create or replace function public.get_recent_games(limit_count integer default 10)
returns table(
    player_name text,
    completion_time integer,
    moves integer,
    completed_at timestamp with time zone
)
language sql
as $$
    select 
        gc.player_name,
        gc.completion_time,
        gc.moves,
        gc.completed_at
    from public.game_completions gc
    order by completed_at desc
    limit limit_count;
$$;

-- Grant execute permissions
grant execute on function public.get_player_stats(text) to anon, authenticated;
grant execute on function public.get_top_players(integer) to anon, authenticated;
grant execute on function public.get_recent_games(integer) to anon, authenticated;