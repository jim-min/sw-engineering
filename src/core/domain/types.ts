export interface User {
  id: string;
  name: string;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
}

export interface Card {
  id: string;
  columnId: string;
  title: string;
  description: string;
  assigneeId?: string;
  dueDate?: Date;
}

export interface Column {
  id: string;
  boardId: string;
  title: string;
  order: number;
}

export interface Board {
  id: string;
  workspaceId: string;
  title: string;
}

export interface Message {
  id: string;
  channelId?: string;
  cardId?: string; // For thread
  userId: string;
  content: string;
  createdAt: Date;
}

export interface TaskActivity {
  id: string;
  cardId: string;
  userId: string;
  action: string;
  createdAt: Date;
}
