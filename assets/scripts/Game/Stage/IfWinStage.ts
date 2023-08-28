import { ICheckWin } from "../Board/ICheckWin";
import { IEndGameSequence } from "./IEndGameSequence";
import { IStage } from "./IStage";

export class IfWinStage implements IStage {
    private _doneCallback: () => void;
    private _winChecker: ICheckWin;
    private _endGameSequence: IEndGameSequence;

    constructor(winChecker: ICheckWin, endGameSequence: IEndGameSequence) {
        this._winChecker = winChecker;
        this._endGameSequence = endGameSequence;
    }

    setDoneCallback(callback: () => void): void {
        this._doneCallback = callback;
    }

    execute(): void {
        if (this._winChecker.ifWin) {
            this._endGameSequence.endSequance();
        }
        this._doneCallback();
    }
}