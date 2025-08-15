import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "2rem" }}>
      <h2>📝 Sign Up</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
      <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="new-password"/>
      <button onClick={handleSignup}>Create Account</button>
    </div>
  );
}

export default Signup;

