import { Color } from "cc";
import { IBoard } from "../Board/IBoard";
import { IAction } from "./IAction";

export class DefaultAction implements IAction {
    private _minCellsCount: number;

    constructor(minCellsCount: number) {
        this._minCellsCount = minCellsCount;
    }

    execute(board: IBoard, x: number, y: number): { x: number, y: number }[] {
        return this.removeTilesInRadiusWithColor(board, x, y);
    }

    private removeTilesInRadiusWithColor(board: IBoard, x: number, y: number): { x: number, y: number }[] {
        let color = board.getTile(x, y).color;
        let tilesToRemove: { x: number, y: number }[] = this.getTilesInRadiusWithColor(board, x, y, color);

        if (tilesToRemove.length >= this._minCellsCount) {
            tilesToRemove.forEach(tile => {
                board.removeTile(tile.x, tile.y);
            });
            return tilesToRemove;
        }

        return null;
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