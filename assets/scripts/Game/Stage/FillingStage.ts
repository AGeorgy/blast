import { IFillBoard } from "../Board/IFillBoard";
import { IStage } from "./IStage";

export class FillingStage implements IStage {
    private _boardReseter: IFillBoard;
    private _doneCallback: () => void;

    constructor(boardReseter: IFillBoard) {
        this._boardReseter = boardReseter;
    }

    setDoneCallback(callback: () => void): void {
        this._doneCallback = callback;
    }

    execute(): void {
        this._boardReseter.fillBoard();
        this._doneCallback();
    }
}