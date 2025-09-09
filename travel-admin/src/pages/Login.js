import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, loginAsGuest } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginAdmin({ email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/admin/dashboard");
    }
  };

  const handleGuestLogin = () => {
    dispatch(loginAsGuest());
    navigate("/admin/dashboard");
  };

  return (
    <div style={{ padding: "2rem" }} className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit" disabled={loading}>Login</button>
        <hr />
      <button onClick={handleGuestLogin}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}>
        Continue as Guest
      </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;
