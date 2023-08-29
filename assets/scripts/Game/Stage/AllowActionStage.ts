import { IAllowAction } from "../Board/IAllowAction";
import { IStage } from "./IStage";

export class AllowActionStage implements IStage {
    private _boardActionAllower: IAllowAction;
    private _doneCallback: () => void;
    private _isAllow: boolean;

    constructor(isAllow: boolean, boardActionAllower: IAllowAction) {
        this._isAllow = isAllow;
        this._boardActionAllower = boardActionAllower;
    }

    setDoneCallback(callback: () => void): void {
        this._doneCallback = callback;
    }

    execute(): void {
        console.log("AllowActionStage execute");
        this._boardActionAllower.allowAction(this._isAllow);
        this._doneCallback();
    }
}