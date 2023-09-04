import { IBoard } from "../Board/IBoard";
import { ActionResult } from "./ActionResult";
import { IAction } from "./IAction";
import { IActionResult } from "./IActionResult";

export class ActionRemoveBoard implements IAction {
    execute(board: IBoard, positions: { x: number; y: number; }[]): IActionResult {
        console.log("ActionRemoveBoard execute");
        let tilesToRemoveArray: { x: number, y: number }[] = [];

        for (let x = 0; x < board.xMax; x++) {
            for (let y = 0; y < board.yMax; y++) {
                tilesToRemoveArray.push({ x: x, y: y });
            }
        }

        board.removeTiles(tilesToRemoveArray);
        return new ActionResult(tilesToRemoveArray);
    }
}