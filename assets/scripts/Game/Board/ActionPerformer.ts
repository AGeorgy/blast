import { ActionRemoveBathSameColor as ActionRemoveBatchSameColor } from "../Action/ActionRemoveBatchSameColor";
import { IAction } from "../Action/IAction";
import { BoardStats } from "./BoardStats";
import { IAddObserver } from "./IAddObserver";
import { IAllowAction } from "./IAllowAction";
import { IBoard } from "./IBoard";
import { IActionPerformer } from "./IActionPerformer";
import { IIsActionAllowed } from "./IIsActionAllowed";
import { IObserver } from "./IObserver";
import { IFillBoard } from "./IFillBoard";
import { ICanDoDefaultAction } from "./ICanDoDefaultAction";

export class ActionPerformer implements IActionPerformer, IFillBoard, IAllowAction, IAddObserver, IIsActionAllowed, ICanDoDefaultAction {
    private _board: IBoard;
    private _boardStats: BoardStats;

    private _defaultAction: ActionRemoveBatchSameColor;
    private _currentAction: IAction;
    private _isActionAllowed: boolean;
    private _observers: IObserver[];

    constructor(board: IBoard, boardStats: BoardStats, batchSizeForDefaultAction: number) {
        this._board = board;
        this._boardStats = boardStats;
        this._defaultAction = new ActionRemoveBatchSameColor(batchSizeForDefaultAction);
        this.setDefaultAction();
    }

    get canDoDefaultAction(): boolean {
        for (let y = 0; y < this._board.yMax; y++) {
            for (let x = 0; x < this._board.xMax; x++) {
                if (this._defaultAction.canExecute(this._board, x, y)) {
                    return true;
                }
            }
        }
        return false;
    }

    get isActionAllowed(): boolean {
        return this._isActionAllowed;
    }

    addObserver(observer: IObserver): void {
        this._observers.push(observer);
    }

    allowAction(isAllowed: boolean): void {
        this._isActionAllowed = isAllowed;
    }

    setAction(action: IAction): void {
        this._currentAction = action;
    }

    reset(): void {
        console.log("ActionPerformer reset");
        this.fillBoard();
        this._currentAction = this._defaultAction;
        this._boardStats.reset();
    }

    fillBoard(): void {
        this._board.fill();
    }

    performeActionOnCellAt(x: number, y: number): void {
        console.log("ActionPerformer performeActionOnCellAt", x, y);
        if (!this._isActionAllowed) {
            return;
        }

        let executedCells = this._currentAction.execute(this._board, x, y);
        if (executedCells.isExecuted) {
            this._boardStats.increaseScore(executedCells.executedCells.length);
            this._boardStats.increaseTurn();

            // reaction on action
            console.log("executedCells", executedCells.executedCells);
            this.setDefaultAction();
            this.notifyObservers();
        }
        else {
            // reaction on no action
            console.log("no action");
        }
    }

    private setDefaultAction(): void {
        this._currentAction = this._defaultAction;
    }

    private notifyObservers(): void {
        this._observers.forEach(observer => {
            observer.notified();
        });
    }
}