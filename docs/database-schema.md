# Database Schema

This document outlines the database schema for the Personal Finance Tracker application.

## Overview

The Personal Finance Tracker uses a PostgreSQL database with the following main tables:

- Users
- Accounts
- Transactions
- Categories
- Budgets
- Debts
- Investments
- Goals

## Entity Relationship Diagram

```
┌─────────┐       ┌──────────┐       ┌─────────────┐
│  Users  │──1─┬─*│ Accounts │──1─┬─*│Transactions │
└─────────┘    │  └──────────┘    │  └─────────────┘
               │                  │         │
               │                  │         │*
               │                  │         │
               │                  │    ┌────▼─────┐
               │                  │    │Categories│
               │                  │    └──────────┘
               │                  │
               │  ┌───────┐       │
               └─*│Budgets│◄──────┘
                  └───────┘
               
┌─────────┐       ┌────────────┐
│  Users  │──1─┬─*│   Debts    │
└─────────┘    │  └────────────┘
               │
               │  ┌────────────┐
               └─*│ Investments │
               │  └────────────┘
               │
               │  ┌────────────┐
               └─*│   Goals    │
                  └────────────┘
```

## Table Definitions

### Users Table

Stores user account information.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | Primary Key | Unique user identifier |
| username | String(150) | Unique, Not Null | User's login name |
| email | String(150) | Unique, Not Null | User's email address |
| password | String | Not Null | Hashed password |
| first_name | String(50) | | User's first name |
| last_name | String(50) | | User's last name |
| date_joined | DateTime | Default: Current time | Account creation date |
| last_login | DateTime | | Last login timestamp |
| is_active | Boolean | Default: True | Account status |
| currency | String(3) | Default: 'USD' | Preferred currency |

### Accounts Table

Represents financial accounts (checking, savings, credit cards, etc.).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | Primary Key | Unique account identifier |
| user_id | Integer | Foreign Key (Users.id) | Owner of the account |
| name | String(100) | Not Null | Account name |
| type | String(50) | Not Null | Account type (checking, savings, credit, etc.) |
| balance | Numeric(15,2) | Default: 0.00 | Current account balance |
| currency | String(3) | Default: 'USD' | Account currency |
| is_active | Boolean | Default: True | Whether account is active |
| created_at | DateTime | Default: Current time | When account was created |
| updated_at | DateTime | | Last update timestamp |
| notes | Text | | Additional information |

### Transactions Table

Records all financial transactions.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | Primary Key | Unique transaction identifier |
| user_id | Integer | Foreign Key (Users.id) | User who owns the transaction |
| account_id | Integer | Foreign Key (Accounts.id) | Associated account |
| category_id | Integer | Foreign Key (Categories.id) | Transaction category |
| amount | Numeric(15,2) | Not Null | Transaction amount |
| date | Date | Not Null | Transaction date |
| description | String(255) | | Transaction description |
| type | String(10) | Default: 'expense' | Transaction type (income, expense, transfer) |
| is_recurring | Boolean | Default: False | Whether transaction recurs |
| created_at | DateTime | Default: Current time | Record creation time |
| updated_at | DateTime | | Last update timestamp |
| receipt_image | String(255) | | Path to receipt image |

### Categories Table

Defines transaction categories and subcategories.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | Primary Key | Unique category identifier |
| user_id | Integer | Foreign Key (Users.id), Nullable | User who created custom category (null for system defaults) |
| name | String(100) | Not Null | Category name |
| parent_id | Integer | Foreign Key (Categories.id), Nullable | Parent category for hierarchical structure |
| icon | String(50) | | Icon identifier |
| color | String(7) | | Color hex code |
| is_income | Boolean | Default: False | Whether it's an income category |
| is_expense | Boolean | Default: True | Whether it's an expense category |
| is_system | Boolean | Default: False | Whether it's a system category |

### Budgets Table

