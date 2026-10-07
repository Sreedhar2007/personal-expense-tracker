"""
database.py - Database Connection and Initialization Module
=============================================================
This file manages the connection between Flask and MySQL.
It also includes an auto-initialization function (init_db) that
creates the database and tables automatically if they do not exist.
"""

import mysql.connector
from mysql.connector import Error

# -----------------------------------------------------------------------------
# MySQL Configuration Settings
# -----------------------------------------------------------------------------
# Change these values according to your MySQL installation:
DB_CONFIG = {
    'host': 'localhost',        # Usually 'localhost' or '127.0.0.1'
    'user': 'root',             # Default MySQL user is 'root'
    'password': 'Pandu*33',     # Your MySQL root password
    'port': 3306,               # Default MySQL port is 3306
    'use_pure': True            # Pure Python driver (ensures 100% stability)
}

DB_NAME = 'personal_expense_tracker'


def get_db_connection():
    """
    Establish and return a connection to the 'personal_expense_tracker' database.
    Returns:
        mysql.connector.connection_cext.CMySQLConnection or pure Python connection.
    """
    try:
        config = DB_CONFIG.copy()
        config['database'] = DB_NAME
        connection = mysql.connector.connect(**config)
        return connection
    except Error as e:
        print(f"[ERROR] Could not connect to MySQL database '{DB_NAME}': {e}")
        raise e


def init_db():
    """
    Initializes the MySQL database and creates tables if they don't already exist.
    Can be run directly via: python database.py
    """
    try:
        # Step 1: Connect to MySQL server without selecting a specific database
        print("[INFO] Connecting to MySQL server...")
        server_conn = mysql.connector.connect(**DB_CONFIG)
        cursor = server_conn.cursor()

        # Step 2: Create database if it doesn't exist
        print(f"[INFO] Ensuring database '{DB_NAME}' exists...")
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS `{DB_NAME}` DEFAULT CHARACTER SET utf8mb4;")
        cursor.close()
        server_conn.close()

        # Step 3: Connect to the specific database and create tables
        conn = get_db_connection()
        cursor = conn.cursor()

        # Table 1: users
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """)

        # Table 2: income
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS income (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            description VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """)

        # Table 3: expenses
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS expenses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            description VARCHAR(255) NOT NULL,
            category VARCHAR(50) NOT NULL,
            date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        """)

        conn.commit()
        cursor.close()
        conn.close()
        print("[SUCCESS] Database and tables ('users', 'income', 'expenses') are ready to use!")

    except Error as e:
        print(f"[ERROR] Failed to initialize database: {e}")
        print("Tip: Check if your MySQL service is running and credentials in DB_CONFIG are correct.")


if __name__ == '__main__':
    print("--- Running Database Setup ---")
    init_db()
