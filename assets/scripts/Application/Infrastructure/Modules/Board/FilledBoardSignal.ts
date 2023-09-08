export class FilledBoardSignal {
    private _filledSlotIds: string[];

    constructor(filledSlotIds: string[]) {
        this._filledSlotIds = filledSlotIds;
    }

    get slots(): string[] {
        return this._filledSlotIds;
    }
}