Stores budget information for different categories and time periods.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | Primary Key | Unique budget identifier |
| user_id | Integer | Foreign Key (Users.id) | User who owns the budget |
| category_id | Integer | Foreign Key (Categories.id) | Associated category |
| amount | Numeric(15,2) | Not Null | Budget amount |
| year | Integer | Not Null | Budget year |
| month | Integer | Not Null | Budget month (1-12) |
| notes | Text | | Additional notes |
| created_at | DateTime | Default: Current time | Record creation time |
| updated_at | DateTime | | Last update timestamp |

### Debts Table

Tracks loans, credit cards, and other debts.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | Primary Key | Unique debt identifier |
| user_id | Integer | Foreign Key (Users.id) | User who owns the debt |
| name | String(100) | Not Null | Debt name |
| type | String(50) | Not Null | Debt type (mortgage, credit card, student loan, etc.) |
| initial_amount | Numeric(15,2) | Not Null | Original debt amount |
| current_balance | Numeric(15,2) | Not Null | Current outstanding balance |
| interest_rate | Numeric(6,3) | | Annual interest rate (%) |
| minimum_payment | Numeric(15,2) | | Minimum required payment |
| due_date | Integer | | Day of month payment is due (1-31) |
| start_date | Date | | When debt was acquired |
| end_date | Date | | Projected payoff date |
| account_id | Integer | Foreign Key (Accounts.id), Nullable | Associated account |
| created_at | DateTime | Default: Current time | Record creation time |
| updated_at | DateTime | | Last update timestamp |

### Investments Table

Tracks investment accounts and holdings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | Primary Key | Unique investment identifier |
| user_id | Integer | Foreign Key (Users.id) | User who owns the investment |
| account_id | Integer | Foreign Key (Accounts.id) | Associated account |
| name | String(100) | Not Null | Investment name |
| type | String(50) | Not Null | Investment type (stock, bond, mutual fund, etc.) |
| ticker | String(20) | | Stock symbol/ticker |
| shares | Numeric(15,6) | | Number of shares owned |
| price_per_share | Numeric(15,2) | | Current price per share |
| purchase_price | Numeric(15,2) | | Original purchase price per share |
| purchase_date | Date | | Date investment was purchased |
| created_at | DateTime | Default: Current time | Record creation time |
| updated_at | DateTime | | Last update timestamp |

### Goals Table

Stores financial goals and progress tracking.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | Integer | Primary Key | Unique goal identifier |
| user_id | Integer | Foreign Key (Users.id) | User who owns the goal |
| name | String(100) | Not Null | Goal name |
| type | String(50) | Not Null | Goal type (emergency fund, home purchase, etc.) |
| target_amount | Numeric(15,2) | Not Null | Goal target amount |
| current_amount | Numeric(15,2) | Default: 0.00 | Current progress amount |
| start_date | Date | Not Null | When goal was started |
| target_date | Date | | Target completion date |
| priority | Integer | Default: 1 | Goal priority (1=highest) |
| status | String(20) | Default: 'active' | Goal status (active, completed, abandoned) |
| created_at | DateTime | Default: Current time | Record creation time |
| updated_at | DateTime | | Last update timestamp |

## Indexes

For optimal performance, the database includes the following indexes:

- Users: email, username
- Transactions: user_id, account_id, date, category_id
- Categories: user_id, parent_id
- Budgets: user_id, category_id, year, month
- Accounts: user_id, type
- Debts: user_id, type
- Investments: user_id, account_id, ticker
- Goals: user_id, status

## Triggers

The database uses several triggers for automation:

1. **Update account balance**: Updates account balance when transactions are added, modified, or deleted
2. **Update debt current balance**: Updates debt balance when payments are recorded
3. **Update goal progress**: Updates goal progress when linked transactions occur

## Database Migrations

Database migrations are managed through SQLAlchemy's schema management. When models are updated, the changes are automatically applied to the database schema on application startup.

For complex migrations or production deployments, it's recommended to use a dedicated migration tool like Alembic.
