export class Board {
    private _id: string;
    private _xMax: number;
    private _yMax: number;

    constructor(id: string) {
        this._id = id;
        this._xMax = 0;
        this._yMax = 0;
    }

    get id(): string {
        return this._id;
    }

    get xMax(): number {
        return this._xMax;
    }

    get yMax(): number {
        return this._yMax;
    }

    setBoardSize(x: number, y: number): void {
        this._xMax = x;
        this._yMax = y;
    }
}