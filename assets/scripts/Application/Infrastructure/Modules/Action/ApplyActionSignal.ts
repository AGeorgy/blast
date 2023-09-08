export class ApplyActionSignal {
    private _costTurn: number;
    private _scoreReward: number;

    constructor(costTurn: number, scoreReward: number) {
        this._costTurn = costTurn;
        this._scoreReward = scoreReward;
    }

    get costTurn(): number {
        return this._costTurn;
    }

    get scoreReward(): number {
        return this._scoreReward;
    }
}