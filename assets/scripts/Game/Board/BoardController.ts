import { DefaultAction } from "../Action/DefaultAction";
import { IAction } from "../Action/IAction";
import { IBoard } from "./IBoard";
import { IBoardController } from "./IBoardController";

export class BoardController implements IBoardController {
    private _board: IBoard;
    private _action: IAction;

    constructor(board: IBoard) {
        this._board = board;
    }

    resetBoard(): void {
        this._board.reset();
        this._action = new DefaultAction();
    }

    performeCelAction(x: number, y: number): void {
        throw new Error("Method not implemented.");
    }
}