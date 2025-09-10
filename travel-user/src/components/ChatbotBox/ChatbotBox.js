import React, { useEffect, useRef, useState } from 'react';
import ChatbotIcon from '../ChatbotIcon/ChatbotIcon';
import "./ChatbotBox.css";
import ChatForm from '../ChatForm/ChatForm';
import ChatMessage from '../ChatMessage/ChatMessage';
import { CompanyInfo } from '../CompanyInfo';

const ChatbotBox = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {
    const updateHistory = (text, isError = false) => {
      setChatHistory(prev => [
        ...prev.filter(msg => msg.text !== "Thinking..."),
        { role: "model", text, isError }
      ]);
    };

    // Format history for Gemini API
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }]
    }));

    // Add CompanyInfo as system instruction
    const requestBody = {
      contents: [
        { role: "user", parts: [{ text: "Company Info: " + JSON.stringify(CompanyInfo) }] },
        ...formattedHistory
      ]
    };

    try {
      console.log("🔑 API URL:", process.env.REACT_APP_API_URL);
      console.log("📤 Request Body:", requestBody);

      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      console.log("📥 Raw Response:", response);

      const data = await response.json();
      console.log("📥 Parsed Response JSON:", data);

      if (!response.ok) throw new Error(data.error?.message || "Something went wrong!");

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1") // remove markdown bold
        .trim();

      console.log("🤖 Bot Reply:", apiResponseText);

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
