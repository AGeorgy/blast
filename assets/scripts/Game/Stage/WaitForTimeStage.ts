import { IStage } from "./IStage";

export class WaitStage implements IStage {
    private _time: number;

    constructor(time: number) {
        this._time = time;
    }

    isStarted: boolean;
    isDone: boolean;

    reset(): void {
        this.isStarted = false;
        this.isDone = false;
    }

    execute(): void {
        console.log("WaitStage execute");
        this.isStarted = true;
        setTimeout(() => {
            this.isDone = true;
        }, this._time * 1000);
    }
}