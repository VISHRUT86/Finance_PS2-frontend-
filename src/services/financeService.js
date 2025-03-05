import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Backend URL

// Token ko localStorage se uthao
const getAuthToken = () => {
  return localStorage.getItem("token"); // 👈 Yahi token API call me bhejna h
};

export const getIncome = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/incomes/all`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // 👈 Token add kiya
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching income data:", error);
    throw error;
  }
};

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/expenses/all`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`, // 👈 Token add kiya
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching expenses data:", error);
    throw error;
  }
};
