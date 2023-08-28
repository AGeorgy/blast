import { IBoardLastChanged } from "./IBoardLastChanged";
import { IBoardReadData } from "./IBoardReadData";
import { ITile } from "./ITile";

export interface IBoard extends IBoardReadData {
    fill(): void;
    getTile(x: number, y: number): ITile;
    removeTile(x: number, y: number): void;
}