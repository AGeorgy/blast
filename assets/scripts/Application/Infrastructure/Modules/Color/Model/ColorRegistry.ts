import { Color } from "cc";

export class ColorRegistry {
    private _id: string;
    private _color: Color;

    constructor(id: string, color: Color) {
        this._id = id;
        this._color = color;
    }

    get id(): string {
        return this._id;
    }

    get color(): Color {
        return this._color;
    }
}