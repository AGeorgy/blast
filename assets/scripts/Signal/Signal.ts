export class Signal<T = void> implements ISignalSubscribe<T>, ISignalTrigger<T>{
    private _handlers: Set<(data: T) => void> = new Set<(data: T) => void>();
    private _data: T[] = [];

    subscribe(handler: (data: T) => void): void {
        this._handlers.add(handler);
        if (this._data.length > 0) {
            handler(this._data[this._data.length - 1]);
        }
    }

    unSubscribe(handler: (data: T) => void): void {
        this._handlers.delete(handler);
    }

    trigger(data: T): void {
        this._data.length = 0;
        this._data.push(data);
        this._handlers.forEach(handler => handler(data));
    }
}

export interface ISignalSubscribe<T = void> {
    subscribe(handler: (data: T) => void): void;
    unSubscribe(handler: (data: T) => void): void;
}

export interface ISignalTrigger<T = void> {
    trigger(data: T): void;
}