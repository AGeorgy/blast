import { IAction } from "../Action/IAction";
import { IPerformAction } from "../Action/IPerformAction";
import { IInputMode } from "./IInputMode";
import { IResetMode } from "./IResetMode";

export class TileClickInputMode implements IInputMode {
    private _clicks: { x: number, y: number }[];
    private _action: IAction;

    constructor(action: IAction) {
        this._clicks = [];
        this._action = action;
    }

    get rank(): number {
        return 1;
    }

    clickAt(x: number, y: number, resetMode: IResetMode, performAction: IPerformAction): void {
        this._clicks.push({ x, y });
        console.log("TileClickInputMode clickAt", x, y, this._clicks);
        resetMode.resetMode();
        performAction.performActionOnCellAt(this._clicks, this._action);
    }
}