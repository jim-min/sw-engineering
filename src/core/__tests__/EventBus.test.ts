import { describe, it, expect, vi } from 'vitest';
import { EventBus } from '../events/EventBus';

describe('EventBus', () => {
  it('should notify subscribers when an event is published', () => {
    const bus = new EventBus();
    const handler = vi.fn();
    
    bus.subscribe('TEST_EVENT', handler);
    bus.publish('TEST_EVENT', { foo: 'bar' });
    
    expect(handler).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('should not notify unsubscribed handlers', () => {
    const bus = new EventBus();
    const handler = vi.fn();
    
    const unsubscribe = bus.subscribe('TEST_EVENT', handler);
    unsubscribe();
    bus.publish('TEST_EVENT', { foo: 'bar' });
    
    expect(handler).not.toHaveBeenCalled();
  });
});
