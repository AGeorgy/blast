import { ISlotStore } from "../../Modules/Board/ISlotStore";
import { ITileService } from "../../Modules/Tiles/ITileService";
import { ITileStore } from "../../Modules/Tiles/ITileStore";
import { Tile } from "../../Modules/Tiles/Model/Tile";
import { ColorPaletteService } from "../Color/ColorPaletteService";

export class TileService implements ITileService {
    private _tileStore: ITileStore;
    private _colorService: ColorPaletteService;
    private _slotStore: ISlotStore;

    constructor(tileStore: ITileStore, colorService: ColorPaletteService, slotStore: ISlotStore) {
        this._tileStore = tileStore;
        this._colorService = colorService;
        this._slotStore = slotStore;
    }

    resetTiles(): void {
        this._tileStore.clearTiles();
        this._slotStore.getAllSlotIds().forEach(slotId => {
            let tile = new Tile(crypto.randomUUID(), slotId, this._colorService.getRandomColor().id);
            this._tileStore.addTile(tile);
        });
    }
}