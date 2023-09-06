import { IActionStore } from "./IActionStore";
import { Action } from "./Model/Action";

export class ActionLogic {
    static applyAction(action: Action) {
        action.applyAction();
    }

    static addDefaultAction(actionStore: IActionStore): string {
        let action = new Action(crypto.randomUUID(), "Default", Number.MAX_SAFE_INTEGER, 1, 1, new ActionEffectRemoveBatchSameColor());
        return actionStore.updateAction(action);
    }
}