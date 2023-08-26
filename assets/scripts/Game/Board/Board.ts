import { Color } from "cc";
import { IColorPalette } from "../Color/IColorPalette";
import { IBoard } from "./IBoard";
import { ICell } from "./ICell";
import { Cell } from "./Cell";

export class Board implements IBoard {
    private _cels: ICell[];
    private _xMax: number;
    private _yMax: number;
    private _colorPalette: IColorPalette;

    constructor(xMax: number, yMax: number, colorPalette: IColorPalette) {
        this._xMax = xMax;
        this._yMax = yMax;
        this._colorPalette = colorPalette;
        this._cels = new Array(xMax * yMax);
    }

    reset(): void {
        for (let y = 0; y < this._yMax; y++) {
            for (let x = 0; x < this._xMax; x++) {
                this._cels[x + y * this._xMax] = new Cell(x, y, this._colorPalette.getRandomColor());
            }
        }
    }
}