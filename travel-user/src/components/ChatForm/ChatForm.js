import React, { useRef } from 'react';
import { CompanyInfo } from '../CompanyInfo';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // user message
    setChatHistory(history => [...history, { role: "user", text: userMessage }]);

    setTimeout(() => {
      setChatHistory(history => [...history, { role: "model", text: "Thinking..." }]);
      generateBotResponse([...chatHistory, { role: "user", text: `Here is Travelo company info: ${JSON.stringify(CompanyInfo)}.Now please answer this user query: ${userMessage}` }]);
    }, 600);
  };

  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input ref={inputRef} type="text" placeholder="Message..." className="message-input" required />
      <button type="submit" className="material-symbols-rounded">arrow_upward</button>
    </form>
  );
};

export default ChatForm;
