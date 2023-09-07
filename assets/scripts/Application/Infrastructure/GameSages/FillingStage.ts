import { IBoardService } from "../Modules/Board/IBoardService";
import { IStage } from "../Modules/GameStage/Model/IStage";


export class FillingStage implements IStage {
    private readonly _boardService: IBoardService;
    private _isStarted: boolean = false;
    private _isDone: boolean = false;

    constructor(boardService: IBoardService) {
        this._boardService = boardService;
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
        this._boardService.fillBoard();
        this._isDone = true;
    }
}