export type EventHandler<T = any> = (payload: T) => void | Promise<void>;

export interface EventBus {
  publish<T>(eventName: string, payload: T): void;
  subscribe<T>(eventName: string, handler: EventHandler<T>): () => void;
}

export class InMemoryEventBus implements EventBus {
  private handlers = new Map<string, Set<EventHandler>>();

  publish<T>(eventName: string, payload: T): void {
    const eventHandlers = this.handlers.get(eventName);
    if (!eventHandlers || eventHandlers.size === 0) return;

    for (const handler of eventHandlers) {
      try {
        handler(payload);
      } catch (err) {
        console.error(`[EventBus] Error in handler for '${eventName}':`, err);
      }
    }
  }

  subscribe<T>(eventName: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, new Set());
    }
    const set = this.handlers.get(eventName)!;
    set.add(handler as EventHandler);

    return () => {
      set.delete(handler as EventHandler);
      if (set.size === 0) {
        this.handlers.delete(eventName);
      }
    };
  }

  clear(): void {
    this.handlers.clear();
  }
}
