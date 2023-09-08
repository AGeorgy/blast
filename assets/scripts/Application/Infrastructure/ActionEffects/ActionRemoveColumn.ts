import { IActionEffect } from "../Modules/Action/Model/IActionEffect";
import { IBoardService } from "../Modules/Board/IBoardService";
import { ITileService } from "../Modules/Tiles/ITileService";

export class ActionRemoveColumn implements IActionEffect {
    private _boardService: IBoardService;
    private _tileService: ITileService;

    constructor(tileService: ITileService, boardService: IBoardService) {
        this._tileService = tileService;
        this._boardService = boardService;
    }

    applyEffect(tileIds: string[]): void {
        console.log("ActionRemoveColumn execute", tileIds);

        for (let index = 0; index < tileIds.length; index++) {
            const tileId = tileIds[index];
            let tile = this._tileService.getTileById(tileId);
            this._boardService.removeColumnSlots(tile.slotId);
        }
    }
}