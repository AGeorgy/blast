export class Board {
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

    setBoardSize(x: number, y: number): void {
        this._xMax = x;
        this._yMax = y;
    }
}