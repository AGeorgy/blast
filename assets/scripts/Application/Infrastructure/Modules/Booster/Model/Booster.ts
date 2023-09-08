export class Booster {
    private _id: string;
    private _name: string;
    private _amount: number;
    private _inputModeId: string;
    private _actionId: string;

    constructor(id: string, name: string, amount: number, inputModeId: string, actionId: string) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._inputModeId = inputModeId;
        this._actionId = actionId;
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

    get inputModeId(): string {
        return this._inputModeId;
    }

    get actionId(): string {
        return this._actionId;
    }

    resetAmount(): void {
        this._amount = 0;
    }
}