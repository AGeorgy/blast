import { IActionService } from "./IActionService";
import { IActionStore } from "./IActionStore";
import { ISignalTrigger } from "../../../../Signal/Signal";
import { ApplyActionSignal } from "./ApplyActionSignal";

export class ActionService implements IActionService {
    private _actionStore: IActionStore;
    private _applyActionDispatcher: ISignalTrigger<ApplyActionSignal>;

    constructor(actionStore: IActionStore, applyActionDispatcher: ISignalTrigger<ApplyActionSignal>) {
        this._actionStore = actionStore;
        this._applyActionDispatcher = applyActionDispatcher;
    }

    get canDoDefaultAction(): boolean {
        return true;

    }

    createDefaultAction(): string {
        // let action = new Action(crypto.randomUUID(), "Default", Number.MAX_SAFE_INTEGER, 1, 1, new ActionEffectRemoveBatchSameColor());
        // return actionStore.updateAction(action);
        return "";
    }

    getCurrentActionId(): string {
        return this._actionStore.getCurrentActionId();
    }

    setCurrentActionId(actionId: string): void {
        this._actionStore.setCurrentActionId(actionId);
    }

    applyAction(actionId: string, tileIds: string[]): void {
        if (!this._actionStore.isActionApplianceAllowed) {
            return;
        }
        let action = this._actionStore.getAction(actionId);
        action.applyAction(tileIds);

        action = this._actionStore.getAction(actionId);
        this._applyActionDispatcher.trigger(new ApplyActionSignal(action.costTurn, action.scoreReward));
    }

    allowActionAppliance(isAllowed: boolean): void {
        this._actionStore.isActionApplianceAllowed = isAllowed;
    }
}