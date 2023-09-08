import { Tile } from "./Model/Tile";

export interface ITileStore {
    updateTile(tile: Tile): void;
    getTileByCellId(id: string): Tile;
    getTileById(tileId: string): Tile;
    addTile(tile: Tile): void;
    clearTiles(): void;
}