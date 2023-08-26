import { DefaultAction } from "../Action/DefaultAction";
import { IAction } from "../Action/IAction";
import { IBoard } from "./IBoard";
import { IBoardController } from "./IBoardController";

export class BoardController implements IBoardController {
    private _board: IBoard;

    private _defaultAction: DefaultAction;
    private _currentAction: IAction;

    private _maxShuffleCount: number;
    private _currentShuffleCount: number;

    constructor(board: IBoard, groupSizeForDefaultAction: number, maxShuffleCount: number) {
        this._board = board;
        this._currentAction = this._defaultAction = new DefaultAction(groupSizeForDefaultAction);
        this._maxShuffleCount = maxShuffleCount;
        this._currentShuffleCount = 0;
    }

    shuffle(): void {
        if (this._currentShuffleCount >= this._maxShuffleCount) {
            return;
        }
        this._board.shuffle();
        this._currentShuffleCount++;
    }

    reset(): void {
        this._board.reset();
        this._currentAction = this._defaultAction;
        this._currentShuffleCount = 0;
    }

    performeCelAction(x: number, y: number): void {
        throw new Error("Method not implemented.");
    }


}