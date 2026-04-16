import React, { useState } from 'react';
import type { Card, Column } from '../core/domain/types';
import CardModal from './CardModal';

interface CardItemProps {
  card: Card;
  onMove: (cardId: string, targetColumnId: string) => void;
  allColumns: Column[];
}

const CardItem: React.FC<CardItemProps> = ({ card, onMove, allColumns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="card-item"
        draggable
        onDragStart={handleDragStart}
        onClick={handleCardClick}
      >
        <h4>{card.title}</h4>
        {card.description && <p className="card-description-preview">{card.description}</p>}
      </div>
      
      {isModalOpen && (
        <CardModal 
          card={card} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default CardItem;
