import { Color } from "cc";
import { IAction } from "../Action/IAction";

export interface IReadTile {
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly color: Color;
    readonly action: IAction;
}