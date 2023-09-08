import { IActionEffect } from "./Model/IActionEffect";

export interface IActionService {
    getCurrentActionId(): string;
    setCurrentActionId(actionId: string): void;
    applyAction(actionId: string, tileIds: string[]): void;
    createDefaultAction(effect: IActionEffect): string
    createAction(applyLimit: number, cost: number, scoreReward: number, effect: IActionEffect): string;
    allowActionAppliance(isAllowed: boolean): void;
}