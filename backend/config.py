import os
from datetime import timedelta
from dotenv import load_dotenv

# Locate and load the .env file if it exists
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config:
    # Flask configuration
    SECRET_KEY = os.environ.get('SECRET_KEY', 'default-flask-secret-key-please-change')
    DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() in ['true', '1', 'yes']

    # Database Configuration (MySQL preferred, SQLite fallback for easy local dev testing)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Check for DATABASE_URL environment variable
    db_url = os.environ.get('DATABASE_URL')
    if db_url:
        SQLALCHEMY_DATABASE_URI = db_url
    else:
        # Fallback to local SQLite database in the backend folder for immediate execution
        db_path = os.path.join(basedir, 'placify_dev.db')
        SQLALCHEMY_DATABASE_URI = f"sqlite:///{db_path}"
        print(f"WARNING: DATABASE_URL not set in .env. Falling back to local SQLite at: {db_path}")

    # JWT Configuration
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'default-jwt-secret-key-change-in-production')
    # Access tokens expire in 1 day by default
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)

    # File Upload Configuration
    # Defaults to 'uploads' folder in the backend directory
    UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', os.path.join(basedir, 'uploads'))
    # Max size allowed: 16 MB (16 * 1024 * 1024 bytes)
    MAX_CONTENT_LENGTH = int(os.environ.get('MAX_CONTENT_LENGTH', 16 * 1024 * 1024))

    # Gemini Configuration
    GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')

