import { Board } from "./Model/Board";

export interface IBoardStore {
    getBoard(): Board;
}