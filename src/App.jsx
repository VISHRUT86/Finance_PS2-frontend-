import React, { useState, useEffect } from "react";
import {  HashRouter as Router, Routes, Route, useLocation , Navigate } from "react-router-dom";
import GuestN from "./components/GuestN"; 
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Income from "./components/Incomes";
import Expenses from "./components/Expenses";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TransactionHistory from "./components/TransactionHistory";
import Bills from './components/Bills';
import Footer from "./components/Footer";
import GoalTracker from "./components/GoalTracker";
import Notifications from "./components/Notifications" ;
import ScrollToTop from "./components/ScrollToTop"; 

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
        <ScrollToTop />
      <MainContent theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
}

function MainContent({ theme, toggleTheme }) {
  const isLoggedIn = !!localStorage.getItem("token");
  const location = useLocation();

  const showFooter = location.pathname === "/"; 

  return (
    <>
      {isLoggedIn ? (
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <GuestN theme={theme} toggleTheme={toggleTheme} />
      )}

      <div className="container">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to='/dashboard'/>:<Home theme={theme} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incomes" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/goal-tracker" element={<GoalTracker />} /> 
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </div>

      {showFooter && <Footer />}
    </>
  );
}

export default App;
