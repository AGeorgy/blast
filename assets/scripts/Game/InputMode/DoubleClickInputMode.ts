import { IPerformAction } from "../Action/IPerformAction";
import { IInputMode } from "./IInputMode";
import { ISetMode } from "./ISetMode";
import { SingleClickInputMode } from "./SingleClickInputMode";

export class DoubleClickInputMode implements IInputMode {
    private _clicks: { x: number, y: number }[];

    constructor() {
        this._clicks = [];
    }

    clickAt(x: number, y: number, setMode: ISetMode, performAction: IPerformAction): void {
        this._clicks.push({ x, y });
        console.log("DoubleClickInputMode clickAt", x, y, this._clicks, this.isReady);
        if (this.isReady) {
            setMode.setMode(new SingleClickInputMode());
            performAction.performActionOnCellAt(this._clicks);
        }
    }

    private isReady(): boolean {
        return this._clicks.length >= 2;
    }
}