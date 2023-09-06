import { Action } from "./Model/Action";

export interface IActionStore {
    updateAction(action: Action): string;
    getAction(actionId: string): Action;
    addAction(action: Action): string;
}