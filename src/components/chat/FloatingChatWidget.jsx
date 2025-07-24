import React, { useState } from 'react';
import { CloseOutlined, MessageOutlined } from '@ant-design/icons';
import './FloatingChatWidget.css';

const CHAT_URL = 'https://chatbot-tripulaciones-730053494094.europe-west1.run.app';

const FloatingChatWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <button
        className="chat-fab"
        aria-label="Abrir chat"
        onClick={() => setOpen(o => !o)}
      >
        {open ? <CloseOutlined /> : <MessageOutlined />}
      </button>

      {/* Panel del chat */}
      <div className={`chat-panel ${open ? 'open' : ''}`}>
        <iframe
          title="chatbot"
          src={CHAT_URL}
          className="chat-iframe"
        />
      </div>
    </>
  );
};

export default FloatingChatWidget;
