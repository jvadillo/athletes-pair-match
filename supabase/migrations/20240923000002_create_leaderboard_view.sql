-- Optional: Create a view for leaderboard rankings
create or replace view public.leaderboard as
select 
    rank() over (order by completion_time asc) as rank,
    player_name,
    completion_time,
    moves,
    completed_at,
    id
from public.game_completions
order by completion_time asc;

-- Grant access to the view
grant select on public.leaderboard to anon, authenticated;

-- Add policy for the view (if needed)
comment on view public.leaderboard is 'Leaderboard view showing game completions ranked by completion time';