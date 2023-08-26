import { IBoard } from "../Board/IBoard";
import { IAction } from "./IAction";

export class DefaultAction implements IAction {
    private _minCellsCount: number;

    constructor(minCellsCount: number) {
        this._minCellsCount = minCellsCount;
    }

    performeAction(board: IBoard): void {
        throw new Error("Method not implemented.");
    }
}