import { IBoard } from "../Board/IBoard";
import { ActionResult } from "./ActionResult";
import { IAction } from "./IAction";
import { IActionResult } from "./IActionResult";

export class ActionTeleport implements IAction {
    execute(board: IBoard, positions: { x: number, y: number }[]): IActionResult {
        console.log("ActionTeleport execute", positions);
        if (positions.length == 2) {
            board.exchangeTiles(positions[0], positions[1]);
        }

        return new ActionResult();
    }
}