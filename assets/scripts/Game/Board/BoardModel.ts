import { ICheckWin } from "./ICheckWin";

export class BoardModel implements ICheckWin {
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

    actionExecuted(removedTiles: number): void {
        this._currentTurns++;
        this._currentScore += removedTiles * 2;
    }

    shuffleExecuted(): void {
        this._currentShuffleCount++;
    }

    checkWin() {
        return this._currentScore >= this._targetScore
            && this._currentTurns < this._maxTurns
            && this.canShuffle;
    }
}