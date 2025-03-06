import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log(" No token found, user might be unauthenticated");
      return;
    }

    try {
      const response = await axios.get(
        "https://finance-ps2-backend.onrender.com/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(" Notifications Response:", response.data);
      setNotifications(response.data);
    } catch (error) {
      console.log(
        "Error fetching notifications:",
        error.response?.data || error.message
      );
    }
  };

  const markAsRead = async (id) => {
    try {
      console.log(" Marking as read for ID:", id);
      const token = localStorage.getItem("token");

      if (!token) {
        console.log(" No token found, unable to mark as read");
        return;
      }

      await axios.put(
        `https://finance-ps2-backend.onrender.com/api/notifications/mark-read/${id}`,
        { isRead: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(` Notification with ID ${id} marked as read`);

      // Update UI instantly by filtering out the read notification
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== id)
      );
    } catch (error) {
      console.log(
        " Error marking notification as read:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="notifications-container">
      <h2>🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div key={notification._id} className="notification-card">
              <p className="message">{notification.message}</p>
              <p className="due-date">
                <strong>Due Date:</strong>{" "}
                {new Date(notification.dueDate).toLocaleDateString()}
              </p>
              <button
                className="mark-read-btn"
                onClick={() => markAsRead(notification._id)}
              >
                ✅ Mark as Read
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
