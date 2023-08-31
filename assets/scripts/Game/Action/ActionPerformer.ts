import { ActionRemoveBatchSameColor } from "./ActionRemoveBatchSameColor";
import { IAction } from "./IAction";
import { BoardStats } from "../Board/BoardStats";
import { IAddObserver } from "../Board/IAddObserver";
import { IAllowAction } from "../Board/IAllowAction";
import { IBoard } from "../Board/IBoard";
import { IActionPerformer } from "./IActionPerformer";
import { IIsActionAllowed } from "../Board/IIsActionAllowed";
import { IObserver } from "../Board/IObserver";
import { ICanDoDefaultAction } from "../Board/ICanDoDefaultAction";

export class ActionPerformer implements IActionPerformer, IAllowAction, IAddObserver, IIsActionAllowed, ICanDoDefaultAction {
    private readonly _board: IBoard;
    private readonly _boardStats: BoardStats;

    private readonly _defaultAction: ActionRemoveBatchSameColor;
    private _currentAction: IAction;
    private _isActionAllowed: boolean;
    private _observers: IObserver[] = [];

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
        console.log("ActionPerformer setAction", action);
        this._currentAction = action;
    }

    reset(): void {
        console.log("ActionPerformer reset");
        this._currentAction = this._defaultAction;
        this._boardStats.reset();
    }

    performActionOnCellAt(x: number, y: number): void {
        console.log("ActionPerformer performActionOnCellAt", x, y);
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