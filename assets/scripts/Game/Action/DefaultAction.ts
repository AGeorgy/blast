import { IBoard } from "../Board/IBoard";
import { IAction } from "./IAction";

export class DefaultAction implements IAction {
    performeAction(board: IBoard): void {
        throw new Error("Method not implemented.");
    }
}