import { IPerformAction } from "../Action/IPerformAction";
import { ISetMode } from "./ISetMode";

export interface IInputMode {
    clickAt(x: number, y: number, setMode: ISetMode, performAction: IPerformAction): void;
}