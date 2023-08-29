import { ICheckWin } from "../Board/ICheckWin";
import { IEndGameSequence } from "./IEndGameSequence";
import { IStage } from "./IStage";

export class IfWinStage implements IStage {
    private _winChecker: ICheckWin;
    private _endGameSequence: IEndGameSequence;

    constructor(winChecker: ICheckWin, endGameSequence: IEndGameSequence) {
        this._winChecker = winChecker;
        this._endGameSequence = endGameSequence;
    }

    isStarted: boolean;
    isDone: boolean;

    reset(): void {
        this.isStarted = false;
        this.isDone = false;
    }

    execute(): void {
        console.log("IfWinStage execute");
        this.isStarted = true;
        if (this._winChecker.ifWin) {
            this._endGameSequence.endSequance();
        }
        this.isDone = true;
    }
}