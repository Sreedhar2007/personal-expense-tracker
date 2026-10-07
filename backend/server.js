const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Pandu*33",
    database: "personal_expense_tracker"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err.message);
        return;
    }

    console.log("MySQL connected successfully!");
});

// Test route
app.get("/", (req, res) => {
    res.send("Personal Expense Tracker Backend is Running");
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});