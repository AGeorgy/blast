export class Tile {
    private _id: string;
    private _colorId: string;
    private _slotId: string;

    constructor(id: string, colorId: string, slotId: string) {
        this._id = id;
        this._colorId = colorId;
        this._slotId = slotId;
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
}