import os
import logging
from dotenv import load_dotenv
from db_config import get_db_url

# Configure logger
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    
    # Database connection - supports Neon, Render, and other PostgreSQL providers
    _db_url = os.getenv('DATABASE_URL', '')
    # Handle postgres:// -> postgresql:// (some providers use the old prefix)
    if _db_url.startswith('postgres://'):
        _db_url = _db_url.replace('postgres://', 'postgresql://', 1)
    # Append sslmode if not already present
    if _db_url and '?sslmode=' not in _db_url and '&sslmode=' not in _db_url:
        _db_url += '?sslmode=require'
    SQLALCHEMY_DATABASE_URI = _db_url
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Mail settings
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    MAIL_USE_TLS = True
    
    # Development settings
    DEBUG = os.environ.get('FLASK_ENV') == 'development'
    
    # Define behavior based on environment
    @classmethod
    def init_app(cls, app):
        # Initialize any app-specific configuration here if needed
        pass