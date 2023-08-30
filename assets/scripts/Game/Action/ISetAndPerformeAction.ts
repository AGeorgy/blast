import { IAction } from "./IAction";

export interface ISetAndPerformeAction {
    performeActionOnCellAt(x: number, y: number): void
    setAction(action: IAction): void;
}