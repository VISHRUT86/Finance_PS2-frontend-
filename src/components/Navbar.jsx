import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

const Navbar = ({ theme, toggleTheme }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    isLoggedIn && (
      <motion.nav
        className="navbar"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Personal Finance</h2>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/incomes">Incomes</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/goal-tracker">Goal Tracker</Link>
          <Link to="/notifications">🔔 </Link>{" "}
          <img
            className="dayNpic"
            src={theme === "light" ? "/day-mode.png" : "/night.png"}
            alt="Theme Toggle"
            onClick={toggleTheme}
          />
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </motion.nav>
    )
  );
};

export default Navbar;
