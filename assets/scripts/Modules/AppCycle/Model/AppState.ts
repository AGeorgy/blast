import { StateType } from "./StateType";

export class AppState {
    private _state: StateType;

    constructor() {
        this._state = StateType.None;
    }

    get state(): StateType {
        return this._state;
    }

    setAppState(state: StateType): void {
        this._state = state;
    }
}