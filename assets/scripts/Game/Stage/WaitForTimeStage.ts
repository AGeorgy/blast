import { IStage } from "./IStage";

export class WaitStage implements IStage {
    private _doneCallback: () => void;
    private _time: number;

    constructor(time: number) {
        this._time = time;
    }

    setDoneCallback(callback: () => void): void {
        this._doneCallback = callback;
    }

    execute(): void {
        setTimeout(() => {
            this._doneCallback();
        }, this._time * 1000);
    }
}