import { IBoardReadData } from "./IBoardReadData";
import { ITile } from "./ITile";

export interface IBoard extends IBoardReadData {
    getTile(x: number, y: number): ITile;
    removeTiles(tilesToRemove: { x: number, y: number }[]): void;
    exchangeTiles(tile1: { x: number, y: number }, tile2: { x: number, y: number }): void;
}