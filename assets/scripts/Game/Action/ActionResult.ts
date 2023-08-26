import { IActionResult } from "./IActionResult";

export class ActionResult implements IActionResult {
    public executedCells: { x: number, y: number }[];
    public isExecuted: boolean;

    constructor(executedCells?: { x: number, y: number }[]) {
        this.executedCells = executedCells;
        if (executedCells && executedCells.length > 0) {
            this.isExecuted = true;
        }
        else {
            this.isExecuted = false;
        }
    }
}