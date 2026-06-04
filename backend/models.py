from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional


class GameCompletionCreate(BaseModel):
    """
    Schema for creating a new game completion record.
    Validates input from frontend.
    """
    player_name: str = Field(..., min_length=3, max_length=16)
    completion_time: int = Field(..., gt=0, description="Time in seconds")
    moves: int = Field(..., gt=0, description="Number of card flips")
    
    @field_validator('player_name')
    @classmethod
    def validate_player_name(cls, v: str) -> str:
        """Ensure player name contains only valid characters."""
        if not v.strip():
            raise ValueError("Player name cannot be empty")
        # Allow letters, numbers, spaces, and basic punctuation
        allowed_chars = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 .-_")
        if not all(c in allowed_chars for c in v):
            raise ValueError("Player name contains invalid characters")
        return v.strip()


class GameCompletionResponse(BaseModel):
    """
    Schema for game completion response.
    Matches Supabase response structure exactly (snake_case).
    """
    id: str
    player_name: str
    completion_time: int
    moves: int
    completed_at: datetime
    
    class Config:
        from_attributes = True  # Allows creating from SQLAlchemy models


class GameCompletionWithRank(GameCompletionResponse):
    """
    Extended response that includes rank information.
    Used when saving a new game completion.
    """
    rank: Optional[int] = None
    total_players: Optional[int] = None


class RankResponse(BaseModel):
    """
    Response for rank calculation endpoint.
    """
    better_count: int
    total_count: int
    rank: int


class HealthResponse(BaseModel):
    """
    Health check response.
    """
    status: str
    timestamp: datetime
