import axios from "axios";

const API_URL = "http://localhost5000/notifications";

export const getNotifications = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};

export const getUnreadCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/unread`, {
      withCredentials: true,
    });
    return response.data.unreadCount;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    return 0;
  }
};

export const markNotificationSeen = async (id) => {
  try {
    await axios.put(
      `${API_URL}/mark-seen/${id}`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error marking notification as seen:", error);
  }
};
