import { IAction } from "../Action/IAction";
import { IPerformAction } from "../Action/IPerformAction";
import { IInputMode } from "./IInputMode";

export class HoldActionClickInputMode implements IInputMode {
    private _clicks: { x: number, y: number }[];
    private _action: IAction;

    constructor(action: IAction) {
        this._clicks = [];
        this._action = action;
    }

    clickAt(x: number, y: number, performAction: IPerformAction): boolean {
        this._clicks.push({ x, y });
        console.log("HoldActionClickInputMode clickAt", x, y, this._clicks);
        performAction.performActionOnCellAt(this._clicks, this._action);
        return true;
    }
}