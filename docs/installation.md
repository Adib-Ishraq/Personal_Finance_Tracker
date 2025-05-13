# Installation Guide

This guide provides detailed instructions for installing and setting up the Personal Finance Tracker application.

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.11 or higher
- PostgreSQL database server
- Git (optional, for cloning the repository)
- pip (Python package manager)

## System Requirements

- **Operating System**: Windows, macOS, or Linux
- **Processor**: 1 GHz or faster
- **Memory**: 2 GB RAM or more recommended
- **Disk Space**: At least 500 MB free disk space
- **Internet Connection**: Required for installation and updates

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Personal-Finance-Tracker.git
cd Personal-Finance-Tracker
```

Alternatively, download and extract the ZIP file from the GitHub repository.

### 2. Set Up a Virtual Environment

It's recommended to use a virtual environment to manage dependencies:

#### Windows
```powershell
python -m venv myenv
myenv\Scripts\activate
```

#### macOS/Linux
```bash
python3 -m venv myenv
source myenv/bin/activate
```

### 3. Install Dependencies

With the virtual environment activated, install the required packages:

```bash
pip install -r requirements.txt
```

### 4. Set Up PostgreSQL

1. Install PostgreSQL if you haven't already
2. Create a new database for the application:
   ```sql
   CREATE DATABASE finance_tracker;
   CREATE USER finance_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE finance_tracker TO finance_user;
   ```

### 5. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DATABASE_URL=postgresql://finance_user:your_secure_password@localhost:5432/finance_tracker

# Application Security
SECRET_KEY=your_secure_random_key
FLASK_ENV=development

# Email Configuration (Optional)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password-or-email-password
```

### 6. Initialize the Database

Run the application to initialize the database schema:

```bash
python app.py
```

The application will create all necessary tables in the database.

### 7. Run the Application

```bash
python app.py
```

Or with Flask's development server:

```bash
flask run
```

The application should now be running at `http://localhost:5000`.

## Docker Installation (Alternative)

If you prefer using Docker:

1. Make sure Docker and Docker Compose are installed
2. Run the following command:
   ```bash
   docker-compose up -d
   ```
3. Access the application at `http://localhost:5000`

## Troubleshooting

### Common Issues

1. **Database Connection Errors**:
   - Verify your PostgreSQL connection parameters
   - Ensure PostgreSQL service is running
   - Check network permissions if using a remote database

2. **Dependency Issues**:
   - Make sure you're using a compatible Python version
   - Update pip: `pip install --upgrade pip`
   - Try installing dependencies one by one

3. **Port Already in Use**:
   - Change the port by setting the `PORT` environment variable
   - Check for other services using port 5000

For more detailed troubleshooting, refer to the [Troubleshooting Guide](troubleshooting.md).

## Next Steps

After installation, refer to the [Getting Started Guide](getting-started.md) for instructions on setting up your account and beginning to track your finances.