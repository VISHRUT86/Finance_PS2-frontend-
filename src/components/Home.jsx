
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";

const Home = ({ theme }) => {  // Receive theme as a prop

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (

    <>
      <div className="fortext">
        <h1>Track your income, manage expenses, and achieve your savings goals
          <br/><span className="pink">all in one place.</span></h1>
        <div className="gets">
          <Link to="/signup" className="gets-link">Get Started</Link>
        </div>

      </div>
      <div className="main-container">
        {/* <Navbar theme={theme} /> Ensure Navbar receives theme */}

        {[1].map((_, index) => (
          <div key={index} className={`home-container ${theme}`}>
            <div className="header-container">
              <div className="homeright">

                <div className="MD">

                  <div className="homeMD">

                    <img className="homemoney
              " src="money.png" alt="homemoney" />

                  </div>
                  <div className="homeMD">

                    <img className="homemoney2
              " src="rotate.png" alt="homemoney" />

                  </div>
                  <div className="homeMD">

                    <img className="homemoney3
              " src="profit.png" alt="homemoney3" />

                  </div>
                </div>
                <h1 className="home-title">Finance Tracker</h1>
                <p className="home-description">
                  Take control of your finances! Manage your Dashboard, Incomes, and Expenses efficiently.
                </p>
                {/* <div className="navbar-right">
                  <ul className="auth-links">
                    <li><Link to="/login" className="login-btn">Log in</Link></li>
                    <li><Link to="/signup" className="signup-btn">Sign up</Link></li>
                  </ul>
                </div> */}
              </div>

              {/* Finance Tracker Image */}
              <img
                className="homep"
                src={theme === "light" ? "/photo2.jpg" : "/photo1.jpg"}
                alt="Finance Tracker Logo"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;