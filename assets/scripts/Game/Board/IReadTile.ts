import { Color } from "cc";

export interface IReadTile {
    readonly id: number;
    readonly x: number;
    readonly y: number;
    readonly color: Color;
}