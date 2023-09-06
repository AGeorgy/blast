export class Booster {
    private _id: string;
    private _name: string;
    private _amount: number;
    private _actionId: string;

    constructor(id: string, name: string, amount: number, actionId: string) {
        this._id = id;
        this._name = name;
        this._amount = amount;
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

    get actionId(): string {
        return this._actionId;
    }

    resetAmount(): void {
        this._amount = 0;
    }
}