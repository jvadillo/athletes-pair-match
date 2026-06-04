from sqlalchemy import create_engine, Column, Integer, String, DateTime, Index
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func
from datetime import datetime
from config import settings
import uuid


# Database engine
engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,  # Verify connections before using
    pool_size=5,
    max_overflow=10
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()


# Database Models
class GameCompletion(Base):
    """
    Model for game completion records.
    Matches Supabase schema exactly.
    """
    __tablename__ = "game_completions"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    player_name = Column(String, nullable=False)
    completion_time = Column(Integer, nullable=False)  # Time in seconds
    moves = Column(Integer, nullable=False)  # Number of card flips
    completed_at = Column(DateTime, nullable=False, default=datetime.utcnow, server_default=func.now())
    
    # Indexes for performance (matching Supabase)
    __table_args__ = (
        Index('idx_game_completions_completion_time', 'completion_time'),
        Index('idx_game_completions_completed_at', 'completed_at'),
        Index('idx_game_completions_player_name', 'player_name'),
    )


# Dependency to get database session
def get_db():
    """
    Dependency that provides a database session.
    Automatically closes session after request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Initialize database (create tables)
def init_db():
    """
    Create all tables in the database.
    Call this on application startup.
    """
    Base.metadata.create_all(bind=engine)
