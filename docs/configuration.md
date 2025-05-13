# Configuration Guide

This guide explains how to configure the Personal Finance Tracker application to suit your needs.

## Environment Variables

The application's behavior can be customized through environment variables defined in a `.env` file at the root of the project directory.

### Core Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | None | Yes |
| `SECRET_KEY` | Secret key for session security | None | Yes |
| `FLASK_ENV` | Application environment (development/production) | development | No |
| `DEBUG` | Enable debug mode | False in production | No |
| `PORT` | Port to run the application on | 5000 | No |

### Database Configuration

The `DATABASE_URL` follows this format:
```
postgresql://username:password@host:port/database_name
```

Examples:
- Local database: `postgresql://finance_user:password@localhost:5432/finance_tracker`
- Remote database: `postgresql://finance_user:password@db.example.com:5432/finance_tracker`

### Email Configuration

| Variable | Description | Default | Required for Email |
|----------|-------------|---------|----------|
| `MAIL_SERVER` | SMTP server address | smtp.gmail.com | Yes |
| `MAIL_PORT` | SMTP server port | 587 | Yes |
| `MAIL_USERNAME` | Email username/address | None | Yes |
| `MAIL_PASSWORD` | Email password or app password | None | Yes |
| `MAIL_USE_TLS` | Use TLS encryption | True | No |
| `MAIL_USE_SSL` | Use SSL encryption | False | No |

### Security Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `BCRYPT_LOG_ROUNDS` | Number of bcrypt hashing rounds | 12 | No |
| `SESSION_COOKIE_SECURE` | Only send cookies over HTTPS | True in production | No |
| `REMEMBER_COOKIE_DURATION` | Remember me cookie duration (seconds) | 2592000 (30 days) | No |

## Application Configuration

The application configuration is defined in `config.py`. This file loads the environment variables and sets defaults.

### Configuration Classes

- `Config`: Base configuration class with common settings
- `DevelopmentConfig`: Configuration for development environment
- `ProductionConfig`: Configuration for production environment
- `TestingConfig`: Configuration for running tests

## Database Configuration

Database models and schema are defined in `models.py`. Any changes to the database structure should be made in this file.

To apply database migrations:

1. Make changes to models
2. Run the application with `python app.py` to create new tables
3. For complex migrations, use a tool like Alembic

## Customization Options

### Locale and Currency

The default currency and locale settings can be changed in the user profile settings.

### Theme Customization

Custom themes can be defined in the `static/css` directory.

### Transaction Categories

Default transaction categories can be modified in the application settings.

## Advanced Configuration

### Logging

Logging is configured in `app.py`. By default, logs are written to the console.

To change logging settings:

```python
logging.basicConfig(
    level=logging.INFO,  # Change to logging.DEBUG for more verbose logs
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log'  # Uncomment to write logs to a file
)
```

### CORS Configuration

For API access from other domains, CORS settings can be configured by installing Flask-CORS.

### Session Configuration

Flask session settings can be customized in `config.py`:

```python
SESSION_TYPE = 'filesystem'
SESSION_PERMANENT = True
PERMANENT_SESSION_LIFETIME = timedelta(days=31)
```

## Configuration Files Reference

- `app.py`: Main application entry point and initialization
- `config.py`: Configuration settings
- `db_config.py`: Database connection settings
- `models.py`: Database models and schema
- `.env`: Environment variables (not included in version control)