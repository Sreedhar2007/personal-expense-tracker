# 💰 Personal Expense Tracker — Student Web Application

A complete, beginner-friendly web application built with **Python Flask**, **MySQL**, **HTML5**, **CSS3**, and **JavaScript** for tracking personal finances, calculating balances, categorizing expenses, and generating daily summaries.

---

## 📁 1. Project Folder Structure

```text
personal_expense_tracker/
│
├── app.py                  # Main Flask backend (routes, auth, logic, daily summary)
├── database.py             # Database connection & auto-table creation script
├── schema.sql              # MySQL schema creation script (for MySQL Workbench/CLI)
├── requirements.txt        # Required Python libraries
├── README.md               # Complete project documentation and guide
│
├── templates/              # HTML Frontend Templates (Jinja2)
│   ├── base.html           # Main layout (navigation bar, alerts, footer, modal)
│   ├── login.html          # User login form
│   ├── register.html       # User registration form with password confirmation
│   ├── dashboard.html      # Overview: metrics, today's summary, categories, recent transactions
│   ├── add_income.html     # Add income form (Amount, Description, Date)
│   ├── add_expense.html    # Add expense form (Amount, Description, Category, Date)
│   ├── edit_income.html    # Edit existing income form
│   ├── edit_expense.html   # Edit existing expense form
│   ├── transactions.html   # Full history with Type, Category, Date & Month filters
│   └── daily_summary.html  # Daily summary page with date selector & motivational status
│
└── static/                 # Static Assets
    ├── css/
    │   └── style.css       # Clean, modern, responsive CSS styling
    └── js/
        └── script.js       # Mobile menu, password toggle, daily notification popup
```

---

## 🛠️ 2. Software Requirements

Before running the project, make sure you have the following installed on your computer:

