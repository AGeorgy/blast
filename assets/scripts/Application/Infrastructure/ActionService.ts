import { ActionLogic } from "./Modules/Action/ActionLogic";
import { IActionService } from "./Modules/Action/IActionService";
import { IActionStore } from "./Modules/Action/IActionStore";
import { IGameStatsService } from "./Modules/GameStats/IGameStatsService";

export class ActionService implements IActionService {
    private _actionStore: IActionStore;
    private _gameStatsService: IGameStatsService;

    constructor(actionStore: IActionStore, gameStatsService: IGameStatsService) {
        this._actionStore = actionStore;
        this._gameStatsService = gameStatsService;
    }

    createDefaultAction(): string {
        return ActionLogic.addDefaultAction(this._actionStore);
    }

    applyAction(actionId: string): void {
        let action = this._actionStore.getAction(actionId);
        ActionLogic.applyAction(action);

        action = this._actionStore.getAction(actionId);
        this._gameStatsService.incrementTurn(action.costTurn);
        this._gameStatsService.incrementScore(action.scoreReward);
    }
}