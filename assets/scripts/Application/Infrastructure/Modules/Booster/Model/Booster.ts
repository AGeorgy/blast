export class Booster {
    private _id: string;
    private _name: string;
    private _amount: number;
    private _inputModeId: string;

    constructor(id: string, name: string, amount: number, inputModeId: string) {
        this._id = id;
        this._name = name;
        this._amount = amount;
        this._inputModeId = inputModeId;
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

    resetAmount(): void {
        this._amount = 0;
    }
}