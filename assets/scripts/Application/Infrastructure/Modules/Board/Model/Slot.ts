import { SlotState } from "./SlotState";

export class Slot {
    private _id: string;
    private _x: number;
    private _y: number;
    private _state: SlotState;

    constructor(id: string, x: number, y: number, state: SlotState = SlotState.Empty) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._state = state;
    }

    get id(): string {
        return this._id;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    changePosition(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get state(): SlotState {
        return this._state;
    }

    set state(value: SlotState) {
        this._state = value;
    }

    get isEmpty(): boolean {
        return this._state === SlotState.Empty;
    }
}