import { IActionResult } from "./IActionResult";

export class ActionResult implements IActionResult {
    private readonly _executedCells: { x: number, y: number }[];
    private readonly _isExecuted: boolean;

    constructor(executedCells: { x: number, y: number }[] = []) {
        this._executedCells = executedCells;
        this._isExecuted = executedCells.length > 0;
    }

    public get executedCells(): { x: number, y: number }[] {
        return this._executedCells;
    }

    public get isExecuted(): boolean {
        return this._isExecuted;
    }
}