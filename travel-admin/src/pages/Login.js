// src/pages/Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, guestLogin } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

 
  const handleGuestLogin = () => {
    dispatch(guestLogin());
    navigate("/admin/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">👨‍💼 Admin Login</h2>

        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <input
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="new-password"
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <button
          className="login-button guest"
          onClick={handleGuestLogin}
          style={{ marginTop: "1rem" }}
        >
          Guest Login
        </button>
      </div>
    </div>
  );
}

export default Login;
