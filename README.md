# Personal Finance Tracker

![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![Flask](https://img.shields.io/badge/flask-3.1.0-lightgrey.svg)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0.38-red.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A comprehensive web application for tracking personal finances, managing budgets, tracking investments, and planning financial goals.

**Live Demo:** https://central-june-adib-here-4b00ff00.koyeb.app/
## 🌟 Features

- **Dashboard**: Get an overview of your financial situation at a glance
- **Transaction Management**: Record and categorize your income and expenses
- **Budget Planning**: Create monthly budgets and track your spending against them
- **Debt Management**: Keep track of loans, credit cards, and other debts
- **Investment Tracking**: Monitor your investment accounts and track performance
- **Financial Goals**: Set and track progress towards financial goals
- **Reports & Analysis**: Generate detailed financial reports and visualizations
- **Secure Authentication**: User authentication and account security

## 📋 Requirements

- Python 3.11+
- PostgreSQL database
- Web browser (Chrome, Firefox, Edge, Safari)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Personal-Finance-Tracker.git
   cd Personal-Finance-Tracker
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv myenv
   ```

3. **Activate the virtual environment**
   - Windows:
     ```bash
     myenv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source myenv/bin/activate
     ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database Configuration (Required)
   DATABASE_URL=postgresql://username:password@localhost:5432/finance_tracker
   
   # Application Security
   SECRET_KEY=your-secure-secret-key
   FLASK_ENV=development
   
   # Email Configuration (Optional - for email features)
   MAIL_SERVER=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password-or-email-password
   ```

6. **Run the application**
   ```bash
   flask run
   ```
   or
   ```bash
   python app.py
   ```

7. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

## 🏗️ Project Structure

```
Personal-Finance-Tracker/
├── app.py                 # Main application entry point
├── config.py              # Application configuration
├── db_config.py           # Database configuration
├── models.py              # Database models
├── routes/                # Route definitions
│   ├── __init__.py
│   ├── auth.py            # Authentication routes
│   ├── budgets.py         # Budget management routes
│   ├── debts.py           # Debt management routes
│   ├── goals.py           # Financial goals routes
│   ├── investments.py     # Investment tracking routes
│   ├── main.py            # Main/dashboard routes
│   └── transactions.py    # Transaction management routes
├── static/                # Static files (CSS, JS, images)
├── templates/             # HTML templates
├── requirements.txt       # Project dependencies
└── README.md              # Project documentation
```

## 🌐 Deployment

### Deploying on Render

This project is deployed on Render. You can view the live demo at [https://personal-finance-tracker-6if8.onrender.com](https://personal-finance-tracker-6if8.onrender.com)

To deploy your own instance:

1. Create a Render account at [render.com](https://render.com/)
2. Create a new Web Service and connect your GitHub repository
3. Add the required environment variables in the Render dashboard
4. Set the start command to `gunicorn app:app`
5. Deploy the application

### Alternative Deployment Options

The application can also be deployed on other platforms like Railway, Heroku, or AWS, following their respective deployment procedures.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



