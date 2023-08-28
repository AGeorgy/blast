import { ITile } from "./ITile";

export interface IBoard {
    readonly yMax: number;
    readonly xMax: number;
    fill(): void;
    getTile(x: number, y: number): ITile;
    removeTile(x: number, y: number): void;
}