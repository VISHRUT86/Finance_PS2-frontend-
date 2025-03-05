import React, { useState, useEffect } from "react";
import { addIncome, getIncomes, deleteIncome } from "../services/income";
import "../components/Incomes.css";
import { FaTrash } from "react-icons/fa";

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryOptions = ["Salary", "Freelance", "Investment", "Gift", "Other"];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchIncomes();
    } else {
      console.warn("⛔ No token found! Login required.");
    }
  }, []);

  const fetchIncomes = async (retry = false) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired! Please log in again.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/incomes/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch incomes");
      }
      setIncomes(data);
    } catch (error) {
      console.error("⚠️ Fetch error:", error);
      if (!retry) {
        setTimeout(() => fetchIncomes(true), 1000);
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddIncome = async () => {
    if (!formData.source || !formData.amount || !formData.date || !formData.category) {
      alert("All fields are required!");
      return;
    }
    try {
      await addIncome(formData);
      fetchIncomes();
      setFormData({ source: "", amount: "", date: "", category: "" });
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    if (!window.confirm("Are you sure you want to delete this income?")) return;
    try {
      setLoading(true);
      await deleteIncome(id);
      setIncomes((prev) => prev.filter((income) => income._id !== id));
    } catch (error) {
      alert("Failed to delete income!");
    } finally {
      setLoading(false);
    }
  };

  const filteredIncomes = selectedCategory === "All" ? incomes : incomes.filter((income) => income.category === selectedCategory);

  return (
    <div className="income-container">
      <h2 className="income-heading">Income</h2>
      <div className="filters">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">Filter by: All Categories</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="income-form">
        <input type="text" name="source" placeholder="Source" value={formData.source} onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount (₹)" value={formData.amount} onChange={handleChange} />
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <button className="add-income-btn" onClick={handleAddIncome} disabled={loading}>{loading ? "Adding..." : "Add Your Income"}</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="income-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Amount (₹)</th>
              <th>Date</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncomes.length === 0 ? (
              <tr>
                <td colSpan="5">No incomes found.</td>
              </tr>
            ) : (
              filteredIncomes.map((income) => (
                <tr key={income._id}>
                  <td>{income.source}</td>
                  <td>₹{income.amount}</td>
                  <td>{new Date(income.date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}</td>
                  <td>{income.category}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteIncome(income._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Incomes;