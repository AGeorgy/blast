import { ITileStore } from "./ITileStore";
import { Tile } from "./Model/Tile";

export class TileStore implements ITileStore {
    private _tiles: Map<string, Tile>;
    private _cellIdToTileIdMap: Map<string, string>;

    constructor() {
        this._tiles = new Map<string, Tile>();
        this._cellIdToTileIdMap = new Map<string, string>();
    }

    updateTile(tile: Tile): void {
        this._tiles.set(tile.id, tile);
    }

    getTileByCellId(id: string): Tile {
        if (this._cellIdToTileIdMap.has(id)) {
            return this._tiles.get(this._cellIdToTileIdMap.get(id));
        }
        return null;
    }

    getTileById(tileId: string): Tile {
        if (this._tiles.has(tileId)) {
            return this._tiles.get(tileId);
        }
        return null;
    }

    addTile(tile: Tile): void {
        this._tiles.set(tile.id, tile);
        this._cellIdToTileIdMap.set(tile.slotId, tile.id);
    }

    clearTiles(): void {
        this._tiles.clear();
    }

}