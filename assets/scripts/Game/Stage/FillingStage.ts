import { IResetBoard } from "../Board/IResetBoard";
import { IStage } from "./IStage";

export class FillingStage implements IStage {
    private _boardReseter: IResetBoard;
    private _doneCallback: () => void;

    constructor(boardReseter: IResetBoard) {
        this._boardReseter = boardReseter;
    }

    setDoneCallback(callback: () => void): void {
        this._doneCallback = callback;
    }

    execute(): void {
        this._boardReseter.reset();
        this._doneCallback();
    }
}