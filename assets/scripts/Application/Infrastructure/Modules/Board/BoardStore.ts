import { IBoardStore } from "./IBoardStore";
import { Board } from "./Model/Board";

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