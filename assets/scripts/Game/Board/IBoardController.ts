import { IAction } from "../Action/IAction";

export interface IBoardController {
    reset(): void;
    shuffle(): void;
    performeCelAction(x: number, y: number): void;
    setAction(action: IAction): void;
}