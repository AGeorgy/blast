import { ActionRemoveBathSameColor } from "../Action/ActionRemoveBathSameColor";
import { IAction } from "../Action/IAction";
import { IBoard } from "./IBoard";
import { IBoardController } from "./IBoardController";

export class BoardController implements IBoardController {
    private _board: IBoard;

    private _defaultAction: ActionRemoveBathSameColor;
    private _currentAction: IAction;

    private _maxShuffleCount: number;
    private _currentShuffleCount: number;

    constructor(board: IBoard, groupSizeForDefaultAction: number, maxShuffleCount: number) {
        this._board = board;
        this._currentAction = this._defaultAction = new ActionRemoveBathSameColor(groupSizeForDefaultAction);
        this._maxShuffleCount = maxShuffleCount;
        this._currentShuffleCount = 0;
    }

    setAction(action: IAction): void {
        this._currentAction = action;
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

    performeActionOnCellAt(x: number, y: number): void {
        let executedCells = this._currentAction.execute(this._board, x, y);
        if (executedCells.isExecuted) {
            // reaction on action
            console.log("executedCells", executedCells.executedCells);
        }
        else {
            // reaction on no action
            console.log("no action");
        }
    }


}