import React from "react";
import { Link } from "react-router-dom";
import "./GuestN.css"; 

const GuestN = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <h2>Finance Tracker</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        
          <img 
            className="daypic" 
            src={theme === "light" ? "/day-mode.png" : "/night.png"} 
            alt="Theme Toggle" 
            onClick={toggleTheme} 
          />
        
      </ul>
    </nav>
  );
};

export default GuestN;
