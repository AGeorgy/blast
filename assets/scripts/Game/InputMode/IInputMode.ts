import { IPerformAction } from "../Action/IPerformAction";
import { ISetInputMode } from "./ISetInputMode";

export interface IInputMode {
    clickAt(x: number, y: number, setMode: ISetInputMode, performAction: IPerformAction): void;
}