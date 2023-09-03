import { EndGameState, IEndGame } from "../Board/IEndGame";
import { IEndGameSequence } from "./IEndGameSequence";
import { IStage } from "./IStage";

export class IfWinStage implements IStage {
    private _endGameChecker: IEndGame;
    private _endGameSequence: IEndGameSequence;

    constructor(endGameChecker: IEndGame, endGameSequence: IEndGameSequence) {
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
        console.log("IfWinStage execute");
        this.isStarted = true;
        if (this._endGameChecker.endGameState == EndGameState.Win) {
            this._endGameSequence.endSequance();
        }
        this.isDone = true;
    }
}