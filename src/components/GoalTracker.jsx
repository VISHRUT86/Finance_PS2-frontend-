
import React, { useEffect, useState } from "react";
import { getIncome, getExpenses } from "../services/financeService";
import GoalSettingForm from "./GoalSettingForm";
import axios from "axios";
import "./GoalTracker.css";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const GoalTracker = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [annualGoal, setAnnualGoal] = useState(null);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState(false);

  useEffect(() => {
    const savedGoal = localStorage.getItem("annualGoal");
    if (savedGoal) {
      setAnnualGoal(JSON.parse(savedGoal));
    } else {
      fetchAnnualGoal();
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const incomeData = await getIncome();
      const expensesData = await getExpenses();
      setIncome(incomeData.data);
      setExpenses(expensesData.data);
    } catch (error) {
      console.log("Error fetching financial data:", error);
    }
  };

  const fetchAnnualGoal = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const userId = storedUser ? JSON.parse(storedUser)._id : null;
      if (!userId) return;

      const response = await axios.get(`http://localhost:5000/goals/${userId}`);
      setAnnualGoal(response.data.annualGoal);
      localStorage.setItem("annualGoal", JSON.stringify(response.data.annualGoal));
    } catch (error) {
      console.log("Error fetching goal:", error);
    }
  };

  const handleGoalSet = (goal) => {
    setAnnualGoal(goal);
    localStorage.setItem("annualGoal", JSON.stringify(goal));
  };

  const calculateMonthlyData = () => {
    return months.map((month, index) => {
      const monthIncome = income.filter(item => new Date(item.date).getMonth() === index);
      const monthExpenses = expenses.filter(item => new Date(item.date).getMonth() === index);
      
      const totalIncome = monthIncome.reduce((sum, item) => sum + item.amount, 0);
      const totalExpenses = monthExpenses.reduce((sum, item) => sum + item.amount, 0);
      const netSavings = totalIncome - totalExpenses;

      return { month, totalIncome, totalExpenses, netSavings };
    });
  };

  const monthlyData = calculateMonthlyData();
  const totalNetSavings = monthlyData.reduce((sum, item) => sum + item.netSavings, 0);
  const savingsProgress = annualGoal ? Math.min((totalNetSavings / annualGoal) * 100, 100) : 0;

  return (
    <div className="goal-tracker-container">
      <h1>Goal Tracker</h1>

      <div className="goal-content">
        <div className="monthly-breakdown">
          <div className="goal-header">
            <button 
              className="goal-set-btn" 
              onClick={() => setShowGoalForm(true)}
              disabled={!!annualGoal || savingsProgress >= 50}  // Disable if goal is set or progress is 50% or more
            >
              🎯 {annualGoal ? `Goal: ₹${annualGoal}` : "Set Annual Goal"}
            </button>
            
            {savingsProgress >= 50 && (
              <button 
                className="goal-update-btn" 
                onClick={() => setUpdatingGoal(true)}
              >
                🔄 Update Goal
              </button>
            )}
          </div>

          {(showGoalForm || updatingGoal) && (
            <GoalSettingForm
              onClose={() => { setShowGoalForm(false); setUpdatingGoal(false); }}
              onGoalSet={handleGoalSet}
            />
          )}

          <div className="goal-cards">
            {monthlyData.map((item, index) => (
              <div key={index} className="goal-card">
                <h3>{item.month}</h3>
                <p><strong>Income:</strong> ₹{item.totalIncome}</p>
                <p><strong>Expenses:</strong> ₹{item.totalExpenses}</p>
                <p><strong>Net Savings:</strong> ₹{item.netSavings}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="goal-visualization">
          <h2>Goal Progress</h2>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${savingsProgress}%`, // Set width based on the savings progress
                backgroundColor: savingsProgress >= 50 ? "#28a745" : "#dc3545", // Green if progress >= 50%, Red otherwise
              }}
            ></div>
            <div className="progress-text">{`${savingsProgress.toFixed(2)}%`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;
