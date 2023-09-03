import { IPerformAction } from "../Action/IPerformAction";
import { IInputMode } from "./IInputMode";
import { ISetMode } from "./ISetMode";

export class SingleClickInputMode implements IInputMode {
    private _clicks: { x: number, y: number }[];

    constructor() {
        this._clicks = [];
    }

    clickAt(x: number, y: number, setMode: ISetMode, performAction: IPerformAction): void {
        this._clicks.push({ x, y });
        console.log("SingleClickInputMode clickAt", x, y, this._clicks);
        setMode.setMode(new SingleClickInputMode());
        performAction.performActionOnCellAt(this._clicks);
    }
}