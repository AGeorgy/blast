import { IBoardStore } from "../../Modules/Board/IBoardStore";
import { Board } from "../../Modules/Board/Model/Board";

export class BoardStore implements IBoardStore {
    private _board: Board;

    constructor() {
        this._board = new Board(0, 0);
    }

    updateBoard(board: Board): void {
        this._board = board;
    }
    getBoard(): Board {
        return this._board;
    }
}