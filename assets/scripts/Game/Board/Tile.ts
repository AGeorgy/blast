import { Color } from "cc";
import { ITile } from "./ITile";
import { IAction } from "../Action/IAction";

export class Tile implements ITile {
    private static _idCounter: number = 0;

    private readonly _id: number;
    private _x: number;
    private _y: number;
    private readonly _color: Color;
    private readonly _action: IAction;

    constructor(x: number, y: number, color: Color, action: IAction) {
        this._id = Tile._idCounter++;
        this._x = x;
        this._y = y;
        this._color = color;
        this._action = action;
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

    get action(): IAction {
        return this._action;
    }
}