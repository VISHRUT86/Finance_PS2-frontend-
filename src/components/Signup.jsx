import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Navigation ke liye
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // ✅ Navigation hook

    const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("🎉 Signup Successful! Redirecting to Dashboard...", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });

                // ✅ Token & User details ko localStorage me store karna
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // ✅ 2 sec ke baad Dashboard pr redirect
                setTimeout(() => {
                    navigate("/dashboard");
                    window.location.reload(); // Navbar update ke liye
                }, 1500);

            } else {
                toast.error(data.message || "❌ Signup Failed", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("⚠️ Something went wrong!", {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };

    return (
        <div className="signup-container">
            <ToastContainer /> {/* ✅ ToastContainer Added */}
            <img className="sgimg" src="https://investyadnya.in/static/assets/images/slider/stock-o-meter.svg"/>
            <div className="signup-box">
                <h2>Sign Up</h2>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignup}>Sign Up</button>
                <p className="login-link">
                    Already have an account? <a href="/login">Log In</a>
                </p>
                <img className="logimg" src="https://mint.intuit.com/mint-static-hp-resources/5757_NW_LP_Mint_HP3_D.png" alt="" />
            </div>
        </div>
    );
};

export default Signup;
