import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'reh-super-secret-hospital-jwt-key-2026')
    # Default to SQLite for seamless local execution, configurable to MySQL via DATABASE_URL env var
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        f"sqlite:///{os.path.join(os.path.abspath(os.path.dirname(__file__)), 'reh_hospital.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'reh-jwt-auth-secret-key-998877')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
