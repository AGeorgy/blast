import { IAction } from "../Action/IAction";

export interface IBoardController {
    shuffle(): void;
    performeActionOnCellAt(x: number, y: number): void;
    setAction(action: IAction): void;
}