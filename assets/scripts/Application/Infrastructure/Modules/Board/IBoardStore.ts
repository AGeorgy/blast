import { Board } from "./Model/Board";

export interface IBoardStore {
    updateBoard(board: Board): void;
    getBoard(): Board;
}