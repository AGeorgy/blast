import { ICanDoDefaultAction } from "../Board/ICanDoDefaultAction";
import { ICanShuffleAndIncrease } from "../Board/ICanShuffleAndIncrease";
import { IShuffle } from "../Board/IShuffle";
import { IEndGameSequence } from "./IEndGameSequence";
import { IStage } from "./IStage";

export class ShuffleIfCantContinueStage implements IStage {
    private readonly _canContinue: ICanDoDefaultAction;
    private readonly _shuffle: IShuffle;
    private readonly _canShuffleAndIncrease: ICanShuffleAndIncrease;
    private readonly _endGameSequence: IEndGameSequence;
    private readonly _time: number;
    private _isStarted: boolean = false;
    private _isDone: boolean = false;


    constructor(time: number, canContinue: ICanDoDefaultAction, shuffle: IShuffle, canShuffleAndIncrease: ICanShuffleAndIncrease,
        endGameSequence: IEndGameSequence) {
        this._time = time;
        this._canContinue = canContinue;
        this._shuffle = shuffle;
        this._canShuffleAndIncrease = canShuffleAndIncrease;
        this._endGameSequence = endGameSequence;
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
        console.log("ShuffleIfCantContinueStage execute");
        this._isStarted = true;
        if (!this._canContinue.canDoDefaultAction) {
            if (this._canShuffleAndIncrease.canShuffle) {
                this._shuffle.shuffle();
                this._canShuffleAndIncrease.increaseShuffle();
                setTimeout(() => {
                    this.execute();
                }, this._time * 1000);
            }
            else {
                this._endGameSequence.endSequance();
                this._isDone = true;
            }
        }
        else {
            this._isDone = true;
        }
    }
}