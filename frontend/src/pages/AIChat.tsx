import React from 'react';
import { ChatAgent } from '../components/ChatAgent';
import './AIChat.css';

export const AIChat: React.FC = () => {
  return (
    <div className="ai-chat-page">
      <div className="ai-chat-container">
        <ChatAgent />
      </div>
    </div>
  );
};

