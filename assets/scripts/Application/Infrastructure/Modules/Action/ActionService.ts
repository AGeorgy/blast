import { IActionService } from "./IActionService";
import { IActionStore } from "./IActionStore";
import { IGameStatsService } from "../GameStats/IGameStatsService";
import { ISignalTrigger } from "../../../../Signal/Signal";
import { ApplyActionSignal } from "./ApplyActionSignal";

export class ActionService implements IActionService {
    private _actionStore: IActionStore;
    private _gameStatsService: IGameStatsService;
    private _applyActionDispatcher: ISignalTrigger<ApplyActionSignal>;

    constructor(actionStore: IActionStore, gameStatsService: IGameStatsService,
        applyActionDispatcher: ISignalTrigger<ApplyActionSignal>) {
        this._actionStore = actionStore;
        this._gameStatsService = gameStatsService;
        this._applyActionDispatcher = applyActionDispatcher;
    }

    get canDoDefaultAction(): boolean {
        return true;

    }

    createDefaultAction(): string {
        // let action = new Action(crypto.randomUUID(), "Default", Number.MAX_SAFE_INTEGER, 1, 1, new ActionEffectRemoveBatchSameColor());
        // return actionStore.updateAction(action);
    }

    applyAction(actionId: string): void {
        if (!this._actionStore.isActionApplianceAllowed) {
            return;
        }
        let action = this._actionStore.getAction(actionId);
        action.applyAction();

        action = this._actionStore.getAction(actionId);
        this._gameStatsService.incrementTurn(action.costTurn);
        this._gameStatsService.incrementScore(action.scoreReward);
        this._applyActionDispatcher.trigger(new ApplyActionSignal());
    }

    allowActionAppliance(isAllowed: boolean): void {
        this._actionStore.isActionApplianceAllowed = isAllowed;
    }
}