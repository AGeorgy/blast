import { IBoard } from "../Board/IBoard";
import { ActionResult } from "./ActionResult";
import { IAction } from "./IAction";
import { IActionResult } from "./IActionResult";

export class ActionRemoveRow implements IAction {
    execute(board: IBoard, positions: { x: number; y: number; }[]): IActionResult {
        console.log("ActionRemoveRow execute", positions);
        let tilesToRemoveArray: { x: number, y: number }[] = [];

        for (let index = 0; index < positions.length; index++) {
            const position = positions[index];
            tilesToRemoveArray = tilesToRemoveArray.concat(this.getElementsInRow(board, position.y));
        }

        board.removeTiles(tilesToRemoveArray);
        return new ActionResult(tilesToRemoveArray);
    }
    getElementsInRow(board: IBoard, y: number): ConcatArray<{ x: number; y: number; }> {
        let tilesToRemove: { x: number, y: number }[] = [];

        for (let i = 0; i < board.xMax; i++) {
            tilesToRemove.push({ x: i, y: y });
        }
        return tilesToRemove;
    }

}