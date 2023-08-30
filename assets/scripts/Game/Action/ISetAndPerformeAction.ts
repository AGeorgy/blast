import { IAction } from "./IAction";

export interface ISetAndPerformeAction {
    performActionOnCellAt(x: number, y: number): void
    setAction(action: IAction): void;
}