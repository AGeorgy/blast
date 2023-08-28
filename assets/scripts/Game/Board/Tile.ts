import { Color } from "cc";
import { ITile } from "./ITile";

export class Tile implements ITile {
    static _idCounter: number = 0;

    private _id: number;
    private _x: number;
    private _y: number;
    private _color: Color;

    constructor(x: number, y: number, color: Color, id?: number) {
        if (id) {
            this._id = id;
        } else {
            this._id = Tile._idCounter++;
        }
        this._x = x;
        this._y = y;
        this._color = color;
    }

    setPosition(position: { x: number, y: number }): void {
        this._x = position.x;
        this._y = position.y;
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