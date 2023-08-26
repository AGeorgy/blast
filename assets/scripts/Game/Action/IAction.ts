import { IBoard } from "../Board/IBoard";

export interface IAction {
    execute(board: IBoard, x: number, y: number): { x: number, y: number }[];
}