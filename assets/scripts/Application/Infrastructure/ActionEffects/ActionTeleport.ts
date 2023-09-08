import { IActionEffect } from "../Modules/Action/Model/IActionEffect";
import { IBoardService } from "../Modules/Board/IBoardService";
import { ITileService } from "../Modules/Tiles/ITileService";

export class ActionTeleport implements IActionEffect {
    private _boardService: IBoardService;
    private _tileService: ITileService;

    constructor(tileService: ITileService, boardService: IBoardService) {
        this._tileService = tileService;
        this._boardService = boardService;
    }

    applyEffect(tileIds: string[]): void {
        console.log("ActionTeleport execute", tileIds);

        if (tileIds.length == 2) {
            let tile0 = this._tileService.getTileById(tileIds[0]);
            let tile1 = this._tileService.getTileById(tileIds[1]);

            this._boardService.exchangeTiles(tile0.slotId, tile1.slotId);
        }
    }
}