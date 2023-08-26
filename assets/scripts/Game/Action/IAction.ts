import { IBoard } from "../Board/IBoard";
import { IActionResult } from "./IActionResult";

export interface IAction {
    execute(board: IBoard, x: number, y: number): IActionResult;
}