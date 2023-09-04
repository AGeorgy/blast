import { ActionRemoveBatchSameColor } from "./ActionRemoveBatchSameColor";
import { IAction } from "./IAction";
import { BoardStats } from "../Board/BoardStats";
import { IAddObserver } from "../API/IAddObserver";
import { IAllowAction } from "../Board/IAllowAction";
import { IBoard } from "../Board/IBoard";
import { IIsActionAllowed } from "./IIsActionAllowed";
import { IObserver } from "../../API/IObserver";
import { ICanDoDefaultAction } from "../Board/ICanDoDefaultAction";
import { IAddActionGetCount } from "./IAddActionGetCount";
import { IPerformAction } from "./IPerformAction";

export class ActionPerformer implements IPerformAction, IAllowAction, IAddObserver, IIsActionAllowed, ICanDoDefaultAction, IAddActionGetCount {
    private readonly _board: IBoard;
    private readonly _boardStats: BoardStats;

    private readonly _defaultAction: ActionRemoveBatchSameColor;
    private _isActionAllowed: boolean;
    private _observers: IObserver[] = [];
    // TODO: useing Map<object, number> might be not reliable solution and lokating in wrong place.
    // But it is good enough for now.
    private _actions: Map<object, number> = new Map();

    constructor(board: IBoard, boardStats: BoardStats, defaultAction: ActionRemoveBatchSameColor) {
        this._board = board;
        this._boardStats = boardStats;
        this._defaultAction = defaultAction;
    }

    getCount(action: IAction): number {
        if (this._actions.has(action)) {
            return this._actions.get(action)!;
        }

        console.warn("ActionPerformer getCount", action, "not found in ", this._actions);
        return 0;
    }

    addAction(action: IAction, amount: number): void {
        this._actions.set(action, amount);
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

    performActionOnCellAt(positions: { x: number, y: number }[], action: IAction): void {
        console.log("ActionPerformer performActionOnCellAt", positions);
        if (!this._isActionAllowed) {
            return;
        }

        let executedCells = action.execute(this._board, positions);
        console.log("executedCells", executedCells.executedCells);
        if (executedCells.isExecuted) {
            this._boardStats.increaseScore(executedCells.executedCells.length);
        }

        this._boardStats.increaseTurn();
        this.decriseActionCount(action);
        this.notifyObservers();
    }

    private decriseActionCount(action: IAction): void {
        console.log("ActionPerformer decriseActionCount", action);
        if (this._actions.has(action)) {
            const count = this._actions.get(action);
            this._actions.set(action, Math.max(count - 1, 0));
        }
    }

    private notifyObservers(): void {
        this._observers.forEach(observer => {
            observer.notified();
        });
    }
}