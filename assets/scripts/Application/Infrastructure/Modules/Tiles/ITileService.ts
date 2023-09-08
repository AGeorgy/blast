import { Tile } from "./Model/Tile";

export interface ITileService {
    getTileById(tileId: string): Tile;
    // resetTiles(): void;
}