import os
import logging
from dotenv import load_dotenv

# Configure logger
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

def get_db_url():
    """
    Returns the database URL for SQLAlchemy.
    Only uses PostgreSQL.
    
    Format for PostgreSQL: postgresql://[user]:[password]@[host]:[port]/[database]
    """
    # Using only PostgreSQL database
    local_db_url = os.environ.get('DATABASE_URL')
    if local_db_url and local_db_url.startswith('postgresql://'):
        logger.info("Using PostgreSQL database")
        return local_db_url
    
    # No fallback to SQLite anymore
    logger.error("PostgreSQL DATABASE_URL not found or invalid. Please set a valid DATABASE_URL environment variable.")
    raise ValueError("Missing required PostgreSQL DATABASE_URL environment variable.")