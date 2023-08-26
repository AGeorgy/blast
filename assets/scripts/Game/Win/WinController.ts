import { IBoard } from "../Board/IBoard";
import { IWinController } from "./IWinController";

export class WinController implements IWinController {
    private _board: IBoard;
    private _maxTurns: number;
    private _targetScore: number;

    constructor(maxTurns: number, targetScore: number/* board: IBoard */) {
        // this._board = board;
        this._maxTurns = maxTurns;
        this._targetScore = targetScore;
    }

    checkWin() {
        return false; //this._board.isSolved();
    }
}