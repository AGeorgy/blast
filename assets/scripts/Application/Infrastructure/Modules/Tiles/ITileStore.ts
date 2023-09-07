import { Tile } from "./Model/Tile";

export interface ITileStore {
    addTile(tile: Tile): void;
    clearTiles(): void;
}