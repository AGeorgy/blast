import { IAction } from "./IAction";

export interface IAddActionGetCount {
    addAction(action: IAction, amount: number,): void;
    getCount(action: IAction): number;
}