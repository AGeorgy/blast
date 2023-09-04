import { IPerformAction } from "../Action/IPerformAction";
import { IResetMode } from "./IResetMode";

export interface IInputMode {
    readonly rank: number;
    clickAt(x: number, y: number, resetMode: IResetMode, performAction: IPerformAction): void;
}