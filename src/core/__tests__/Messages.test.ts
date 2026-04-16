import { describe, it, expect, vi } from 'vitest';
import { Store, SendMessageCommand } from '../commands/CommandHandler';
import { globalEventBus } from '../events/EventBus';

describe('Message Commands', () => {
  it('SendMessageCommand should add message and publish event', () => {
    const store = new Store();
    const publishSpy = vi.spyOn(globalEventBus, 'publish');
    const command = new SendMessageCommand('Hello', 'user-1', 'card-1', undefined, store);
    
    command.execute();
    
    expect(store.messages.length).toBe(1);
    expect(store.messages[0].content).toBe('Hello');
    expect(publishSpy).toHaveBeenCalledWith('MessageSent', expect.objectContaining({ content: 'Hello' }));
  });
});
