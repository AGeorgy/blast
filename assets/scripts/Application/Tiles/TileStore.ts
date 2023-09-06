import { ITileStore } from "../../Modules/Tiles/ITileStore";
import { Tile } from "../../Modules/Tiles/Model/Tile";

export class TileStore implements ITileStore {
    private _tiles: Map<string, Tile>;

    constructor() {
        this._tiles = new Map<string, Tile>();
    }

    addTile(tile: Tile): void {
        this._tiles.set(tile.id, tile);
    }

    clearTiles(): void {
        this._tiles.clear();
    }

}