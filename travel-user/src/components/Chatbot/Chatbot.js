import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";
import faqs from "../../data/faqs";
import "./Chatbot.css";

const fuse = new Fuse(faqs, { keys: ["question"], threshold: 0.4 });

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I'm your Travel Assistant. How can I help you?", time: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState("");

  // Load saved chat history
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat history whenever messages update
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;

    const userMessage = { from: "user", text, time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Show typing indicator
    const typingMessage = { from: "bot", text: "Typing...", typing: true };
    setMessages((prev) => [...prev, typingMessage]);

    setTimeout(() => {
      const result = fuse.search(text);
      let reply;
      if (result.length > 0) {
        reply = result[0].item.answer;
      } else {
        reply = "Sorry, I couldn’t find an answer. Please contact support 📞.";
      }

      const botMessage = { from: "bot", text: reply, time: new Date().toLocaleTimeString() };

      // Remove typing message before adding real reply
      setMessages((prev) => [...prev.filter((m) => !m.typing), botMessage]);
    }, 1000);
  };

  const suggestions = [
    "How do I cancel a booking?",
    "What payment methods are accepted?",
    "Do you offer refunds?"
  ];

  return (
    <div className="chatbot-wrapper">
      {!isOpen && (
        <button className="chatbot-button" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Travel Assistant 🤖</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chatbot-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}>
                <div className="msg-text">{msg.text}</div>
                {!msg.typing && <div className="msg-time">{msg.time}</div>}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={() => handleSend()}>Send</button>
          </div>

          <div className="chatbot-suggestions">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
