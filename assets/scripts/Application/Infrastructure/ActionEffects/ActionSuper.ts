import { IActionService } from "../Modules/Action/IActionService";
import { IActionEffect } from "../Modules/Action/Model/IActionEffect";
import { IBoardService } from "../Modules/Board/IBoardService";
import { IColorPaletteService } from "../Modules/Color/IColorPaletteService";
import { ITileService } from "../Modules/Tiles/ITileService";
import { ActionBomb } from "./ActionBomb";
import { ActionRemoveBoard } from "./ActionRemoveBoard";
import { ActionRemoveColumn } from "./ActionRemoveColumn";
import { ActionRemoveRow } from "./ActionRemoveRow";

export class ActionSuper implements IActionEffect {
    private _colorService: IColorPaletteService;
    private _tileService: ITileService;
    private _radius: number;
    private _boardService: IBoardService;
    private _actionService: IActionService;

    constructor(tileService: ITileService, colorService: IColorPaletteService, actionService: IActionService,
        boardService: IBoardService, radius: number) {
        this._tileService = tileService;
        this._boardService = boardService;
        this._colorService = colorService;
        this._actionService = actionService;
        this._radius = radius;
    }

    applyEffect(tileIds: string[]): void {
        console.log("ActionSuper execute", tileIds);

        for (let index = 0; index < tileIds.length; index++) {
            const tileId = tileIds[index];
            let color = this._colorService.getRandomColor();
            let effect = this.getRandomActionEffect();
            let actionId = this._actionService.createAction(1, 1, 1, effect);

            this._tileService.setColorAndActionEffect(tileId, color.id, actionId);
        }
    }

    private getRandomActionEffect(): IActionEffect {
        let random = Math.floor(Math.random() * 4);
        switch (random) {
            case 0:
                return new ActionRemoveRow(this._tileService, this._boardService);
            case 1:
                return new ActionRemoveColumn(this._tileService, this._boardService);
            case 2:
                return new ActionBomb(this._tileService, this._boardService, this._radius);
            case 3:
                return new ActionRemoveBoard(this._boardService);
        }
    }
}