import { IBoardLastChanged } from "./IBoardLastChanged";
import { IBoardReadData } from "./IBoardReadData";
import { ITile } from "./ITile";

export interface IBoard extends IBoardReadData {
    getTile(x: number, y: number): ITile;
    removeTiles(tilesToRemove: { x: number, y: number }[]): void;
}