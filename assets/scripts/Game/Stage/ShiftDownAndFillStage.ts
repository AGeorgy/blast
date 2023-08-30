
import { IFillBoard } from "../Board/IFillBoard";
import { IShiftDownBoard } from "../Board/IShiftDownBoard";
import { IStage } from "./IStage";

export class ShiftDownAndFillStage implements IStage {
    private readonly _boardFill: IFillBoard;
    private _isStarted: boolean = false;
    private _isDone: boolean = false;
    private _boardShiftDown: IShiftDownBoard;

    constructor(boardShiftDown: IShiftDownBoard, boardFill: IFillBoard) {
        this._boardShiftDown = boardShiftDown;
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
        console.log("ShiftDownAndFillStage execute");
        this._isStarted = true;
        this._boardShiftDown.shiftDown();
        this._boardFill.fill();
        this._isDone = true;
    }
}