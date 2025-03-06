import React, { useState } from "react";
import axios from "axios";
import "./GoalSettingForm.css";

const GoalSettingForm = ({ onClose, onGoalSet = () => {} }) => {
  const [annualGoal, setAnnualGoal] = useState("");

  const handleChange = (e) => {
    setAnnualGoal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    const userId = storedUser ? JSON.parse(storedUser)._id : null;

    if (!userId) {
      alert(" User not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://finance-ps2-backend.onrender.com/goals",
        { userId, annualGoal },
        { withCredentials: true }
      );

      console.log(" Goal Saved:", response.data);
      onGoalSet(annualGoal);
      onClose();
    } catch (error) {
      console.log(" Error saving goal:", error.response?.data || error.message);
      alert(
        `Error: ${error.response?.data?.message || "Something went wrong"}`
      );
    }
  };

  return (
    <div className="goal-form-overlay" onClick={onClose}>
      <div className="goal-form-container" onClick={(e) => e.stopPropagation()}>
        <h2>Set Your Annual Goal</h2>
        <form onSubmit={handleSubmit}>
          <label>Set Annual Goal (₹):</label>
          <input
            type="number"
            name="annualGoal"
            value={annualGoal}
            onChange={handleChange}
            required
          />

          <button type="submit">Save Goal</button>
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default GoalSettingForm;
