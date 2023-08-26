import { ITile } from "./ITile";

export interface IBoard {
    readonly yMax: number;
    readonly xMax: number;
    shuffle(): void;
    reset(): void;
    getTile(x: number, y: number): ITile;
    removeTile(x: number, y: number): void;
}