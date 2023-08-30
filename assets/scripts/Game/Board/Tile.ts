import { Color } from "cc";
import { ITile } from "./ITile";

export class Tile implements ITile {
    private static _idCounter: number = 0;

    private readonly _id: number;
    private _x: number;
    private _y: number;
    private readonly _color: Color;

    constructor(x: number, y: number, color: Color, id: number = Tile._idCounter++) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._color = color;
    }

    setPosition({ x, y }: { x: number, y: number }): void {
        this._x = x;
        this._y = y;
    }

    get id(): number {
        return this._id;
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