export class SlotsRemovedSignal {
    private _slotIds: string[];

    constructor(slotIds: string[]) {
        this._slotIds = slotIds;
    }

    get slotIds(): string[] {
        return this._slotIds;
    }
}