import { IAction } from "../Action/IAction";
import { IPerformAction } from "../Action/IPerformAction";
import { IInputMode } from "./IInputMode";

export class DoubleClickInputMode implements IInputMode {
    private _clicks: { x: number, y: number }[];
    private _action: IAction;

    constructor(action: IAction) {
        this._clicks = [];
        this._action = action;
    }

    clickAt(x: number, y: number, performAction: IPerformAction): boolean {
        this._clicks.push({ x, y });
        console.log("DoubleClickInputMode clickAt", x, y, this._clicks, this.isReady());
        if (this.isReady()) {
            performAction.performActionOnCellAt(this._clicks, this._action);
            return true;
        }
        return false;
    }

    private isReady(): boolean {
        return this._clicks.length >= 2;
    }
}