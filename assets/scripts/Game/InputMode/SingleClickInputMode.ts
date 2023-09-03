import { IPerformAction } from "../Action/IPerformAction";
import { IInputMode } from "./IInputMode";
import { ISetInputMode } from "./ISetInputMode";

export class SingleClickInputMode implements IInputMode {
    private _clicks: { x: number, y: number }[];

    constructor() {
        this._clicks = [];
    }

    clickAt(x: number, y: number, setMode: ISetInputMode, performAction: IPerformAction): void {
        this._clicks.push({ x, y });
        console.log("SingleClickInputMode clickAt", x, y, this._clicks);
        setMode.setMode(new SingleClickInputMode());
        performAction.performActionOnCellAt(this._clicks);
    }
}