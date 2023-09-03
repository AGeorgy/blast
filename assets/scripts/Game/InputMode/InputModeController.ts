import { IPerformAction } from "../Action/IPerformAction";
import { IInputMode } from "./IInputMode";
import { ISetMode } from "./ISetMode";
import { ITileClick } from "./ITileClick";

export class InputModeController implements ITileClick, ISetMode {
    private _mode: IInputMode;
    private _performAction: IPerformAction;

    constructor(mode: IInputMode, performAction: IPerformAction) {
        this._mode = mode;
        this._performAction = performAction;
    }

    setMode(mode: IInputMode): void {
        this._mode = mode;
    }

    tileClick(x: number, y: number): void {
        console.log("InputModeController tileClick", x, y);
        this._mode.clickAt(x, y, this, this._performAction);
    }
}