import { IBoard } from "../Board/IBoard";
import { ActionResult } from "./ActionResult";
import { IAction } from "./IAction";
import { IActionResult } from "./IActionResult";

export class ActionRemoveColumn implements IAction {
    execute(board: IBoard, positions: { x: number; y: number; }[]): IActionResult {
        console.log("ActionRemoveColumn execute", positions);
        let tilesToRemoveArray: { x: number, y: number }[] = [];

        for (let index = 0; index < positions.length; index++) {
            const position = positions[index];
            tilesToRemoveArray = tilesToRemoveArray.concat(this.getElementsInColumn(board, position.x));
        }

        board.removeTiles(tilesToRemoveArray);
        return new ActionResult(tilesToRemoveArray);
    }

    private getElementsInColumn(board: IBoard, x: number): ConcatArray<{ x: number; y: number; }> {
        let tilesToRemove: { x: number, y: number }[] = [];

        for (let i = 0; i < board.yMax; i++) {
            tilesToRemove.push({ x: x, y: i });
        }
        return tilesToRemove;
    }

}