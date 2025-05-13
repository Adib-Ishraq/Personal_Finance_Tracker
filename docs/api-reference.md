# API Reference

This document provides a comprehensive reference for the Personal Finance Tracker API endpoints.

## Authentication

All API endpoints (except `/api/auth/login` and `/api/auth/register`) require authentication using an access token.

### Authentication Header

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Obtaining a Token

**Endpoint**: `POST /api/auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "your_secure_password"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "user@example.com"
  }
}
```

## Base URL

All endpoints are relative to the base URL: `/api`

## Data Format

- All requests and responses are in JSON format
- Dates are in ISO 8601 format (`YYYY-MM-DD`)
- All monetary values are in the user's preferred currency

## Endpoints

### User Management

#### Register a new user

**Endpoint**: `POST /api/auth/register`

**Request Body**:
```json
{
  "username": "johndoe",
  "email": "user@example.com",
  "password": "your_secure_password",
  "first_name": "John",
  "last_name": "Doe",
  "currency": "USD"
}
```

**Response**:
```json
{
  "status": "success",
  "message": "User registered successfully",
  "user_id": 1
}
```

#### Get user profile

**Endpoint**: `GET /api/users/profile`

**Response**:
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "date_joined": "2023-01-15T10:30:00Z",
  "currency": "USD"
}
```

#### Update user profile

**Endpoint**: `PUT /api/users/profile`

**Request Body**:
```json
{
  "first_name": "John",
  "last_name": "Smith",
  "currency": "EUR"
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Profile updated successfully"
}
```

### Accounts

#### List all accounts

**Endpoint**: `GET /api/accounts`

**Response**:
```json
[
  {
    "id": 1,
    "name": "Checking Account",
    "type": "checking",
    "balance": 2500.75,
    "currency": "USD",
    "is_active": true
  },
  {
    "id": 2,
    "name": "Savings Account",
    "type": "savings",
    "balance": 10000.00,
    "currency": "USD",
    "is_active": true
  }
]
```

#### Get account details

**Endpoint**: `GET /api/accounts/{account_id}`

**Response**:
```json
{
  "id": 1,
  "name": "Checking Account",
  "type": "checking",
  "balance": 2500.75,
  "currency": "USD",
  "is_active": true,
  "created_at": "2023-01-15T10:30:00Z",
  "updated_at": "2023-05-10T14:25:30Z",
  "notes": "Main spending account"
}
```

#### Create a new account

**Endpoint**: `POST /api/accounts`

**Request Body**:
```json
{
  "name": "Credit Card",
  "type": "credit",
  "balance": -450.25,
  "currency": "USD",
  "notes": "Visa credit card"
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Account created successfully",
  "account_id": 3
}
```

#### Update an account

**Endpoint**: `PUT /api/accounts/{account_id}`

**Request Body**:
```json
{
  "name": "Primary Checking",
  "balance": 2600.50
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Account updated successfully"
}
```

#### Delete an account

**Endpoint**: `DELETE /api/accounts/{account_id}`

**Response**:
```json
{
  "status": "success",
  "message": "Account deleted successfully"
}
```

### Transactions

#### List transactions

**Endpoint**: `GET /api/transactions`

**Query Parameters**:
- `start_date`: Start date (YYYY-MM-DD)
- `end_date`: End date (YYYY-MM-DD)
- `account_id`: Filter by account ID
- `category_id`: Filter by category ID
- `type`: Transaction type (income, expense, transfer)
- `limit`: Max number of results (default: 50)
- `offset`: Result offset for pagination

**Response**:
```json
{
  "count": 120,
  "next": "/api/transactions?offset=50&limit=50",
  "previous": null,
  "results": [
    {
      "id": 1,
      "account_id": 1,
      "category_id": 5,
      "amount": -45.67,
      "date": "2023-05-10",
      "description": "Grocery shopping",
      "type": "expense"
    },
    {
      "id": 2,
      "account_id": 1,
      "category_id": 1,
      "amount": 2500.00,
      "date": "2023-05-01",
      "description": "Salary",
      "type": "income"
    }
  ]
}
```

#### Get transaction details

**Endpoint**: `GET /api/transactions/{transaction_id}`

**Response**:
```json
{
  "id": 1,
  "account_id": 1,
  "category_id": 5,
  "amount": -45.67,
  "date": "2023-05-10",
  "description": "Grocery shopping",
  "type": "expense",
  "is_recurring": false,
  "created_at": "2023-05-10T14:25:30Z",
  "updated_at": "2023-05-10T14:25:30Z",
  "receipt_image": "/media/receipts/receipt_1.jpg"
}
```

#### Create a new transaction

**Endpoint**: `POST /api/transactions`

**Request Body**:
```json
{
  "account_id": 1,
  "category_id": 5,
  "amount": -45.67,
  "date": "2023-05-10",
  "description": "Grocery shopping",
  "type": "expense"
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Transaction created successfully",
  "transaction_id": 1
}
```

#### Update a transaction

**Endpoint**: `PUT /api/transactions/{transaction_id}`

**Request Body**:
```json
{
  "amount": -50.25,
  "description": "Grocery shopping at Whole Foods"
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Transaction updated successfully"
}
```

#### Delete a transaction

**Endpoint**: `DELETE /api/transactions/{transaction_id}`

**Response**:
```json
{
  "status": "success",
  "message": "Transaction deleted successfully"
}
```

### Categories

#### List all categories

**Endpoint**: `GET /api/categories`

**Query Parameters**:
- `type`: Filter by category type (income, expense)

**Response**:
```json
[
  {
    "id": 1,
    "name": "Salary",
    "parent_id": null,
    "is_income": true,
    "is_expense": false,
    "icon": "money",
    "color": "#4CAF50"
  },
  {
    "id": 5,
    "name": "Groceries",
    "parent_id": 4,
    "is_income": false,
    "is_expense": true,
    "icon": "shopping-cart",
    "color": "#FF5722"
  }
]
```

#### Create a new category

**Endpoint**: `POST /api/categories`

**Request Body**:
```json
{
  "name": "Entertainment",
  "parent_id": null,
  "is_expense": true,
  "icon": "movie",
  "color": "#9C27B0"
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Category created successfully",
  "category_id": 10
}
```

### Budgets

#### List budgets

**Endpoint**: `GET /api/budgets`

**Query Parameters**:
- `year`: Filter by year (YYYY)
- `month`: Filter by month (1-12)

**Response**:
```json
[
  {
    "id": 1,
    "category_id": 5,
    "amount": 500.00,
    "year": 2023,
    "month": 5,
    "spent": 320.45
  },
  {
    "id": 2,
    "category_id": 6,
    "amount": 200.00,
    "year": 2023,
    "month": 5,
    "spent": 150.75
  }
]
```

#### Create or update budget

**Endpoint**: `POST /api/budgets`

**Request Body**:
```json
{
  "category_id": 5,
  "amount": 500.00,
  "year": 2023,
  "month": 6
}
```

**Response**:
```json
{
  "status": "success",
  "message": "Budget created successfully",
  "budget_id": 3
}
```

### Debts

#### List debts

**Endpoint**: `GET /api/debts`

**Response**:
```json
[
  {
    "id": 1,
    "name": "Home Mortgage",
    "type": "mortgage",
    "initial_amount": 250000.00,
    "current_balance": 235000.00,
    "interest_rate": 4.5,
    "minimum_payment": 1500.00,
    "due_date": 15
  }
]
```

### Investments

#### List investments

**Endpoint**: `GET /api/investments`

**Response**:
```json
[
  {
    "id": 1,
    "account_id": 3,
    "name": "Apple Inc.",
    "type": "stock",
    "ticker": "AAPL",
    "shares": 10.0,
    "price_per_share": 145.86,
    "purchase_price": 125.35,
    "total_value": 1458.60,
    "gain_loss": 205.10,
    "gain_loss_percent": 16.36
  }
]
```

### Goals

#### List goals

**Endpoint**: `GET /api/goals`

**Response**:
```json
[
  {
    "id": 1,
    "name": "Emergency Fund",
    "type": "emergency_fund",
    "target_amount": 10000.00,
    "current_amount": 4500.00,
    "start_date": "2023-01-01",
    "target_date": "2023-12-31",
    "progress": 45.0
  }
]
```

### Reports

#### Generate report

**Endpoint**: `GET /api/reports/{report_type}`

**Report Types**:
- `income`: Income breakdown
- `expenses`: Expense breakdown
- `net_worth`: Net worth over time
- `budget`: Budget vs. actual spending
- `savings_rate`: Savings rate over time

**Query Parameters**:
- `start_date`: Start date (YYYY-MM-DD)
- `end_date`: End date (YYYY-MM-DD)

**Response** (for expenses report):
```json
{
  "report_type": "expenses",
  "start_date": "2023-01-01",
  "end_date": "2023-05-31",
  "total": 8750.45,
  "breakdown": [
    {
      "category_id": 5,
      "category_name": "Groceries",
      "amount": 2340.56,
      "percentage": 26.7
    },
    {
      "category_id": 6,
      "category_name": "Rent",
      "amount": 3500.00,
      "percentage": 40.0
    }
  ]
}
```

## Error Handling

When an error occurs, the API returns:

```json
{
  "status": "error",
  "message": "Error message here",
  "code": "ERROR_CODE"
}
```

### Common Error Codes

- `INVALID_CREDENTIALS`: Authentication failure
- `RESOURCE_NOT_FOUND`: Requested resource does not exist
- `PERMISSION_DENIED`: Insufficient permissions
- `VALIDATION_ERROR`: Invalid input data
- `SERVER_ERROR`: Internal server error

## Rate Limiting

API requests are limited to 100 requests per minute per user. If you exceed this limit, you'll receive a 429 Too Many Requests response with the following:

```json
{
  "status": "error",
  "message": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "retry_after": 30
}
```

## Versioning

The current API version is v1. Include the version in the URL path:
```
/api/v1/transactions
```

Future API versions will be announced in advance of deployment.