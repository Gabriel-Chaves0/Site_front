from decouple import config as env

class Settings:
    DATABASE_URL = env("DATABASE_URL", default="sqlite:///database.db", cast=str)