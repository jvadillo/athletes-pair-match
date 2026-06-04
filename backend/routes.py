from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from datetime import datetime

from database import get_db, GameCompletion
from models import (
    GameCompletionCreate,
    GameCompletionResponse,
    GameCompletionWithRank,
    RankResponse,
    HealthResponse
)
from slowapi import Limiter
from slowapi.util import get_remote_address

# Rate limiter setup
limiter = Limiter(key_func=get_remote_address)

# Router
router = APIRouter(prefix="/api")


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """
    Health check endpoint.
    Returns API status and timestamp.
    """
    return {
        "status": "ok",
        "timestamp": datetime.utcnow()
    }


@router.post("/game-completions", response_model=GameCompletionWithRank)
@limiter.limit("10/minute")
async def create_game_completion(
    request: Request,
    game_data: GameCompletionCreate,
    db: Session = Depends(get_db)
):
    """
    Save a new game completion and return rank information.
    
    Rate limit: 10 requests per minute per IP.
    
    Returns the saved record with calculated rank and total players.
    """
    try:
        # Create new game completion
        new_completion = GameCompletion(
            player_name=game_data.player_name,
            completion_time=game_data.completion_time,
            moves=game_data.moves
        )
        
        db.add(new_completion)
        db.commit()
        db.refresh(new_completion)
        
        # Calculate rank (count how many players have better time)
        better_count = db.query(func.count(GameCompletion.id)).filter(
            GameCompletion.completion_time < game_data.completion_time
        ).scalar()
        
        # Get total number of completions
        total_count = db.query(func.count(GameCompletion.id)).scalar()
        
        # Rank is better_count + 1
        rank = better_count + 1
        
        # Return response matching Supabase structure
        return {
            "id": new_completion.id,
            "player_name": new_completion.player_name,
            "completion_time": new_completion.completion_time,
            "moves": new_completion.moves,
            "completed_at": new_completion.completed_at,
            "rank": rank,
            "total_players": total_count
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to save game completion: {str(e)}")


@router.get("/game-completions/leaderboard", response_model=List[GameCompletionResponse])
@limiter.limit("30/minute")
async def get_leaderboard(
    request: Request,
    db: Session = Depends(get_db)
):
    """
    Get full leaderboard sorted by completion time (fastest first).
    
    Rate limit: 30 requests per minute per IP.
    
    Returns all game completions in ascending order by completion_time.
    """
    try:
        completions = db.query(GameCompletion).order_by(
            GameCompletion.completion_time.asc()
        ).all()
        
        # Convert to response format (snake_case matches Supabase)
        return [
            {
                "id": c.id,
                "player_name": c.player_name,
                "completion_time": c.completion_time,
                "moves": c.moves,
                "completed_at": c.completed_at
            }
            for c in completions
        ]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch leaderboard: {str(e)}")


@router.get("/game-completions/rank", response_model=RankResponse)
@limiter.limit("30/minute")
async def get_rank(
    request: Request,
    completion_time: int,
    db: Session = Depends(get_db)
):
    """
    Calculate rank for a given completion time.
    
    Rate limit: 30 requests per minute per IP.
    
    Query params:
    - completion_time: Time in seconds to calculate rank for
    
    Returns count of better times, total count, and calculated rank.
    """
    try:
        # Count players with better (faster) time
        better_count = db.query(func.count(GameCompletion.id)).filter(
            GameCompletion.completion_time < completion_time
        ).scalar()
        
        # Get total count
        total_count = db.query(func.count(GameCompletion.id)).scalar()
        
        # Calculate rank
        rank = better_count + 1
        
        return {
            "better_count": better_count,
            "total_count": total_count,
            "rank": rank
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to calculate rank: {str(e)}")
