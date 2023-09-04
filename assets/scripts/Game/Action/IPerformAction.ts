import { IAction } from "./IAction";

export interface IPerformAction {
    performActionOnCellAt(positions: { x: number, y: number }[], action: IAction): void;
}