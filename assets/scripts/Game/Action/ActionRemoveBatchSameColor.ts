import { Color } from "cc";
import { IBoard } from "../Board/IBoard";
import { IAction } from "./IAction";
import { IActionResult } from "./IActionResult";
import { ActionResult } from "./ActionResult";

export class ActionRemoveBatchSameColor implements IAction {
    private readonly _minCellsInBath: number;

    constructor(minCellsInBath: number) {
        this._minCellsInBath = minCellsInBath;
    }

    canExecute(board: IBoard, x: number, y: number): boolean {
        console.log("ActionRemoveBatchSameColor canExecute");
        const tile = board.getTile(x, y);
        if (!tile) {
            return false;
        }
        const color = tile.color;
        const tilesToRemove = this.getTilesInRadiusWithColor(board, x, y, color);
        if (tilesToRemove.size >= this._minCellsInBath) {
            return true;
        }
        return false;
    }

    execute(board: IBoard, positions: { x: number, y: number }[]): IActionResult {
        console.log("ActionRemoveBatchSameColor execute");
        return this.removeTilesInRadiusWithColor(board, positions);
    }

    private removeTilesInRadiusWithColor(board: IBoard, positions: { x: number, y: number }[]): IActionResult {
        let tilesToRemoveArray: { x: number, y: number }[] = [];

        for (let index = 0; index < positions.length; index++) {
            const position = positions[index];
            const color = board.getTile(position.x, position.y).color;
            const tilesToRemove = this.getTilesInRadiusWithColor(board, position.x, position.y, color);

            if (tilesToRemove.size >= this._minCellsInBath) {
                tilesToRemoveArray = tilesToRemoveArray.concat(Array.from(tilesToRemove));
                continue;
            }
        }
        board.removeTiles(tilesToRemoveArray);

        return new ActionResult(tilesToRemoveArray);
    }

    private getTilesInRadiusWithColor(board: IBoard, x: number, y: number, color: Color): Set<{ x: number, y: number }> {
        const tilesToRemove = new Set<{ x: number, y: number }>;
        const tilesToCheck = [{ x: x, y: y }];
        const visited = new Set<string>();

        while (tilesToCheck.length > 0) {
            const tileToCheck = tilesToCheck.shift();
            const key = `${tileToCheck.x},${tileToCheck.y}`;

            if (!visited.has(key)) {
                const tile = board.getTile(tileToCheck.x, tileToCheck.y)
                if (tile && tile.color.equals(color)) {
                    visited.add(key);
                    tilesToRemove.add(tileToCheck);
                    tilesToCheck.push(...this.getNeighbours(board, tileToCheck.x, tileToCheck.y));
                }
            }
        }

        return tilesToRemove;
    }

    private getNeighbours(board: IBoard, x: number, y: number): { x: number, y: number }[] {
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