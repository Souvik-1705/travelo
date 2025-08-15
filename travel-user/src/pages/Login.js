import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🔐 Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
      <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="new-password"/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
