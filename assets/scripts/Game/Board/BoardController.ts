import { ActionRemoveBathSameColor as ActionRemoveBatchSameColor } from "../Action/ActionRemoveBatchSameColor";
import { IAction } from "../Action/IAction";
import { BoardModel } from "./BoardModel";
import { IBoard } from "./IBoard";
import { IBoardController } from "./IBoardController";

export class BoardController implements IBoardController {
    private _board: IBoard;
    private _boardModel: BoardModel;

    private _defaultAction: ActionRemoveBatchSameColor;
    private _currentAction: IAction;

    constructor(board: IBoard, boardModel: BoardModel, batchSizeForDefaultAction: number) {
        this._board = board;
        this._boardModel = boardModel;
        this._defaultAction = new ActionRemoveBatchSameColor(batchSizeForDefaultAction);
        this.setDefaultAction();
    }

    setAction(action: IAction): void {
        this._currentAction = action;
    }

    shuffle(): void {
        if (!this._boardModel.canShuffle) {
            return;
        }
        this._board.shuffle();
        this._boardModel.increaseShuffle();
    }

    reset(): void {
        this._board.reset();
        this._currentAction = this._defaultAction;
        this._boardModel.reset();
    }

    performeActionOnCellAt(x: number, y: number): void {
        let executedCells = this._currentAction.execute(this._board, x, y);
        if (executedCells.isExecuted) {
            this._boardModel.increaseScore(executedCells.executedCells.length);
            this._boardModel.increaseTurn();

            // reaction on action
            console.log("executedCells", executedCells.executedCells);
            this.setDefaultAction();
        }
        else {
            // reaction on no action
            console.log("no action");
        }
    }

    private setDefaultAction(): void {
        this._currentAction = this._defaultAction;
    }
}