export class FilledBoardSignal {
    private _filledSlotIds: string[];

    constructor(filledSlotIds: string[]) {
        this._filledSlotIds = filledSlotIds;
    }

    get slots(): string[] {
        return this._filledSlotIds;
    }
}

export class BoardReadySignal {
    private _xMax: number;
    private _yMax: number;

    constructor(xMax: number, yMax: number) {
        this._xMax = xMax;
        this._yMax = yMax;
    }

    get xMax(): number {
        return this._xMax;
    }

    get yMax(): number {
        return this._yMax;
    }
}