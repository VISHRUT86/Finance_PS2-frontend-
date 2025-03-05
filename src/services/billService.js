import axios from "axios";

const API_URL = "http://localhost:5000/api/bills"; // Update with your backend URL

export const addBill = async (billData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/add`, billData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getBills = async () => {
  const token = localStorage.getItem("token");
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const markBillAsPaid = async (id) => {
  const token = localStorage.getItem("token");
  return axios.put(`${API_URL}/mark-paid/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteBill = async (id) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