1. **Python 3.8 or higher** (Python 3.10, 3.11, 3.12, 3.13, 3.14 supported)
   * Download: [https://www.python.org/downloads/](https://www.python.org/downloads/)
   * ⚠️ *Important during installation:* Check the box **"Add Python to PATH"**.
2. **MySQL Server & MySQL Workbench** (or **XAMPP**)
   * MySQL Community Server: [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
   * Or XAMPP (Apache + MySQL): [https://www.apachefriends.org/](https://www.apachefriends.org/)
3. **Code Editor / Terminal**
   * VS Code (Visual Studio Code) or any text editor
   * Windows Command Prompt, PowerShell, or macOS/Linux Terminal.

---

## 📦 3. Installing Python Packages

Open your terminal or PowerShell, navigate to the project directory, and run:

```bash
pip install -r requirements.txt
```

This installs:
* `Flask` (Web framework)
* `mysql-connector-python` (MySQL driver for Python)
* `Werkzeug` (Password hashing & security utilities)

---

## 🗄️ 4. Setting Up the MySQL Database & Tables

You have **two easy options** to create the database and tables:

### Option A: Automatic Setup (Recommended & Easiest)
Simply run `database.py` in your terminal:
```bash
python database.py
```
This automatically:
1. Connects to your MySQL server.
2. Creates the `personal_expense_tracker` database if it doesn't exist.
3. Creates the `users`, `income`, and `expenses` tables with appropriate foreign keys.

### Option B: Using MySQL Workbench or MySQL Command Line
Open MySQL Workbench or your MySQL command line client and execute the queries in `schema.sql`:
```sql
CREATE DATABASE IF NOT EXISTS personal_expense_tracker;
USE personal_expense_tracker;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS income (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_income_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS expenses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_expenses_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## ⚙️ 5. Configuring Database Credentials

Open `database.py` and verify your MySQL root password:

```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'YOUR_MYSQL_PASSWORD',  # e.g., 'Pandu*33' or 'root'
    'port': 3306,
    'use_pure': True
}
```

---

## 🚀 6. How to Run the Project

1. Open your terminal in the `personal_expense_tracker` folder.
2. Start the Flask development server:
   ```bash
   python app.py
   ```
3. You will see output like:
   ```text
   * Running on http://127.0.0.1:5000
   * Debug mode: on
   ```
4. Open your web browser (Chrome, Edge, Firefox) and navigate to:
   ```text
   http://127.0.0.1:5000
   ```

---

## 🧪 7. Step-by-Step Testing Guide

Follow these steps to test every feature for your demonstration:

### Step 7.1: User Registration
1. On the login screen, click **"Create Account"**.
2. Enter:
   * **Username:** `rahul_sharma`
   * **Email:** `rahul@gmail.com`
   * **Password:** `Student@123`
   * **Confirm Password:** `Student@123`
3. Click **"Create Account"**.
4. You will see a green success alert: *"Registration successful! You can now log in with your credentials."*

### Step 7.2: User Login
1. Enter `rahul_sharma` (or `rahul@gmail.com`) and your password.
2. Click **"Log In"**.
3. You will be redirected to the **Dashboard**.

### Step 7.3: Fresh Dashboard (Zero State)
1. Since no transactions have been added yet, notice:
   * Total Income: **₹0.00**
   * Total Expenses: **₹0.00**
   * Current Balance: **₹0.00**
   * Today's Summary card displays: *"ℹ️ No transactions recorded for today yet."* (no false or corrupt numbers).

### Step 7.4: Add Income
1. Click **"➕ Add Income"** in the top navigation bar.
2. Enter:
   * **Amount:** `2000`
   * **Description:** `Part-time work`
   * **Date:** Keep today's date (e.g. `07-10-2026`)
3. Click **"Add Income"**.
4. You will be redirected back to the Dashboard with a success alert.

### Step 7.5: Add Expense
1. Click **"➖ Add Expense"** in the top navigation bar.
2. Enter:
   * **Amount:** `750`
   * **Description:** `Lunch with friends`
   * **Category:** Select `Food`
   * **Date:** Keep today's date (e.g. `07-10-2026`)
3. Click **"Add Expense"**.

### Step 7.6: Verify Automatic Balance Calculation & Daily Summary
1. Look at your Dashboard:
   * **Total Income:** `₹2,000.00`
   * **Total Expenses:** `₹750.00`
   * **Current Balance:** `₹1,250.00` (calculated as `2000 - 750`)
   * **Today's Income:** `₹2,000.00`
   * **Today's Expenses:** `₹750.00`
2. Look at the **Today's Expense Summary Hero Card**:
   * Today's Income: `₹2,000.00`
   * Today's Expense: `₹750.00`
   * Today's Balance: `₹1,250.00`
   * Notification Message: **"🌟 Good job! You saved ₹1,250.00 today."**
3. Notice the **Expenses by Category** progress bar on the right side showing Food expenditures.
4. Notice the **Recent Transactions** table showing your latest entries with colored badges and `+`/`-` amounts.

### Step 7.7: Daily Summary Page
1. Click **"🔔 Daily Summary"** in the navbar.
2. See the full breakdown for today:
   * Separate Income Table (₹2,000.00)
   * Separate Expense Table (₹750.00)
   * Net Savings: ₹1,250.00
3. Change the date using the date selector to inspect past or future dates.

### Step 7.8: Transaction History & Filters
1. Click **"📜 Transaction History"** in the navbar.
2. Test filters:
   * Filter by **Type:** Choose `Expense Only` & click **"Apply Filter"** &rarr; Only the ₹750 expense appears.
   * Filter by **Category:** Choose `Food` &rarr; Only food expenses appear.
   * Click **"Reset"** to return to the full list.
3. Test **Edit:** Click the **"✏️ Edit"** button on the ₹750 expense, change amount to `800`, and save. Notice the dashboard balance instantly updates to `₹1,200.00`!
4. Test **Delete:** Click **"🗑️ Delete"**, confirm the browser prompt, and verify the transaction is safely removed.

### Step 7.9: Logout & Security
1. Click **"Logout"** in the top right.
2. Try visiting `http://127.0.0.1:5000/dashboard` directly in your browser.
3. You will be immediately redirected to the login page with a warning message: *"Please log in first to access this page."*
4. Create a second user account (e.g., `priya`). Log in and confirm that `priya` **cannot** see any of `rahul`'s transactions!

---

## 🛡️ 8. Security Features Implemented

1. **Password Hashing:** Passwords are never stored in plain text. We use `werkzeug.security.generate_password_hash` (PBKDF2/scrypt).
2. **Session Authentication:** Handled via secure, cryptographically signed Flask sessions with the `@login_required` decorator.
3. **SQL Injection Prevention:** Every database query uses parameterized queries (`cursor.execute(sql, (param1, param2))`).
4. **Data Isolation (Authorization):** Every `SELECT`, `UPDATE`, and `DELETE` query explicitly checks `WHERE user_id = session['user_id']`.

---

## ❓ 9. Troubleshooting & Common Errors

| Issue / Error | Cause | Solution |
| :--- | :--- | :--- |
| **`Access denied for user 'root'@'localhost'`** | Incorrect MySQL root password. | Open `database.py` and update `'password': '...'` with your MySQL password. |
| **`Can't connect to MySQL server on 'localhost'`** | MySQL service is not running. | Press `Win + R`, type `services.msc`, locate `MySQL80` (or `MySQL80_new`), and click **Start**. |
| **`ModuleNotFoundError: No module named 'flask'`** | Flask is not installed in your Python environment. | Run `pip install flask mysql-connector-python` in your terminal. |
| **`Address already in use (Port 5000)`** | Another application or previous Flask process is running on port 5000. | Change port in `app.py` last line to: `app.run(debug=True, port=5001)` and visit `http://127.0.0.1:5001`. |
| **`Table 'personal_expense_tracker.users' doesn't exist`** | Tables have not been initialized yet. | Run `python database.py` once to create all database tables automatically. |
