import { IColorPalette } from "../Color/IColorPalette";
import { IBoard } from "./IBoard";
import { IShuffle } from "./IShuffle";
import { ITile } from "./ITile";
import { Tile } from "./Tile";
import { IBoardDataAndAddNotifier } from "./IBoardDataAndAddNotifier";
import { IObserver } from "./IObserver";
import { IReadTile } from "./IReadTile";
import { TilesChange } from "./IBoardLastChanged";
import { IFillBoard } from "./IFillBoard";
import { IShiftDownBoard } from "./IShiftDownBoard";

export class Board implements IBoard, IBoardDataAndAddNotifier, IShuffle, IShiftDownBoard, IFillBoard {
    private readonly _tiles: ITile[];
    private readonly _xMax: number;
    private readonly _yMax: number;
    private readonly _colorPalette: IColorPalette;
    private readonly _observers: IObserver[];
    private _lastChangedTiles: { change: TilesChange, tiles: IReadTile[] } = null;

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

    get lastChangedTiles(): { change: TilesChange, tiles: IReadTile[] } {
        return this._lastChangedTiles;
    }

    addObserver(observer: IObserver): void {
        this._observers.push(observer);
        this._lastChangedTiles = this.prepareAllTilesForNotify(TilesChange.Added);
        observer.notified();
    }

    getTile(x: number, y: number): ITile {
        return this._tiles[x + y * this._xMax];
    }

    removeTiles(tilesToRemove: { x: number, y: number }[]): void {
        console.log("Board removeTile");
        const tiles: IReadTile[] = tilesToRemove.map(({ x, y }) => {
            const index = this.codePositionToIndex(x, y);
            const tile = this._tiles[index];
            this._tiles[index] = null;
            return tile;
        });

        this._lastChangedTiles = { change: TilesChange.Removed, tiles: tiles };
        this.notifyObservers();
    }

    fill(): void {
        console.log("Board fill");
        const tiles: IReadTile[] = [];
        for (let y = 0; y < this._yMax; y++) {
            for (let x = 0; x < this._xMax; x++) {
                const index = this.codePositionToIndex(x, y);
                if (!this._tiles[index]) {
                    const tile = new Tile(x, y, this._colorPalette.getRandomColor());
                    this._tiles[index] = tile;
                    tiles.push(tile);
                }
            }
        }

        this._lastChangedTiles = { change: TilesChange.Added, tiles: tiles };
        this.notifyObservers();
    }

    shiftDown(): void {
        console.log("Board shiftDown");
        const movedTiles = new Map<number, ITile>();
        for (let x = 0; x < this._xMax; x++) {
            let shiftsInRow = 0;
            for (let y = 0; y < this._yMax; y++) {
                const index = this.codePositionToIndex(x, y);
                while (this._tiles[index] === null && shiftsInRow + y < this._yMax) {
                    this.shiftRowDown(x, y, movedTiles);
                    shiftsInRow++;
                }
            }
        }

        this._lastChangedTiles = { change: TilesChange.Moved, tiles: Array.from(movedTiles.values()) };
        this.notifyObservers();
    }

    shiftRowDown(xPos: number, yPos: number, movedTiles: Map<number, ITile>): void {
        for (let y = yPos; y < this._yMax - 1; y++) {
            const index = this.codePositionToIndex(xPos, y);

            const upIndex = this.codePositionToIndex(xPos, y + 1);
            const upTile = this._tiles[upIndex];
            const currentTile = this._tiles[index];
            this._tiles[upIndex] = currentTile;
            this._tiles[index] = upTile;
            if (upTile) {
                movedTiles.set(upTile.id, upTile);
                upTile.setPosition({ x: xPos, y: y });
            }
        }
    }

    shuffle(): void {
        console.log("Board shuffle");
        let currentIndex = this._tiles.length;

        while (currentIndex != 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this._tiles[currentIndex], this._tiles[randomIndex]] =
                [this._tiles[randomIndex], this._tiles[currentIndex]];

            this._tiles[currentIndex]?.setPosition(this.decodeIndexToPosition(currentIndex));
            this._tiles[randomIndex]?.setPosition(this.decodeIndexToPosition(randomIndex));
        }

        this._lastChangedTiles = this.prepareAllTilesForNotify(TilesChange.Moved);
        this.notifyObservers();
    };

    private notifyObservers(): void {
        this._observers.map(observer => observer.notified());
    }

    private codePositionToIndex(x: number, y: number): number {
        return x + y * this._xMax;
    }

    private decodeIndexToPosition(index: number): { x: number, y: number } {
        return { x: index % this._xMax, y: Math.floor(index / this._xMax) };
    }

    private prepareAllTilesForNotify(change: TilesChange): { change: TilesChange, tiles: IReadTile[] } {
        const tiles = this._tiles.map(tile => tile);
        return { change: change, tiles: tiles };
    }
}