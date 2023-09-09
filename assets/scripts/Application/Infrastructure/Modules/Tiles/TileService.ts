import { ITileService } from "./ITileService";
import { ITileStore } from "./ITileStore";
import { Tile } from "./Model/Tile";

export class TileService implements ITileService {
    private _tileStore: ITileStore;

    constructor(tileStore: ITileStore) {
        this._tileStore = tileStore;
    }

    setColorAndActionEffect(tileId: string, colorId: string, actionId: string): void {
        let tile = this._tileStore.getTileById(tileId);
        tile.setColorAndActionEffect(colorId, actionId);
        this._tileStore.updateTile(tile);
    }

    getTileBySlotId(id: string): Tile {
        return this._tileStore.getTileByCellId(id);
    }

    createTile(id: string, colorId: string, slotId: string, tileInputModeId: string, actionId: string): void {
        let tile = new Tile(id, colorId, slotId, tileInputModeId, actionId);
        this._tileStore.addTile(tile);
    }

    clearTiles(): void {
        this._tileStore.clearTiles();
    }

    getTileById(tileId: string): Tile {
        return this._tileStore.getTileById(tileId);
    }
}