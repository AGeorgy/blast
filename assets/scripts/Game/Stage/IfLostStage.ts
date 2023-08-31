import { ICheckLost } from "../Board/ICheckLost";
import { IEndGameSequence } from "./IEndGameSequence";
import { IStage } from "./IStage";

export class IfLostStage implements IStage {
    private _endGameChecker: ICheckLost;
    private _endGameSequence: IEndGameSequence;

    constructor(endGameChecker: ICheckLost, endGameSequence: IEndGameSequence) {
        this._endGameChecker = endGameChecker;
        this._endGameSequence = endGameSequence;
    }

    isStarted: boolean;
    isDone: boolean;

    reset(): void {
        this.isStarted = false;
        this.isDone = false;
    }

    execute(): void {
        console.log("IfLostStage execute");
        this.isStarted = true;
        if (this._endGameChecker.ifLost) {
            this._endGameSequence.endSequance();
        }
        this.isDone = true;
    }
}