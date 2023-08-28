import { IColorPalette } from "../Color/IColorPalette";
import { IBoard } from "./IBoard";
import { IShuffle } from "./IShuffle";
import { ITile } from "./ITile";
import { Tile } from "./Tile";
import { IBoardDataAndAddNotifier } from "./IBoardDataAndAddNotifier";
import { IObserver } from "./IObserver";
import { IReadTile } from "./IReadTile";
import { TilesChange } from "./IBoardLastChanged";

export class Board implements IBoard, IBoardDataAndAddNotifier, IShuffle {
    private _lastChangedTiles: { change: TilesChange, tile: IReadTile }[] = [];
    private _tiles: ITile[];
    private _xMax: number;
    private _yMax: number;
    private _colorPalette: IColorPalette;
    private _observers: IObserver[];

    constructor(xMax: number, yMax: number, colorPalette: IColorPalette) {
        this._xMax = xMax;
        this._yMax = yMax;
        this._colorPalette = colorPalette;
        this._tiles = new Array(xMax * yMax);
        this._observers = [];
    }

    get xMax(): number {
        return this._xMax;
    }

    get yMax(): number {
        return this._yMax;
    }

    get lastChangedTiles(): { change: TilesChange, tile: IReadTile }[] {
        return this._lastChangedTiles;
    }

    addObserver(observer: IObserver): void {
        this._observers.push(observer);
    }

    getTile(x: number, y: number): ITile {
        return this._tiles[x + y * this._xMax];
    }

    removeTile(x: number, y: number): void {
        console.log("Board removeTile: " + x + ", " + y);
        let index = this.codePositionToIndex(x, y);
        this._lastChangedTiles.push({ change: TilesChange.Removed, tile: this._tiles[index] });
        this._tiles[index] = null;
        this.notifyObservers();
    }

    fill(): void {
        console.log("Board fill");
        for (let y = 0; y < this._yMax; y++) {
            for (let x = 0; x < this._xMax; x++) {
                let index = this.codePositionToIndex(x, y);
                if (!this._tiles[index]) {
                    this._tiles[index] = new Tile(x, y, this._colorPalette.getRandomColor());
                }
            }
        }

        this._tiles.forEach(tile => {
            this._lastChangedTiles.push({ change: TilesChange.Moved, tile: tile });
        });

        this.notifyObservers();
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

            this._tiles[currentIndex].setPosition(this.decodeIndexToPosition(currentIndex));
            this._tiles[randomIndex].setPosition(this.decodeIndexToPosition(randomIndex));
        }

        this.notifyObservers();
    };

    private notifyObservers(): void {
        this._observers.forEach(observer => {
            observer.notified();
        });

        this._lastChangedTiles = [];
    }

    codePositionToIndex(x: number, y: number): number {
        return x + y * this._xMax;
    }

    decodeIndexToPosition(index: number): { x: number, y: number } {
        return { x: index % this._xMax, y: Math.floor(index / this._xMax) };
    }
}