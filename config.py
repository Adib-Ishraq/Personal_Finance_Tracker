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
    
    # Database connection - Render only
    SQLALCHEMY_DATABASE_URI =os.getenv('DATABASE_URL') + "?sslmode=require"
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