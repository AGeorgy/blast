import { IAction } from "../Action/IAction";
import { IPerformAction } from "../Action/IPerformAction";
import { IInputMode } from "./IInputMode";
import { ISetInputMode } from "./ISetInputMode";
import { ITileClick } from "./ITileClick";

export class InputModeController implements ITileClick, ISetInputMode {
    private _mode: IInputMode;
    private _performAction: IPerformAction;
    private _isModeFinished: boolean;

    constructor(performAction: IPerformAction) {
        this._performAction = performAction;
        this._isModeFinished = true;
    }

    setMode(mode: IInputMode): void {
        if (this._isModeFinished) {
            this._isModeFinished = false;
            console.log("InputModeController setMode", mode);
            this._mode = mode;
        }
    }

    tileClick(x: number, y: number): void {
        console.log("InputModeController tileClick", x, y);
        if (this._mode) {
            this._isModeFinished = this._mode.clickAt(x, y, this._performAction);
        }
        else {
            console.error("InputModeController tileClick no mode", this._mode);
        }
    }
}