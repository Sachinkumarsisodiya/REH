import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

def get_database_uri():
    db_url = os.getenv('DATABASE_URL')
    
    if db_url:
        # Railway provides DATABASE_URL starting with postgres:// or postgresql://
        # SQLAlchemy requires postgresql:// prefix
        if db_url.startswith('postgres://'):
            db_url = db_url.replace('postgres://', 'postgresql://', 1)
        return db_url

    # Fallback to individual DB environment variables if configured
    db_host = os.getenv('DB_HOST')
    db_user = os.getenv('DB_USER')
    db_pass = os.getenv('DB_PASSWORD', '')
    db_name = os.getenv('DB_NAME')
    db_port = os.getenv('DB_PORT', '5432')

    if db_host and db_user and db_name:
        return f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"

    # Default fallback to SQLite for local development
    sqlite_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'reh_hospital.db')
    return f"sqlite:///{sqlite_path}"

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'reh-super-secret-hospital-jwt-key-2026')
    SQLALCHEMY_DATABASE_URI = get_database_uri()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'reh-jwt-auth-secret-key-998877')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
