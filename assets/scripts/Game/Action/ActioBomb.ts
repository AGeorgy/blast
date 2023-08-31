import { IBoard } from "../Board/IBoard";
import { ActionResult } from "./ActionResult";
import { IAction } from "./IAction";
import { IActionResult } from "./IActionResult";

export class ActioBomb implements IAction {
    private readonly _radius: number;

    constructor(radius: number) {
        this._radius = radius;
    }

    execute(board: IBoard, x: number, y: number): IActionResult {
        console.log("ActioBomb execute", x, y);
        const tilesToRemove = this.getElementsInRadius(board, x, y, this._radius);
        board.removeTiles(tilesToRemove);
        return new ActionResult(tilesToRemove);
    }

    private getElementsInRadius(board: IBoard, xStart: number, yStart: number, size: number): { x: number, y: number }[] {
        let x = 0;
        let y = 0;
        let direction = 0; // 0=RIGHT, 1=DOWN, 2=LEFT, 3=UP
        let chainSize = 1;

        x = xStart;
        y = yStart;
        size = size + 1;
        const tilesToRemove: { x: number, y: number }[] = [];

        for (let k = 1; k <= size - 1; k++) {
            for (let j = 0; j < (k < size - 1 ? 2 : 3); j++) {
                for (let i = 0; i < chainSize; i++) {

                    if (x >= 0 && x < board.xMax && y >= 0 && y < board.yMax) {
                        tilesToRemove.push({ x: x, y: y });
                    }

                    switch (direction) {
                        case 0:
                            x++;
                            break;
                        case 1:
                            y--;
                            break;
                        case 2:
                            x--;
                            break;
                        case 3:
                            y++;
                            break;
                    }
                }
                direction = (direction + 1) % 4;
            }
            chainSize = chainSize + 1;
        }

        if (x >= 0 && x < board.xMax && y >= 0 && y < board.yMax) {
            tilesToRemove.push({ x: x, y: y });
        }

        return tilesToRemove;
    }
}