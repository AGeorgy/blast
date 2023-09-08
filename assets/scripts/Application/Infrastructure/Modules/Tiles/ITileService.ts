import { Tile } from "./Model/Tile";

export interface ITileService {
    setColorAndActionEffect(tileId: string, colorId: string, actionId: string): void;
    getTileBySlotId(id: string): Tile;
    createTile(id: string, colorId: string, slotId: string, tileInputModeId: string, actionId: string): void;
    clearTiles(): void;
    getTileById(tileId: string): Tile;
}