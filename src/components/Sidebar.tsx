import React from 'react';
import { appStore } from '../core/commands/CommandHandler';
import type { Channel } from '../core/domain/types';

interface SidebarProps {
  activeChannelId: string;
  onChannelSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeChannelId, onChannelSelect }) => {
  const channels = appStore.channels;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Vibecoding</h2>
      </div>
      <div className="sidebar-section">
        <h3>Channels</h3>
        <ul>
          {channels.map(channel => (
            <li 
              key={channel.id} 
              className={channel.id === activeChannelId ? 'active' : ''}
              onClick={() => onChannelSelect(channel.id)}
            >
              # {channel.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
