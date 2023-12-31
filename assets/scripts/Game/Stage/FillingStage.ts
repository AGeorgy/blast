import { IFillBoard } from "../Board/IFillBoard";
import { IStage } from "./IStage";

export class FillingStage implements IStage {
    private readonly _boardFill: IFillBoard;
    private _isStarted: boolean = false;
    private _isDone: boolean = false;

    constructor(boardFill: IFillBoard) {
        this._boardFill = boardFill;
    }

    get isStarted(): boolean {
        return this._isStarted;
    }

    get isDone(): boolean {
        return this._isDone;
    }

    reset(): void {
        this._isStarted = false;
        this._isDone = false;
    }

    execute(): void {
        console.log("FillingStage execute");
        this._isStarted = true;
        this._boardFill.fill();
        this._isDone = true;
    }
}