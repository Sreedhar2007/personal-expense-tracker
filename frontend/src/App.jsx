import { useState } from "react";
import "./App.css";

function App() {
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");

  const [incomeDescription, setIncomeDescription] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  // Add Income
  const addIncome = () => {
    if (income === "" || incomeDescription === "") {
      alert("Please enter income amount and description");
      return;
    }

    setTotalIncome(totalIncome + Number(income));

    setIncome("");
    setIncomeDescription("");
  };

  // Add Expense
  const addExpense = () => {
    if (expense === "" || expenseDescription === "") {
      alert("Please enter expense amount and description");
      return;
    }

    setTotalExpense(totalExpense + Number(expense));

    setExpense("");
    setExpenseDescription("");
  };

  // Calculate balance
  const balance = totalIncome - totalExpense;

  // Current date and time
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div className="app">

      {/* Header */}
      <h1>💰 Personal Expense Tracker</h1>

      <p className="date">
        📅 {currentDate} &nbsp;&nbsp; ⏰ {currentTime}
      </p>

      {/* Dashboard */}
      <div className="dashboard">

        <div className="card income-card">
          <h2>Total Income</h2>
          <p>₹{totalIncome}</p>
        </div>

        <div className="card expense-card">
          <h2>Total Expenses</h2>
          <p>₹{totalExpense}</p>
        </div>

        <div className="card balance-card">
          <h2>Balance</h2>
          <p>₹{balance}</p>
        </div>

      </div>

      {/* Income and Expense Forms */}
      <div className="forms">

        {/* Income */}
        <div className="form-box">
          <h2>➕ Add Income</h2>

          <input
            type="number"
            placeholder="Enter amount"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter description"
            value={incomeDescription}
            onChange={(e) => setIncomeDescription(e.target.value)}
          />

          <button onClick={addIncome}>
            Add Income
          </button>
        </div>

        {/* Expense */}
        <div className="form-box">
          <h2>➖ Add Expense</h2>

          <input
            type="number"
            placeholder="Enter amount"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter description"
            value={expenseDescription}
            onChange={(e) => setExpenseDescription(e.target.value)}
          />

          <button onClick={addExpense}>
            Add Expense
          </button>
        </div>

      </div>

      {/* Today's Summary */}
      <div className="summary">
        <h2>📊 Today's Summary</h2>

        <p>
          Total Income: ₹{totalIncome}
        </p>

        <p>
          Total Expenses: ₹{totalExpense}
        </p>

        <p>
          Remaining Balance: ₹{balance}
        </p>
      </div>

    </div>
  );
}

export default App;