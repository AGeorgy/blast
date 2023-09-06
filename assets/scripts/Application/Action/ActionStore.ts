import { IActionStore } from "../../Modules/Action/IActionStore";
import { Action } from "../../Modules/Action/Model/Action";

export class ActionStore implements IActionStore {
    private _actions: Map<string, Action>;

    constructor() {
        this._actions = new Map<string, Action>();
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

}