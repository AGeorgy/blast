export class Signal<T = void> implements ISignal<T>{
    private handlers: Set<(data: T) => void> = new Set<(data: T) => void>();

    subscribe(handler: (data?: T) => void): void {
        this.handlers.add(handler);
    }

    unSubscribe(handler: (data?: T) => void): void {
        this.handlers.delete(handler);
    }

    trigger(data: T): void {
        this.handlers.forEach(handler => handler(data));
    }
}

export interface ISignal<T = void> {
    subscribe(handler: (data?: T) => void): void;
    unSubscribe(handler: (data?: T) => void): void;
}