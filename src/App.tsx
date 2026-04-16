import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChannelView from './components/ChannelView';
import { appStore } from './core/commands/CommandHandler';
import './App.css';

function App() {
  const [activeChannelId, setActiveChannelId] = useState(appStore.channels[0]?.id || '');

  return (
    <div className="app-layout">
      <Sidebar 
        activeChannelId={activeChannelId} 
        onChannelSelect={setActiveChannelId} 
      />
      <main className="main-content">
        {activeChannelId ? (
          <ChannelView channelId={activeChannelId} />
        ) : (
          <div className="welcome-screen">
            <h1>Welcome to Vibecoding</h1>
            <p>Select a channel to start collaborating</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
