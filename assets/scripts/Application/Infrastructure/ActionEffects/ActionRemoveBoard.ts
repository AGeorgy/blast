import { IActionEffect } from "../Modules/Action/Model/IActionEffect";
import { IBoardService } from "../Modules/Board/IBoardService";


export class ActionRemoveBoard implements IActionEffect {
    private _boardService: IBoardService;

    constructor(boardService: IBoardService) {
        this._boardService = boardService;
    }

    applyEffect(tileIds: string[]): void {
        console.log("ActionRemoveBoard execute");

        this._boardService.clearBoard();
    }
}