import { IColorPalette } from "../Color/IColorPalette";
import { IBoardReadData } from "./IBoardReadData";
import { ITile } from "./ITile";

export interface IBoard extends IBoardReadData {
    readonly colorPalette: IColorPalette;
    setTile(tile: ITile): void;
    getTile(x: number, y: number): ITile;
    removeTiles(tilesToRemove: { x: number, y: number }[]): void;
    exchangeTiles(tile1: { x: number, y: number }, tile2: { x: number, y: number }): void;
}