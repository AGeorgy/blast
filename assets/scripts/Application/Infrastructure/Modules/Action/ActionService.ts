import { IActionService } from "./IActionService";
import { IActionStore } from "./IActionStore";
import { ISignalTrigger } from "../../../../Signal/Signal";
import { ApplyActionSignal } from "./ApplyActionSignal";
import { Action } from "./Model/Action";
import { IActionEffect } from "./Model/IActionEffect";

export class ActionService implements IActionService {
    private _actionStore: IActionStore;
    private _applyActionDispatcher: ISignalTrigger<ApplyActionSignal>;

    constructor(actionStore: IActionStore, applyActionDispatcher: ISignalTrigger<ApplyActionSignal>) {
        this._actionStore = actionStore;
        this._applyActionDispatcher = applyActionDispatcher;
    }

    createDefaultAction(effect: IActionEffect): string {
        let id = this.createAction(Number.MAX_SAFE_INTEGER, 1, 1, effect);
        return id;
    }

    createAction(applyLimit: number, cost: number, scoreReward: number, effect: IActionEffect): string {
        let action = new Action(crypto.randomUUID(), applyLimit, cost, scoreReward, effect);
        return this._actionStore.updateAction(action);
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
        let signal = new ApplyActionSignal(action.costTurn, action.scoreReward);
        if (action.isEmpty) {
            this._actionStore.removeAction(actionId);
        }

        this._applyActionDispatcher.trigger(signal);
    }

    allowActionAppliance(isAllowed: boolean): void {
        this._actionStore.isActionApplianceAllowed = isAllowed;
    }
}