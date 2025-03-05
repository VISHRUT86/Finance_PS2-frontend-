import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import { getExpenses } from "../services/expense";
import { getIncomes } from "../services/income";
import "./RecentH.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const expenses = await getExpenses();
      const incomes = await getIncomes();

      const allTransactions = [
        ...expenses.map((exp) => ({ ...exp, type: "Expense" })),
        ...incomes.map((inc) => ({ ...inc, type: "Income" })),
      ].sort((a, b) => new Date(b.date) - new Date(a.date));

      const recentTransactions = allTransactions.slice(0, 4);

      setTransactions(recentTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const exportToCSV = () => {
    const filteredTransactions = filterCategory
      ? transactions.filter((t) => t.category === filterCategory)
      : transactions;

    const csv = Papa.unparse(
      filteredTransactions.map(({ date, category, amount, type }) => ({
        Date: new Date(date).toLocaleDateString("en-GB"),
        Category: category,
        Amount: `₹${amount}`,
        Type: type,
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="transaction-history">
      <h2>Transaction History</h2>

      <div className="filter-container">
        <label>Filter by Category:</label>
        <select
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
        >
          <option value="">All Categories</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Health">Health</option>
        </select>
      </div>

      <div className="table-container">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .filter((t) =>
                filterCategory ? t.category === filterCategory : true
              )
              .map((transaction) => (
                <tr
                  key={transaction._id}
                  className={transaction.type.toLowerCase()}
                >
                  <td>
                    {new Date(transaction.date).toLocaleDateString("en-GB")}
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.type}</td>
                  <td>₹{transaction.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
