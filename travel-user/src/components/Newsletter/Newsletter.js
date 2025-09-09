import React, { useState } from "react";
import axios from "axios";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = async () => {
    if (!email.includes("@")) return setStatus("Please enter a valid email.");
    try {
      await axios.post(
        "https://travel-website-2ae60-default-rtdb.firebaseio.com/newsletter.json",
        { email }
      );
      setStatus("✅ Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("❌ Subscription failed. Try again.");
    }
  };

  return (
    <div className="newsletter-container">
      <h2>📩 Stay Updated</h2>
      <p>Get the latest travel deals and updates directly to your inbox.</p>
      <div className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default Newsletter;
