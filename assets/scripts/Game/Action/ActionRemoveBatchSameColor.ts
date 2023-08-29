import { Color } from "cc";
import { IBoard } from "../Board/IBoard";
import { IAction } from "./IAction";
import { IActionResult } from "./IActionResult";
import { ActionResult } from "./ActionResult";

export class ActionRemoveBathSameColor implements IAction {
    private _minCellsInBath: number;

    constructor(minCellsInBath: number) {
        this._minCellsInBath = minCellsInBath;
    }

    canExecute(board: IBoard, x: number, y: number): boolean {
        console.log("ActionRemoveBathSameColor canExecute");
        let color = board.getTile(x, y).color;
        let tilesToRemove: { x: number, y: number }[] = this.getTilesInRadiusWithColor(board, x, y, color);
        if (tilesToRemove.length >= this._minCellsInBath) {
            return true;
        }
        return false;
    }

    execute(board: IBoard, x: number, y: number): IActionResult {
        console.log("ActionRemoveBathSameColor execute");
        return this.removeTilesInRadiusWithColor(board, x, y);
    }

    private removeTilesInRadiusWithColor(board: IBoard, x: number, y: number): IActionResult {
        let color = board.getTile(x, y).color;
        let tilesToRemove: { x: number, y: number }[] = this.getTilesInRadiusWithColor(board, x, y, color);

        if (tilesToRemove.length >= this._minCellsInBath) {
            board.removeTile(tilesToRemove);
            return new ActionResult(tilesToRemove);
        }

        return new ActionResult();
    }

    private getTilesInRadiusWithColor(board: IBoard, x: number, y: number, color: Color): { x: number, y: number }[] {
        let tilesToRemove: { x: number, y: number }[] = [];
        let tilesToCheck: { x: number, y: number }[] = [{ x: x, y: y }];

        while (tilesToCheck.length > 0) {
            let tileToCheck = tilesToCheck.pop();
            if (board.getTile(tileToCheck.x, tileToCheck.y).color.equals(color)) {
                tilesToRemove.push(tileToCheck);
                tilesToCheck = tilesToCheck.concat(this.getNeighbours(board, tileToCheck.x, tileToCheck.y));
            }
        }

        return tilesToRemove;
    }

    private getNeighbours(board: IBoard, x: number, y: number): ConcatArray<{ x: number; y: number; }> {
        let neighbours: { x: number, y: number }[] = [];

        if (x > 0) {
            neighbours.push({ x: x - 1, y: y });
        }
        if (x < board.xMax - 1) {
            neighbours.push({ x: x + 1, y: y });
        }
        if (y > 0) {
            neighbours.push({ x: x, y: y - 1 });
        }
        if (y < board.yMax - 1) {
            neighbours.push({ x: x, y: y + 1 });
        }

        return neighbours;
    }
}