/**
 * API Client for Athletes Pair Match Backend
 * 
 * Replaces Supabase client with direct HTTP calls to FastAPI backend.
 * Maintains compatible response structure with Supabase for minimal frontend changes.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Game completion data structure (matches Supabase schema)
 */
export interface GameCompletion {
  id: string;
  player_name: string;
  completion_time: number;
  moves: number;
  completed_at: string;
}

/**
 * Response when creating a new game completion (includes rank info)
 */
export interface GameCompletionWithRank extends GameCompletion {
  rank?: number;
  total_players?: number;
}

/**
 * Rank calculation response
 */
export interface RankResponse {
  better_count: number;
  total_count: number;
  rank: number;
}

/**
 * Generic API error structure
 */
export interface ApiError {
  detail: string;
  message?: string;
}

/**
 * API response wrapper (matches Supabase structure)
 */
export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

/**
 * Save a new game completion to the leaderboard
 * 
 * @param playerName - Player's display name (3-16 characters)
 * @param completionTime - Time in seconds
 * @param moves - Number of card flips
 * @returns Response with saved game data and rank information
 */
export async function saveGameCompletion(
  playerName: string,
  completionTime: number,
  moves: number
): Promise<ApiResponse<GameCompletionWithRank>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/game-completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        player_name: playerName,
        completion_time: completionTime,
        moves: moves,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: null,
        error: {
          detail: errorData.detail || 'Failed to save game completion',
          message: errorData.message,
        },
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        detail: 'Network error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Get full leaderboard sorted by completion time (fastest first)
 * 
 * @returns Array of all game completions
 */
export async function getLeaderboard(): Promise<ApiResponse<GameCompletion[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/game-completions/leaderboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: null,
        error: {
          detail: errorData.detail || 'Failed to fetch leaderboard',
          message: errorData.message,
        },
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        detail: 'Network error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Calculate rank for a given completion time
 * 
 * @param completionTime - Time in seconds
 * @returns Rank information (better count, total count, rank)
 */
export async function calculateRank(
  completionTime: number
): Promise<ApiResponse<RankResponse>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/game-completions/rank?completion_time=${completionTime}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: null,
        error: {
          detail: errorData.detail || 'Failed to calculate rank',
          message: errorData.message,
        },
      };
    }

    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: {
        detail: 'Network error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    };
  }
}

/**
 * Count game completions with faster time (for ranking)
 * 
 * Helper function that mimics Supabase query pattern.
 * 
 * @param completionTime - Time to compare against
 * @returns Count of better completions
 */
export async function countBetterCompletions(
  completionTime: number
): Promise<ApiResponse<{ count: number }>> {
  const rankResult = await calculateRank(completionTime);
  
  if (rankResult.error || !rankResult.data) {
    return {
      data: null,
      error: rankResult.error || { detail: 'Unknown error' },
    };
  }

  return {
    data: { count: rankResult.data.better_count },
    error: null,
  };
}

/**
 * Get total count of game completions
 * 
 * Helper function that mimics Supabase count query.
 * 
 * @returns Total count of completions
 */
export async function getTotalCompletions(): Promise<ApiResponse<{ count: number }>> {
  const rankResult = await calculateRank(999999); // Use large number to get just the total
  
  if (rankResult.error || !rankResult.data) {
    return {
      data: null,
      error: rankResult.error || { detail: 'Unknown error' },
    };
  }

  return {
    data: { count: rankResult.data.total_count },
    error: null,
  };
}
