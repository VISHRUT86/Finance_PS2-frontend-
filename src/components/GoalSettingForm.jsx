import React, { useState } from "react";
import axios from "axios";
import "./GoalSettingForm.css";

const GoalSettingForm = ({ onClose, onGoalSet = () => {} }) => { // ✅ Default function added
    const [annualGoal, setAnnualGoal] = useState("");

    const handleChange = (e) => {
        setAnnualGoal(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Fetch userId from localStorage
        const storedUser = localStorage.getItem("user");
        const userId = storedUser ? JSON.parse(storedUser)._id : null;

        if (!userId) {
            alert("⚠️ User not found. Please log in again.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/goals",
                { userId, annualGoal }, // ✅ Include userId in payload
                { withCredentials: true } // ✅ Ensures cookies are sent if needed
            );

            console.log("✅ Goal Saved:", response.data);
            onGoalSet(annualGoal); // ✅ Update the parent component safely
            onClose(); // ✅ Close the modal
        } catch (error) {
            console.error("❌ Error saving goal:", error.response?.data || error.message);
            alert(`Error: ${error.response?.data?.message || "Something went wrong"}`);
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
