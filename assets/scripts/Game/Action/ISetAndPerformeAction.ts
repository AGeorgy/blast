import { ISetAction } from "./ISetAction";

export interface ISetAndPerformeAction extends ISetAction {
    performActionOnCellAt(x: number, y: number): void
}