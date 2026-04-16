import React from 'react';
import type { Card, Column as ColumnType } from '../core/domain/types';
import CardItem from './CardItem';

interface ColumnProps {
  column: ColumnType;
  cards: Card[];
  onAddCard: () => void;
  onMoveCard: (cardId: string, targetColumnId: string) => void;
  allColumns: ColumnType[];
}

const Column: React.FC<ColumnProps> = ({ column, cards, onAddCard, onMoveCard, allColumns }) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      onMoveCard(cardId, column.id);
    }
  };

  return (
    <div 
      className="kanban-column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <h3>{column.title}</h3>
        <button onClick={onAddCard}>+</button>
      </div>
      <div className="column-content">
        {cards.map(card => (
          <CardItem 
            key={card.id} 
            card={card} 
            onMove={onMoveCard}
            allColumns={allColumns}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
