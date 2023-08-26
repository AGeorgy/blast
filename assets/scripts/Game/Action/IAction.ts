import { IBoard } from "../Board/IBoard";

export interface IAction {
    performeAction(board: IBoard): void;
}