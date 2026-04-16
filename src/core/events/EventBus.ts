type Handler<T = any> = (data: T) => void;

export class EventBus {
  private handlers: Map<string, Handler[]> = new Map();

  subscribe<T>(eventType: string, handler: Handler<T>): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);

    return () => {
      const currentHandlers = this.handlers.get(eventType);
      if (currentHandlers) {
        this.handlers.set(eventType, currentHandlers.filter(h => h !== handler));
      }
    };
  }

  publish<T>(eventType: string, data: T): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }
}

export const globalEventBus = new EventBus();
