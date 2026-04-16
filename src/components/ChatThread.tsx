import React, { useState, useEffect } from 'react';
import { appStore, SendMessageCommand } from '../core/commands/CommandHandler';
import { globalEventBus } from '../core/events/EventBus';
import type { Message } from '../core/domain/types';

interface ChatThreadProps {
  cardId: string;
}

const ChatThread: React.FC<ChatThreadProps> = ({ cardId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const refreshMessages = () => {
    setMessages(appStore.messages.filter(m => m.cardId === cardId));
  };

  useEffect(() => {
    refreshMessages();
    const unsub = globalEventBus.subscribe('MessageSent', () => {
      refreshMessages();
    });
    return () => unsub();
  }, [cardId]);

  const handleSend = () => {
    if (input.trim()) {
      new SendMessageCommand(input, 'user-jimin', cardId).execute();
      setInput('');
    }
  };

  return (
    <div className="chat-thread">
      <div className="messages-list">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <strong>{msg.userId}: </strong>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatThread;
