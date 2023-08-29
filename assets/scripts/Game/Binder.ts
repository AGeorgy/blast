
// TODO: dont know yet how to bind model and view in CocosCreator better than this
export class Binder {
    private static instance: Binder;
    private _bindings: Map<string, any> = new Map<string, any>();

    private constructor() { }

    public static getInstance(): Binder {
        if (!Binder.instance) {
            Binder.instance = new Binder();
        }

        return Binder.instance;
    }

    public resolve<T>(type: string): T {
        return Binder.instance._bindings.get(type);
    }

    public addBinding(type: string, instance: any): void {
        if (this._bindings.has(type)) {
            return;
        }

        this._bindings.set(type, instance);
    }
}