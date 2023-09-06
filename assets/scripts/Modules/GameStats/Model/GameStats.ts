export class GameStats {
    private readonly _maxTurns: number;
    private _currentTurns: number;

    private readonly _targetScore: number;
    private _currentScore: number;

    private readonly _maxShuffleCount: number;
    private _currentShuffleCount: number;

    constructor(maxTurns: number, targetScore: number, maxShuffleCount: number) {
        this._maxTurns = maxTurns;
        this._currentTurns = 0;

        this._targetScore = targetScore;
        this._currentScore = 0;

        this._maxShuffleCount = maxShuffleCount;
        this._currentShuffleCount = 0;
    }

    get maxTurns(): number {
        return this._maxTurns;
    }

    get currentTurns(): number {
        return this._currentTurns;
    }

    get targetScore(): number {
        return this._targetScore;
    }

    get currentScore(): number {
        return this._currentScore;
    }

    get maxShuffleCount(): number {
        return this._maxShuffleCount;
    }

    get currentShuffleCount(): number {
        return this._currentShuffleCount;
    }

    incrementTurns(quantity: number): void {
        this._currentTurns += quantity;
    }

    incrementScore(quantity: number): void {
        this._currentScore += quantity;
    }

    incrementShuffleCount(): void {
        this._currentShuffleCount++;
    }

}