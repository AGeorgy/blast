import { IAllowAction } from "../Board/IAllowAction";
import { IStage } from "./IStage";

export class AllowActionStage implements IStage {
    private _boardActionAllower: IAllowAction;
    private _isAllow: boolean;

    constructor(isAllow: boolean, boardActionAllower: IAllowAction) {
        this._isAllow = isAllow;
        this._boardActionAllower = boardActionAllower;
    }

    isStarted: boolean;
    isDone: boolean;

    reset(): void {
        this.isStarted = false;
        this.isDone = false;
    }

    execute(): void {
        this.isStarted = true;
        console.log("AllowActionStage execute");
        this._boardActionAllower.allowAction(this._isAllow);
        this.isDone = true;
    }
}