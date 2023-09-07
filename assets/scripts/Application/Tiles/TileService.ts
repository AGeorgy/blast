import { ISlotStore } from "../../Modules/Board/ISlotStore";
import { IInputModeStore } from "../../Modules/InputMode/IInputModeStore";
import { ITileService } from "../../Modules/Tiles/ITileService";
import { ITileStore } from "../../Modules/Tiles/ITileStore";
import { Tile } from "../../Modules/Tiles/Model/Tile";
import { ColorPaletteService } from "../Color/ColorPaletteService";

export class TileService implements ITileService {
    private _tileStore: ITileStore;
    private _colorService: ColorPaletteService;
    private _slotStore: ISlotStore;
    private _inputModeStore: IInputModeStore;

    constructor(tileStore: ITileStore, colorService: ColorPaletteService, slotStore: ISlotStore, inputModeStore: IInputModeStore) {
        this._tileStore = tileStore;
        this._colorService = colorService;
        this._slotStore = slotStore;
        this._inputModeStore = inputModeStore;
    }

    // resetTiles(): void {
    //     this._tileStore.clearTiles();
    //     this._slotStore.getAllSlotIds().forEach(slotId => {
    //         let colorId = this._colorService.getRandomColor().id;
    //         let inputModeId = this._inputModeStore.getInputMode().id;
    //         let tile = new Tile(crypto.randomUUID(), slotId, colorId, inputModeId);
    //         this._tileStore.addTile(tile);
    //     });
    // }
}