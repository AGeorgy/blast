import { IActionEffect } from "./IActionEffect";

export class Action {
    private _id: string;
    private _name: string;
    private _amount: number;
    private _costTurn: number;
    private _scoreReward: number;
    private _effect: IActionEffect;

    constructor(id: string, name: string, amount: number, cost: number, scoreReward: number, effect: IActionEffect) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._costTurn = cost;
        this._scoreReward = scoreReward;
        this._effect = effect;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get amount(): number {
        return this._amount;
    }

    get costTurn(): number {
        return this._costTurn;
    }

    get scoreReward(): number {
        return this._scoreReward;
    }

    applyAction(): void {
        this._effect.applyEffect();
        this._amount--;
    }
}