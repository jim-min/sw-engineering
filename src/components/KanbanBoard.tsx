import React, { useState, useEffect } from 'react';
import { appStore, CreateCardCommand, MoveCardCommand } from '../core/commands/CommandHandler';
import { globalEventBus } from '../core/events/EventBus';
import Column from './Column';
import './KanbanBoard.css';

const KanbanBoard: React.FC = () => {
  const [cards, setCards] = useState([...appStore.cards]);
  const [columns] = useState([...appStore.columns]);

  useEffect(() => {
    const unsub1 = globalEventBus.subscribe('CardCreated', () => {
      setCards([...appStore.cards]);
    });
    const unsub2 = globalEventBus.subscribe('CardMoved', () => {
      setCards([...appStore.cards]);
    });
    const unsub3 = globalEventBus.subscribe('CardUpdated', () => {
      setCards([...appStore.cards]);
    });

    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, []);

  const handleAddCard = (columnId: string) => {
    const title = prompt('Card Title:');
    if (title) {
      new CreateCardCommand(title, columnId).execute();
    }
  };

  const handleMoveCard = (cardId: string, targetColumnId: string) => {
    new MoveCardCommand(cardId, targetColumnId).execute();
  };

  return (
    <div className="kanban-board">
      {columns.map(col => (
        <Column 
          key={col.id} 
          column={col} 
          cards={cards.filter(c => c.columnId === col.id)}
          onAddCard={() => handleAddCard(col.id)}
          onMoveCard={handleMoveCard}
          allColumns={columns}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
