import { ICanShuffle } from "./ICanShuffle";
import { ICheckWin } from "./ICheckWin";
import { IIncreaseShuffle } from "./IIncreaseShuffle";

export class BoardStats implements ICheckWin, ICanShuffle, IIncreaseShuffle {
    private _maxTurns: number;
    private _currentTurns: number;

    private _targetScore: number;
    private _currentScore: number;

    private _maxShuffleCount: number;
    private _currentShuffleCount: number;

    constructor(maxTurns: number, targetScore: number, maxShuffleCount: number) {
        this._maxTurns = maxTurns;
        this._targetScore = targetScore;
        this._currentTurns = 0;
        this._currentScore = 0;
        this._maxShuffleCount = maxShuffleCount;
        this._currentShuffleCount = 0;
    }

    reset() {
        this._currentTurns = 0;
        this._currentScore = 0;
        this._currentShuffleCount = 0;
    }

    get canShuffle(): boolean {
        return this._currentShuffleCount < this._maxShuffleCount;
    }

    increaseTurn(): void {
        this._currentTurns++;
    }

    increaseScore(removedTiles: number): void {
        this._currentScore += removedTiles * 2;
    }

    increaseShuffle(): void {
        this._currentShuffleCount++;
    }

    get ifWin() {
        return this._currentScore >= this._targetScore
            && this._currentTurns < this._maxTurns;
    }
}