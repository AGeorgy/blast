import { ICanShuffle } from "./ICanShuffle";
import { ICheckWin } from "./ICheckWin";
import { IIncreaseShuffle } from "./IIncreaseShuffle";
import { IObserver } from "./IObserver";
import { IReadStatsAndAddObserver } from "./IReadStatsAndAddObserver";

export class BoardStats implements ICheckWin, ICanShuffle, IIncreaseShuffle, IReadStatsAndAddObserver {
    private _maxTurns: number;
    private _currentTurns: number;

    private _targetScore: number;
    private _currentScore: number;

    private _maxShuffleCount: number;
    private _currentShuffleCount: number;
    private _observers: IObserver[];

    constructor(maxTurns: number, targetScore: number, maxShuffleCount: number) {
        this._maxTurns = maxTurns;
        this._targetScore = targetScore;
        this._maxShuffleCount = maxShuffleCount;
        this.reset();
    }

    get maxTurns(): number { return this._maxTurns; }
    get currentTurns(): number { return this._currentTurns; }
    get targetScore(): number { return this._targetScore; }
    get currentScore(): number { return this._currentScore; }
    get maxShuffleCount(): number { return this._maxShuffleCount; }
    get currentShuffleCount(): number { return this._currentShuffleCount; }

    addObserver(observer: IObserver): void {
        this._observers.push(observer);
    }

    reset() {
        this._currentTurns = 0;
        this._currentScore = 0;
        this._currentShuffleCount = 0;
        this._observers = [];
    }

    get canShuffle(): boolean {
        return this._currentShuffleCount < this._maxShuffleCount;
    }

    increaseTurn(): void {
        console.log("BoardStats increaseTurn");
        this._currentTurns++;
        this.notifyObservers();
    }

    increaseScore(removedTiles: number): void {
        console.log("BoardStats increaseScore");
        this._currentScore += removedTiles * 2;
        this.notifyObservers();
    }

    increaseShuffle(): void {
        console.log("BoardStats increaseShuffle");
        this._currentShuffleCount++;
        this.notifyObservers();
    }

    get ifWin() {
        return this._currentScore >= this._targetScore
            && this._currentTurns < this._maxTurns;
    }

    private notifyObservers(): void {
        this._observers.forEach(observer => {
            observer.notified();
        });
    }
}