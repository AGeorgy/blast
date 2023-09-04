import { IBoard } from "../Board/IBoard";
import { Tile } from "../Board/Tile";
import { ActionBomb } from "./ActionBomb";
import { ActionRemoveBoard } from "./ActionRemoveBoard";
import { ActionRemoveColumn } from "./ActionRemoveColumn";
import { ActionRemoveRow } from "./ActionRemoveRow";
import { ActionResult } from "./ActionResult";
import { IAction } from "./IAction";
import { IActionResult } from "./IActionResult";

export class ActionSuper implements IAction {
    private _bunchSize: number;
    private _radius: number;

    constructor(bunchSize: number, radius: number) {
        this._bunchSize = bunchSize;
        this._radius = radius;
    }

    execute(board: IBoard, positions: { x: number, y: number }[]): IActionResult {
        console.log("ActionSuper execute", positions);
        let action = this.getRandomAction(board);

        board.removeTiles(positions);
        board.setTile(new Tile(positions[0].x, positions[0].y, board.colorPalette.getRandomColor(), action));

        return new ActionResult(positions);
    }

    private getRandomAction(board: IBoard): IAction {
        let random = Math.floor(Math.random() * 4);
        switch (random) {
            case 0:
                return new ActionRemoveRow();
            case 1:
                return new ActionRemoveColumn();
            case 2:
                return new ActionBomb(this._radius);
            case 3:
                return new ActionRemoveBoard();
        }
    }
}