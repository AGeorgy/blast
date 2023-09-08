import { IActionStore } from "./IActionStore";
import { Action } from "./Model/Action";


export class ActionStore implements IActionStore {
    private _isActionApplianceAllowed: boolean;
    private _currentActionId: string;
    private _actions: Map<string, Action>;

    constructor() {
        this._actions = new Map<string, Action>();
    }

    removeAction(actionId: string): void {
        this._actions.delete(actionId);
    }

    getCurrentActionId(): string {
        return this._currentActionId;
    }

    setCurrentActionId(actionId: string): void {
        this._currentActionId = actionId;
    }

    updateAction(action: Action): string {
        if (!this._actions.has(action.id)) {
            throw new Error("Action not found");
        }
        this._actions.set(action.id, action);
        return action.id;
    }

    getAction(actionId: string): Action {
        if (!this._actions.has(actionId)) {
            throw new Error("Action not found");
        }
        return this._actions.get(actionId);
    }

    addAction(action: Action): string {
        this._actions.set(action.id, action);
        return action.id;
    }

    get isActionApplianceAllowed(): boolean {
        return this._isActionApplianceAllowed;
    }

    set isActionApplianceAllowed(value: boolean) {
        this._isActionApplianceAllowed = value;
    }
}