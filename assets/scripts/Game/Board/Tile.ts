import { Color } from "cc";
import { ITile } from "./ITile";

export class Tile implements ITile {
    private _x: number;
    private _y: number;
    private _color: Color;

    constructor(x: number, y: number, color: Color) {
        this._x = x;
        this._y = y;
        this._color = color;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get color(): Color {
        return this._color;
    }
}