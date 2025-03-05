
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineCloseCircle } from "react-icons/ai"; // ❌ Cross icon
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("🎉 Login Successful!", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    icon: "✅", // ✅ Success icon
                    theme: "dark",
                });
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
             
                setTimeout(() => {
                    navigate("/dashboard");
                    window.location.reload();
                }, 1500);   // ✅ Auto-refresh to update Navbar UI
            } else {
                toast.error(
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <AiOutlineCloseCircle size={20} style={{ marginRight: 8 }} />
                        {data.message || "❌ Login Failed"}
                    </div>,
                    {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "dark",
                    }
                );
            }
        } catch (error) {
            console.log("Error:", error);
        
            toast.error(
                <div style={{ display: "flex", alignItems: "center" }}>
                    <AiOutlineCloseCircle size={20} style={{ marginRight: 8 }} />
                    {"⚠️ Something went wrong!"}
                </div>,
                {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                }
            );
        }
    };

    return (
        <div className="login-container">
          <ToastContainer />  
            <img className="lgimg" src="https://investyadnya.in/static/assets/images/slider/mutual-fund.svg"/>
            <div className="login-box">
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Log In</button>
                <p className="signup-link">
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
                <img className="logimg" src="https://mint.intuit.com/mint-static-hp-resources/5757_NW_LP_Mint_HP2_D.png" alt="" />
            </div>
            
        </div>
    );
};

export default Login;




