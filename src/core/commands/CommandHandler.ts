import { v4 as uuidv4 } from 'uuid';
import type { Card, Column, Board, Message, Channel } from '../domain/types';
import { globalEventBus } from '../events/EventBus';

// Simple In-memory Store for MVP
export class Store {
  cards: Card[] = [];
  columns: Column[] = [];
  boards: Board[] = [];
  messages: Message[] = [];
  channels: Channel[] = [];

  constructor() {
    // Initial Seed Data
    const boardId = 'board-1';
    this.boards.push({ id: boardId, workspaceId: 'ws-1', title: 'Vibecoding Project' });
    this.columns.push(
      { id: 'col-1', boardId, title: 'Todo', order: 0 },
      { id: 'col-2', boardId, title: 'In Progress', order: 1 },
      { id: 'col-3', boardId, title: 'Done', order: 2 }
    );

    this.channels.push(
      { id: 'chan-1', name: 'general', description: 'General discussion' },
      { id: 'chan-2', name: 'development', description: 'Dev talk' },
      { id: 'chan-3', name: 'design', description: 'Design assets and feedback' }
    );
  }
}

export const appStore = new Store();

export interface Command {
  execute(): void;
}

export class CreateCardCommand implements Command {
  constructor(
    private title: string,
    private columnId: string,
    private description: string = '',
    private store: Store = appStore
  ) {}

  execute() {
    if (!this.title) throw new Error('Title is required');
    
    const newCard: Card = {
      id: uuidv4(),
      columnId: this.columnId,
      title: this.title,
      description: this.description,
    };

    this.store.cards.push(newCard);
    globalEventBus.publish('CardCreated', newCard);
  }
}

export class MoveCardCommand implements Command {
  constructor(
    private cardId: string, 
    private targetColumnId: string,
    private store: Store = appStore
  ) {}

  execute() {
    const card = this.store.cards.find(c => c.id === this.cardId);
    if (!card) throw new Error('Card not found');

    const oldColumnId = card.columnId;
    card.columnId = this.targetColumnId;

    globalEventBus.publish('CardMoved', { 
      cardId: this.cardId, 
      oldColumnId, 
      newColumnId: this.targetColumnId 
    });
  }
}

export class UpdateCardCommand implements Command {
  constructor(
    private cardId: string,
    private title: string,
    private description: string,
    private store: Store = appStore
  ) {}

  execute() {
    const card = this.store.cards.find(c => c.id === this.cardId);
    if (!card) throw new Error('Card not found');

    if (!this.title) throw new Error('Title is required');

    card.title = this.title;
    card.description = this.description;

    globalEventBus.publish('CardUpdated', card);
  }
}

export class SendMessageCommand implements Command {
  constructor(
    private content: string,
    private userId: string,
    private cardId?: string,
    private channelId?: string,
    private store: Store = appStore
  ) {}

  execute() {
    const newMessage: Message = {
      id: uuidv4(),
      content: this.content,
      userId: this.userId,
      cardId: this.cardId,
      channelId: this.channelId,
      createdAt: new Date(),
    };

    this.store.messages.push(newMessage);
    globalEventBus.publish('MessageSent', newMessage);
  }
}
