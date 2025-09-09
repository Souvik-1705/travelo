import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await dispatch(signupUser({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">📝 Sign Up</h2>
        <input
          className="signup-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <input
          className="signup-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="new-password"
        />
        <button className="signup-button" onClick={handleSignup}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Signup;
