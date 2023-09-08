import { IActionEffect } from "./IActionEffect";

export class Action {
    private _id: string;
    private _costTurn: number;
    private _scoreReward: number;
    private _effect: IActionEffect;
    private _appliesLeft: number;

    constructor(id: string, applyLimit: number, costTurn: number, scoreReward: number, effect: IActionEffect) {
        this._id = id;
        this._appliesLeft = applyLimit;
        this._costTurn = costTurn;
        this._scoreReward = scoreReward;
        this._effect = effect;
    }

    get id(): string {
        return this._id;
    }

    get costTurn(): number {
        return this._costTurn;
    }

    get scoreReward(): number {
        return this._scoreReward;
    }

    get isEmpty(): boolean {
        return this._appliesLeft <= 0;
    }

    applyAction(tileIds: string[]): void {
        if (this._appliesLeft <= 0) {
            return;
        }

        this._appliesLeft--;
        this._effect.applyEffect(tileIds);
    }
}