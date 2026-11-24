from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "CampusConnect API"
    database_url: str = "postgresql+psycopg://campusconnect:change-this-local-password@localhost:5432/campusconnect"
    cors_origins: str = "http://localhost:8081,http://localhost:19006,http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
