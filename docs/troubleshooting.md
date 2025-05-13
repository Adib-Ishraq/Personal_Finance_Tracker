# Troubleshooting Guide

This guide provides solutions to common issues you might encounter when using or deploying the Personal Finance Tracker application.

## Table of Contents

1. [Installation Issues](#installation-issues)
2. [Database Connection Problems](#database-connection-problems)
3. [Authentication Issues](#authentication-issues)
4. [Transaction Management Problems](#transaction-management-problems)
5. [Performance Issues](#performance-issues)
6. [Deployment Challenges](#deployment-challenges)
7. [Email Notification Issues](#email-notification-issues)
8. [Mobile Compatibility](#mobile-compatibility)
9. [API Integration Problems](#api-integration-problems)

## Installation Issues

### Python Version Compatibility

**Problem**: Installation fails with Python version errors.

**Solution**: 
- Ensure you're using Python 3.11 or higher
- Check your Python version with `python --version`
- Create a new virtual environment with the correct Python version:
  ```bash
  python3.11 -m venv myenv
  ```

### Package Installation Failures

**Problem**: pip install fails with dependency errors.

**Solution**:
1. Update pip:
   ```bash
   pip install --upgrade pip
   ```

2. Install packages one by one to identify the problematic dependency:
   ```bash
   pip install flask
   pip install flask-sqlalchemy
   # etc.
   ```

3. Check for platform-specific issues:
   - Windows users might need Microsoft C++ Build Tools for some packages
   - Linux users might need development libraries (`apt install python3-dev`)

## Database Connection Problems

### Connection Refused

**Problem**: "Connection refused" error when connecting to PostgreSQL.

**Solution**:
1. Verify PostgreSQL is running:
   ```bash
   # On Linux
   sudo service postgresql status
   # On Windows
   sc query postgresql
   ```

2. Check your connection string:
   - Correct format: `postgresql://username:password@host:port/database`
   - Default port is 5432
   - Localhost connection: `postgresql://username:password@localhost:5432/database`

3. Ensure the database exists:
   ```sql
   CREATE DATABASE finance_tracker;
   ```

4. Check PostgreSQL authentication settings in pg_hba.conf

### Authentication Failed

**Problem**: "Authentication failed" error with PostgreSQL.

**Solution**:
1. Verify username and password:
   ```sql
   ALTER USER username WITH PASSWORD 'new_password';
   ```

2. Ensure the user has permissions for the database:
   ```sql
   GRANT ALL PRIVILEGES ON DATABASE finance_tracker TO username;
   ```

### Table Does Not Exist

**Problem**: "Relation (table) does not exist" error.

**Solution**:
1. Ensure tables are created by running:
   ```bash
   python app.py
   ```

2. Check database migration status:
   ```bash
   # If using Flask-Migrate
   flask db stamp head
   flask db migrate
   flask db upgrade
   ```

## Authentication Issues

### Registration Errors

**Problem**: Cannot register new user accounts.

**Solution**:
1. Check if email is already registered
2. Ensure password meets complexity requirements
3. Verify email service configuration if email verification is required

### Login Failures

**Problem**: Cannot log in with valid credentials.

**Solution**:
1. Reset password if forgotten
2. Check if account is locked or inactive
3. Clear browser cookies and cache
4. Ensure correct case for username/email (case-sensitive)

### Session Expiration

**Problem**: Sessions expire too quickly or don't persist.

**Solution**:
1. Check session timeout settings in config.py
2. Ensure cookies are not being blocked by browser
3. Verify SECRET_KEY is properly set in environment variables

## Transaction Management Problems

### Transactions Not Saving

**Problem**: Transactions disappear after being added.

**Solution**:
1. Check database connection stability
2. Verify form submission is complete (all required fields)
3. Look for validation errors in the server logs
4. Check transaction date range filters (might be filtering out your new transaction)

### Balance Discrepancies

**Problem**: Account balances don't match expected values.

**Solution**:
1. Verify all transactions are accounted for
2. Check for duplicate transactions
3. Ensure transfers between accounts are properly recorded
4. Run the balance recalculation function:
   ```python
   # In Python shell or script
   from models import Account, Transaction
   from app import create_app, db
   
   app = create_app()
   with app.app_context():
       # For each account
       accounts = Account.query.all()
       for account in accounts:
           # Calculate balance from transactions
           transactions = Transaction.query.filter_by(account_id=account.id).all()
           calculated_balance = sum([t.amount for t in transactions])
           print(f"Account: {account.name}, Current: {account.balance}, Calculated: {calculated_balance}")
           # Update if necessary
           if account.balance != calculated_balance:
               account.balance = calculated_balance
               db.session.commit()
   ```

## Performance Issues

### Slow Page Loading

**Problem**: Dashboard or transaction pages load slowly.

**Solution**:
1. Optimize database queries:
   - Add appropriate indexes
   - Limit transaction history displayed
   - Use pagination

2. Check server resources:
   - CPU utilization
   - Memory usage
   - Disk I/O

3. Implement caching:
   - Add Redis or Memcached for frequently accessed data
   - Cache budget calculations and reports

### High Memory Usage

**Problem**: Application consumes excessive memory.

**Solution**:
1. Optimize database queries to reduce result set sizes
2. Implement pagination for large data sets
3. Close database connections properly after use
4. Monitor for memory leaks with tools like memory_profiler

## Deployment Challenges

### Railway Deployment Issues

**Problem**: Application fails to deploy on Railway.

**Solution**:
1. Check build logs for errors
2. Verify environment variables are correctly set
3. Ensure PostgreSQL add-on is provisioned
4. Check if your environment variables are configured correctly in the Railway dashboard

### Render Deployment Issues

**Problem**: Application fails to deploy on Render.

**Solution**:
1. Verify the start command is correct (`gunicorn app:app`)
2. Check if environment variables are set properly
3. Ensure database connection is configured correctly
4. Look for Python version compatibility issues

### Docker Deployment Issues

**Problem**: Docker container fails to start or run correctly.

**Solution**:
1. Check Docker logs:
   ```bash
   docker logs container_name
   ```

2. Verify Dockerfile and docker-compose.yml configurations
3. Ensure environment variables are passed to the container
4. Check network configuration for database connection

## Email Notification Issues

### Emails Not Being Sent

**Problem**: Application is not sending email notifications.

**Solution**:
1. Verify email configuration in .env file:
   ```
   MAIL_SERVER=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   MAIL_USE_TLS=True
   ```

2. For Gmail, ensure you're using App Passwords if 2FA is enabled
3. Check server logs for SMTP errors
4. Test email configuration:
   ```python
   from flask_mail import Mail, Message
   from app import create_app
   
   app = create_app()
   mail = Mail(app)
   
   with app.app_context():
       msg = Message("Test Email", 
                     sender="your-email@gmail.com",
                     recipients=["test@example.com"])
       msg.body = "This is a test email from Personal Finance Tracker"
       mail.send(msg)
   ```

## Mobile Compatibility

### Display Issues on Mobile Devices

**Problem**: UI elements are not rendering correctly on mobile.

**Solution**:
1. Check responsive design implementation
2. Test on different screen sizes and devices
3. Verify CSS media queries are working properly
4. Consider using Bootstrap's responsive utility classes

### Touch Interactions Not Working

**Problem**: Buttons or interactive elements don't respond to touch on mobile.

**Solution**:
1. Ensure elements have proper touch event handlers
2. Add sufficient padding around clickable elements (at least 44x44 pixels)
3. Check for z-index issues with overlapping elements
4. Test with different mobile browsers

## API Integration Problems

### API Authentication Failures

**Problem**: Cannot authenticate with the API.

**Solution**:
1. Verify token generation and validation process
2. Check token expiration settings
3. Ensure proper Authorization headers are sent:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

### API Rate Limiting Issues

**Problem**: Receiving too many 429 (Rate Limit Exceeded) errors.

**Solution**:
1. Implement request batching to reduce API calls
2. Add exponential backoff and retry logic
3. Cache API responses when appropriate
4. Monitor and optimize API usage patterns

### CORS Issues with API

**Problem**: Browser blocks API requests due to CORS policy.

**Solution**:
1. Ensure CORS is properly configured on the server:
   ```python
   from flask_cors import CORS
   
   app = Flask(__name__)
   CORS(app, resources={r"/api/*": {"origins": "*"}})
   ```

2. For production, restrict origins to specific domains
3. Ensure preflight OPTIONS requests are handled correctly

## Additional Troubleshooting Resources

If you're still experiencing issues after trying these solutions:

1. Check the application logs for detailed error messages
2. Review the GitHub repository issues to see if others have reported similar problems
3. Consult the Flask and SQLAlchemy documentation for specific framework issues
4. Reach out to the community for support

## Diagnostic Tools

### Database Check

Run this script to verify database integrity:

```python
from app import create_app, db
from models import User, Account, Transaction, Category, Budget

app = create_app()
with app.app_context():
    print("Checking database connections...")
    try:
        # Test database connection
        db.session.execute("SELECT 1")
        print("Database connection successful!")
        
        # Count records in main tables
        user_count = User.query.count()
        account_count = Account.query.count()
        transaction_count = Transaction.query.count()
        category_count = Category.query.count()
        budget_count = Budget.query.count()
        
        print(f"Users: {user_count}")
        print(f"Accounts: {account_count}")
        print(f"Transactions: {transaction_count}")
        print(f"Categories: {category_count}")
        print(f"Budgets: {budget_count}")
        
    except Exception as e:
        print(f"Database check failed: {e}")
```

### Application Health Check

Use this route to verify the application is working correctly:

```python
@app.route('/health')
def health_check():
    status = {
        "status": "ok",
        "database": "connected" if check_db_connection() else "error",
        "version": "1.0.0",
    }
    return jsonify(status)
```

## Contact Support

If you continue to experience issues, please:

1. Gather relevant error logs
2. Take screenshots of any error messages
3. Document the steps to reproduce the issue
4. Contact support at support@personalfinancetracker.example.com
