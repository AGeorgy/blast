import { IBoardStore } from "./IBoardStore";
import { Board } from "./Model/Board";

export class BoardStore implements IBoardStore {
    private _board: Board;

    constructor(xMax: number, yMax: number) {
        this._board = new Board(xMax, yMax);
    }

    updateBoard(board: Board): void {
        this._board = board;
    }

    getBoard(): Board {
        return this._board;
    }
}