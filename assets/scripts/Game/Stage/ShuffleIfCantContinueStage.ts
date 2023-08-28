import { ICanDoDefaultAction } from "../Board/ICanDoDefaultAction";
import { ICanShuffle } from "../Board/ICanShuffle";
import { IIncreaseShuffle } from "../Board/IIncreaseShuffle";
import { IShuffle } from "../Board/IShuffle";
import { IEndGameSequence } from "./IEndGameSequence";
import { IStage } from "./IStage";


export class ShuffleIfCantContinueStage implements IStage {
    private _doneCallback: () => void;
    private _canShuffle: ICanShuffle;
    private _canContinue: ICanDoDefaultAction;
    private _time: number;
    private _shuffle: IShuffle;
    private _endGameSequence: IEndGameSequence;
    private _increaseShuffle: IIncreaseShuffle;

    constructor(time: number, canShuffle: ICanShuffle, increaseShuffle: IIncreaseShuffle, shuffle: IShuffle,
        canContinue: ICanDoDefaultAction, endGameSequence: IEndGameSequence) {
        this._time = time;
        this._canContinue = canContinue;
        this._shuffle = shuffle;
        this._canShuffle = canShuffle;
        this._increaseShuffle = increaseShuffle;
        this._endGameSequence = endGameSequence;
    }

    setDoneCallback(callback: () => void): void {
        this._doneCallback = callback;
    }

    execute(): void {
        if (!this._canContinue.canDoDefaultAction) {
            if (this._canShuffle.canShuffle) {
                this._shuffle.shuffle();
                this._increaseShuffle.increaseShuffle();
                setTimeout(() => {
                    this.execute();
                }, this._time * 1000);
            }
            else {
                this._endGameSequence.endSequance();
            }
        }

        this._doneCallback();
    }
}