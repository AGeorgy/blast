export class Tile {
    private _id: string;
    private _colorId: string;
    private _slotId: string;
    private _inputModeId: string;
    private _actionId: string;

    constructor(id: string, colorId: string, slotId: string, inputModeId: string, actionId: string) {
        this._id = id;
        this._colorId = colorId;
        this._slotId = slotId;
        this._inputModeId = inputModeId;
        this._actionId = actionId;
    }

    get id(): string {
        return this._id;
    }

    get colorId(): string {
        return this._colorId;
    }

    get slotId(): string {
        return this._slotId;
    }

    get inputModeId(): string {
        return this._inputModeId;
    }

    get actionId(): string {
        return this._actionId;
    }

    setColorAndActionEffect(colorId: string, actionId: string) {
        this._colorId = colorId;
        this._actionId = actionId;
    }
}