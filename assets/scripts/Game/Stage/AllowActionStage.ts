import { IAllowAction } from "../Board/IAllowAction";
import { IStage } from "./IStage";

export class AllowActionStage implements IStage {
    private readonly _boardActionAllower: IAllowAction;
    private readonly _isAllow: boolean;
    private _isStarted: boolean = false;
    private _isDone: boolean = false;

    constructor(isAllow: boolean, boardActionAllower: IAllowAction) {
        this._isAllow = isAllow;
        this._boardActionAllower = boardActionAllower;
    }

    get isStarted(): boolean {
        return this._isStarted;
    }

    get isDone(): boolean {
        return this._isDone;
    }

    reset(): void {
        this._isStarted = false;
        this._isDone = false;
    }

    execute(): void {
        this._isStarted = true;
        console.log("AllowActionStage execute");
        this._boardActionAllower.allowAction(this._isAllow);
        this._isDone = true;
    }
}