from decouple import config as env


class Settings:
    DATABASE_URL = env("DATABASE_URL", default="sqlite:///./app.db")
    FRONTEND_ORIGIN = env("FRONTEND_ORIGIN", default="http://localhost:5173")
    DEVELOPING = env("DEVELOPING", default=True, cast=bool)
