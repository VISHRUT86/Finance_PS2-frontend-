import axios from "axios";

const API_URL = "https://b1-ibcx.onrender.com/notifications";

// 📌 ✅ Get all notifications
export const getNotifications = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

// 📌 ✅ Get unread notification count
export const getUnreadCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/unread`, { withCredentials: true });
    return response.data.unreadCount;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return 0;
  }
};

// 📌 ✅ Mark notification as seen
export const markNotificationSeen = async (id) => {
  try {
    await axios.put(`${API_URL}/mark-seen/${id}`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Error marking notification as seen:", error);
  }
};
