from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables.
    """
    # Database
    database_url: str = "postgresql://user:password@localhost:5432/athletes_match_db"
    
    # API
    secret_key: str = "change-this-secret-key"
    api_port: int = 8000
    
    # CORS
    cors_origins: str = "http://localhost:5173"
    
    # Rate Limiting
    rate_limit_per_minute: int = 60
    
    # Logging
    log_level: str = "INFO"
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Convert comma-separated CORS origins to list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
