export class Observer {

  private _eventHandlers: EventHandlerHash = {};

  on(eventName: string, handler: any, context: any = null) {

    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }

    this._eventHandlers[eventName].push({fn: handler, ctx: context});

  }

  off(eventName: string, handler: any) {

    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return;
    }

    const handlers = this._eventHandlers[eventName];

    for(let i = 0, length = handlers.length; i < handlers.length; i++) {
      if (handlers[i].fn == handler) {
          handlers.splice(i--, 1);
      }
    }

  }

  trigger(eventName: string, ...args: any[]) {

    if (!this._eventHandlers || !this._eventHandlers[eventName]) {
      return;
    }

    const handlers = this._eventHandlers[eventName];

    for (let i = 0, length = handlers.length; i < length; i+=1) {
      const handler: EventHandler = handlers[i];

      handler.fn.apply(handler.ctx || this, args);
    }

  }

}

export interface EventHandler {
  fn: any;
  ctx: any;
};

export interface EventHandlerHash {
  [key: string]: EventHandler[]
};
