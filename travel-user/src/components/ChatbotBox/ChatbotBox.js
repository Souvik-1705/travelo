import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from "react-redux";  
import ChatbotIcon from '../ChatbotIcon/ChatbotIcon';
import "./ChatbotBox.css";
import ChatForm from '../ChatForm/ChatForm';
import ChatMessage from '../ChatMessage/ChatMessage';

const ChatbotBox = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  
  const cities = useSelector((state) => state.city.cities);
  const categories = useSelector((state) => state.category.categories);
  const listings = useSelector((state) => state.listing.listings);
  const bookings = useSelector((state) => state.booking.bookings);

  
  const generateBotResponse = async (history, userQuery) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text, isError }
      ]);
    };

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }]
    }));

    try {
    
      const allData = {
        cities,
        categories,
        listings,
        bookings
      };

      const requestBody = {
        contents: [
          { role: "user", parts: [{ text: `User asked: ${userQuery}. Use this company data: ${JSON.stringify(allData)}` }] },
          ...formattedHistory
        ]
      };

      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();

      updateHistory(apiResponseText);
    } catch (error) {
      console.error("❌ Error in generateBotResponse:", error);
      updateHistory(error.message, true);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button id="chatbot-toggler" onClick={() => setShowChatbot(prev => !prev)}>
        <span className="material-symbols-rounded">mode_comment</span>
        <span className="material-symbols-rounded">close</span>
      </button>

      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button
            className="material-symbols-rounded"
            onClick={() => setShowChatbot(prev => !prev)}
          >
            keyboard_arrow_down
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hello 👋, how can I help you today?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotBox;
