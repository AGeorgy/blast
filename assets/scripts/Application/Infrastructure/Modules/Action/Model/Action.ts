import { IActionEffect } from "./IActionEffect";

export class Action {
    private _id: string;
    private _costTurn: number;
    private _scoreReward: number;
    private _effect: IActionEffect;

    constructor(id: string, cost: number, scoreReward: number, effect: IActionEffect) {
        this._id = id;
        this._costTurn = cost;
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

    applyAction(tileIds: string[]): void {
        this._effect.applyEffect(tileIds);
    }
}