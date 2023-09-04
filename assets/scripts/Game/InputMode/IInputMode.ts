import { IPerformAction } from "../Action/IPerformAction";

export interface IInputMode {
    clickAt(x: number, y: number, performAction: IPerformAction): boolean;
}