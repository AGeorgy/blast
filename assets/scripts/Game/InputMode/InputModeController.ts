import { IPerformAction } from "../Action/IPerformAction";
import { IInputMode } from "./IInputMode";
import { IResetMode } from "./IResetMode";
import { ISetInputMode } from "./ISetInputMode";
import { ITileClick } from "./ITileClick";

export class InputModeController implements ITileClick, ISetInputMode, IResetMode {
    private _mode: IInputMode;
    private _performAction: IPerformAction;

    constructor(performAction: IPerformAction) {
        this._performAction = performAction;
    }

    resetMode(): void {
        this._mode = null;
    }

    setMode(mode: IInputMode): void {
        if (!this._mode) {
            console.log("InputModeController setMode", mode);
            this._mode = mode;
        }
        else if (mode.rank >= this._mode.rank) {
            console.log("InputModeController setMode", mode);
            this._mode = mode;
        }
    }

    tileClick(x: number, y: number): void {
        console.log("InputModeController tileClick", x, y);
        if (this._mode) {
            this._mode.clickAt(x, y, this, this._performAction);
        }
        else {
            console.error("InputModeController tileClick no mode", this._mode);
        }
    }
}