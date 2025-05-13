# Development Guide

This guide provides information for developers who want to contribute to or extend the Personal Finance Tracker application.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Project Structure](#project-structure)
3. [Coding Standards](#coding-standards)
4. [Adding New Features](#adding-new-features)
5. [Testing](#testing)
6. [Documentation](#documentation)
7. [Deployment](#deployment)
8. [Contributing](#contributing)

## Development Environment Setup

### Prerequisites

- Python 3.11 or higher
- PostgreSQL database
- Git
- pip (Python package manager)
- A code editor (VS Code, PyCharm, etc.)

### Setting Up Your Development Environment

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Personal-Finance-Tracker.git
   cd Personal-Finance-Tracker
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv dev-env
   # On Windows
   dev-env\Scripts\activate
   # On macOS/Linux
   source dev-env/bin/activate
   ```

3. **Install development dependencies**
   ```bash
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # Install development tools
   ```

4. **Set up a local database**
   ```sql
   CREATE DATABASE finance_tracker_dev;
   CREATE USER dev_user WITH PASSWORD 'dev_password';
   GRANT ALL PRIVILEGES ON DATABASE finance_tracker_dev TO dev_user;
   ```

5. **Configure environment variables**
   Create a `.env.dev` file:
   ```
   DATABASE_URL=postgresql://dev_user:dev_password@localhost:5432/finance_tracker_dev
   SECRET_KEY=dev_secret_key
   FLASK_ENV=development
   DEBUG=True
   ```

6. **Initialize the database**
   ```bash
   python app.py
   ```

## Project Structure

The application follows a modular structure:

```
Personal-Finance-Tracker/
├── app.py                 # Application entry point
├── config.py              # Configuration settings
├── db_config.py           # Database configuration
├── models.py              # Database models
├── routes/                # Route definitions
│   ├── __init__.py        # Registers all blueprints
│   ├── auth.py            # Authentication routes
│   ├── budgets.py         # Budget management routes
│   ├── debts.py           # Debt management routes
│   ├── goals.py           # Financial goals routes
│   ├── investments.py     # Investment tracking routes
│   ├── main.py            # Main/dashboard routes
│   └── transactions.py    # Transaction management routes
├── forms.py               # Form definitions
├── static/                # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── img/               # Images
├── templates/             # HTML templates
│   ├── base.html          # Base template
│   ├── index.html         # Homepage
│   ├── dashboard.html     # Dashboard
│   ├── auth/              # Authentication templates
│   ├── budgets/           # Budget templates
│   └── ...
├── tests/                 # Test suite
├── utils/                 # Utility functions
├── docs/                  # Documentation
└── requirements.txt       # Dependencies
```

## Coding Standards

### Python Style Guide

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guidelines
- Use 4 spaces for indentation
- Maximum line length of 88 characters (compatible with Black formatter)
- Use docstrings for functions and classes

### Flask Best Practices

- Use Blueprints for modular code organization
- Keep routes simple, with business logic in separate modules
- Use Flask extensions for common functionality
- Follow RESTful design principles for APIs

### JavaScript Style Guide

- Use ES6 syntax when possible
- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use camelCase for variable and function names

### CSS/SCSS Guidelines

- Use a consistent naming convention (BEM recommended)
- Organize styles logically by component or feature
- Minimize use of !important

## Adding New Features

### Creating a New Module

1. **Create a new route file**
   Create a new file in the `routes/` directory for your feature

2. **Create models**
   Add new models to `models.py` or create a dedicated models file if extensive

3. **Create templates**
   Add templates in the `templates/` directory, using a subdirectory for your feature

4. **Register blueprints**
   Update `routes/__init__.py` to include your new blueprint

### Example: Adding a New Feature

Let's say you want to add a recurring transactions feature:

1. Create `routes/recurring.py`:
   ```python
   from flask import Blueprint, render_template, request, flash, redirect, url_for
   from flask_login import login_required, current_user
   from models import db, RecurringTransaction

   recurring = Blueprint('recurring', __name__, url_prefix='/recurring')

   @recurring.route('/')
   @login_required
   def index():
       recurring_transactions = RecurringTransaction.query.filter_by(user_id=current_user.id).all()
       return render_template('recurring/index.html', recurring_transactions=recurring_transactions)

   @recurring.route('/new', methods=['GET', 'POST'])
   @login_required
   def new():
       # Implementation here
       pass
   ```

2. Update `routes/__init__.py`:
   ```python
   from routes.recurring import recurring

   def register_blueprints(app):
       # Existing blueprints
       app.register_blueprint(recurring)
   ```

3. Create templates in `templates/recurring/`

## Testing

### Test Structure

Tests are organized in the `tests/` directory:

```
tests/
├── __init__.py
├── conftest.py           # Fixtures and configuration
├── test_models.py        # Database model tests
├── test_routes/          # Route tests
│   ├── __init__.py
│   ├── test_auth.py
│   └── ...
└── test_utils.py         # Utility function tests
```

### Running Tests

```bash
# Run all tests
python -m pytest

# Run specific tests
python -m pytest tests/test_models.py

# Run with coverage report
python -m pytest --cov=. --cov-report=term-missing
```

### Writing Tests

Example test for a model:

```python
def test_user_creation(db_session):
    user = User(username="testuser", email="test@example.com")
    user.set_password("password123")
    db_session.add(user)
    db_session.commit()
    
    saved_user = User.query.filter_by(username="testuser").first()
    assert saved_user is not None
    assert saved_user.check_password("password123")
```

## Documentation

### Code Documentation

- Use docstrings for all functions, classes, and modules
- Include type hints where appropriate
- Document complex logic or algorithms

Example:

```python
def calculate_budget_progress(user_id: int, month: int, year: int) -> dict:
    """
    Calculate budget progress for a specific user and time period.
    
    Args:
        user_id: The ID of the user
        month: Month (1-12)
        year: Year (e.g., 2023)
        
    Returns:
        Dictionary containing budget progress metrics
    """
    # Implementation
```

### Project Documentation

Project documentation is maintained in the `docs/` directory using Markdown:

1. Update docs when adding new features
2. Keep the README.md up to date
3. Document API endpoints for integrations

## Deployment

### Development Deployment

For local development:
```bash
python app.py
```

### Production Deployment

Options for production deployment:

1. **Docker**:
   ```bash
   docker-compose up -d
   ```

2. **Railway**:
   Connect your GitHub repository to Railway and deploy automatically.

3. **Render**:
   Set up a web service in Render dashboard with the command:
   ```
   gunicorn app:app
   ```

4. **Traditional VPS/Cloud**:
   - Set up a WSGI server (Gunicorn, uWSGI)
   - Configure a reverse proxy (Nginx, Apache)
   - Use a process manager (Supervisor, systemd)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For more details, see the [CONTRIBUTING.md](../CONTRIBUTING.md) file in the project root.

---

Happy coding! If you have questions, feel free to open an issue or contact the maintainers.
