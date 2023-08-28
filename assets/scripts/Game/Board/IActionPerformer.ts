import { IAction } from "../Action/IAction";

export interface IActionPerformer {
    reset(): void;
    performeActionOnCellAt(x: number, y: number): void;
    setAction(action: IAction): void;
}