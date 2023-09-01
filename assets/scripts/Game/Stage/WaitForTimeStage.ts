import { IStage } from "./IStage";

export class WaitForTimeStage implements IStage {
    private readonly _time: number;

    private _isStarted: boolean;
    private _isDone: boolean;

    constructor(time: number) {
        this._time = time;
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
        console.log("WaitForTimeStage execute");
        this._isStarted = true;
        setTimeout(() => {
            this._isDone = true;
        }, this._time * 1000);
    }
}