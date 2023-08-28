import { IColorPalette } from "../Color/IColorPalette";
import { IBoard } from "./IBoard";
import { IShuffle } from "./IShuffle";
import { ITile } from "./ITile";
import { Tile } from "./Tile";

export class Board implements IBoard, IShuffle {
    private _tiles: ITile[];
    private _xMax: number;
    private _yMax: number;
    private _colorPalette: IColorPalette;

    constructor(xMax: number, yMax: number, colorPalette: IColorPalette) {
        this._xMax = xMax;
        this._yMax = yMax;
        this._colorPalette = colorPalette;
        this._tiles = new Array(xMax * yMax);
    }

    get xMax(): number {
        return this._xMax;
    }

    get yMax(): number {
        return this._yMax;
    }

    getTile(x: number, y: number): ITile {
        return this._tiles[x + y * this._xMax];
    }

    removeTile(x: number, y: number): void {
        console.log("Board removeTile: " + x + ", " + y);
        this._tiles[x + y * this._xMax] = null;
    }

    fill(): void {
        console.log("Board fill");
        for (let y = 0; y < this._yMax; y++) {
            for (let x = 0; x < this._xMax; x++) {
                if (!this._tiles[x + y * this._xMax]) {
                    this._tiles[x + y * this._xMax] = new Tile(x, y, this._colorPalette.getRandomColor());
                }
            }
        }
    }

    shuffle(): void {
        console.log("Board shuffle");
        let currentIndex = this._tiles.length;
        let randomIndex: number;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this._tiles[currentIndex], this._tiles[randomIndex]] = [
                this._tiles[randomIndex], this._tiles[currentIndex]];
        }
    };
}