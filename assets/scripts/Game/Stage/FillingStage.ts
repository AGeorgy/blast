import { IFillBoard } from "../Board/IFillBoard";
import { IStage } from "./IStage";

export class FillingStage implements IStage {
    private _boardReseter: IFillBoard;

    constructor(boardReseter: IFillBoard) {
        this._boardReseter = boardReseter;
    }

    isStarted: boolean;
    isDone: boolean;

    reset(): void {
        this.isStarted = false;
        this.isDone = false;
    }

    execute(): void {
        console.log("FillingStage execute");
        this.isStarted = true;
        this._boardReseter.fillBoard();
        this.isDone = true;
    }
}