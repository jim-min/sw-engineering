import React, { useState, useEffect } from 'react';
import { appStore, SendMessageCommand } from '../core/commands/CommandHandler';
import { globalEventBus } from '../core/events/EventBus';
import type { Message, Channel } from '../core/domain/types';
import KanbanBoard from './KanbanBoard';

interface ChannelViewProps {
  channelId: string;
}

const ChannelView: React.FC<ChannelViewProps> = ({ channelId }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'board'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  
  const channel = appStore.channels.find(c => c.id === channelId);

  const refreshMessages = () => {
    setMessages(appStore.messages.filter(m => m.channelId === channelId));
  };

  useEffect(() => {
    refreshMessages();
    const unsub = globalEventBus.subscribe('MessageSent', () => {
      refreshMessages();
    });
    return () => unsub();
  }, [channelId]);

  const handleSend = () => {
    if (input.trim()) {
      new SendMessageCommand(input, 'user-jimin', undefined, channelId).execute();
      setInput('');
    }
  };

  if (!channel) return <div>Channel not found</div>;

  return (
    <div className="channel-view">
      <header className="channel-header">
        <div className="channel-info">
          <h2># {channel.name}</h2>
          <p>{channel.description}</p>
        </div>
        <nav className="channel-tabs">
          <button 
            className={activeTab === 'chat' ? 'active' : ''} 
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </button>
          <button 
            className={activeTab === 'board' ? 'active' : ''} 
            onClick={() => setActiveTab('board')}
          >
            Board
          </button>
        </nav>
      </header>

      <main className="channel-content">
        {activeTab === 'chat' ? (
          <div className="chat-container">
            <div className="messages-list">
              {messages.length === 0 && <p className="empty-msg">No messages yet. Start the conversation!</p>}
              {messages.map(msg => (
                <div key={msg.id} className="message">
                  <div className="msg-header">
                    <span className="msg-user">{msg.userId}</span>
                    <span className="msg-time">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="msg-content">{msg.content}</div>
                </div>
              ))}
            </div>
            <div className="chat-input-area">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={`Message #${channel.name}`}
              />
              <button onClick={handleSend} disabled={!input.trim()}>Send</button>
            </div>
          </div>
        ) : (
          <div className="board-container">
            <KanbanBoard />
          </div>
        )}
      </main>
    </div>
  );
};

export default ChannelView;
