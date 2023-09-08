import { Action } from "./Model/Action";

export interface IActionStore {
    removeAction(actionId: string): void;
    getCurrentActionId(): string;
    setCurrentActionId(actionId: string): void;
    isActionApplianceAllowed: boolean;
    updateAction(action: Action): string;
    getAction(actionId: string): Action;
    addAction(action: Action): string;
}