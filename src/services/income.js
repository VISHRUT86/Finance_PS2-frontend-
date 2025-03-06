import axios from "axios";
import { api } from "../api";
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addIncome = async (incomeData) => {
  try {
    const res = await axios.post(api.addIncome, incomeData, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to add income" };
  }
};

export const getIncomes = async () => {
  try {
    const res = await axios.get(api.getIncomes, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch incomes" };
  }
};

export const updateIncome = async (id, incomeData) => {
  try {
    const res = await axios.put(`${api.updateIncome}/${id}`, incomeData, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update income" };
  }
};

export const deleteIncome = async (id) => {
  const token = localStorage.getItem("token");
  const res = await axios.delete(`https://finance-ps2-backend.onrender.com/incomes/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
