import { describe, it, expect, vi } from 'vitest';
import { Store, CreateCardCommand, MoveCardCommand } from '../commands/CommandHandler';
import { globalEventBus } from '../events/EventBus';

describe('Commands', () => {
  it('CreateCardCommand should add a card to the store and publish event', () => {
    const store = new Store();
    const publishSpy = vi.spyOn(globalEventBus, 'publish');
    const command = new CreateCardCommand('Test Card', 'col-1', 'Description', store);
    
    command.execute();
    
    expect(store.cards.length).toBe(1);
    expect(store.cards[0].title).toBe('Test Card');
    expect(publishSpy).toHaveBeenCalledWith('CardCreated', expect.objectContaining({ title: 'Test Card' }));
  });

  it('MoveCardCommand should change card column and publish event', () => {
    const store = new Store();
    const commandCreate = new CreateCardCommand('Move Me', 'col-1', '', store);
    commandCreate.execute();
    
    const cardId = store.cards[0].id;
    const publishSpy = vi.spyOn(globalEventBus, 'publish');
    const commandMove = new MoveCardCommand(cardId, 'col-2', store);
    
    commandMove.execute();
    
    expect(store.cards[0].columnId).toBe('col-2');
    expect(publishSpy).toHaveBeenCalledWith('CardMoved', expect.objectContaining({ 
      cardId, 
      oldColumnId: 'col-1', 
      newColumnId: 'col-2' 
    }));
  });
});
