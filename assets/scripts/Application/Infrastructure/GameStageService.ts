import { IGameStageService } from "./Modules/GameStage/IGameStageService";
import { IGameStageStore } from "./Modules/GameStage/IGameStageStore";
import { IStage } from "./Modules/GameStage/Model/IStage";

export class GameStageService implements IGameStageService {
    private _stagesStore: IGameStageStore;

    constructor(stagesStore: IGameStageStore) {
        this._stagesStore = stagesStore;
    }

    addStartStages(stages: IStage[]): void {
        let gameStages = this._stagesStore.getGameStages();
        gameStages.addStartStages(stages);
        this._stagesStore.updateGameStages(gameStages);
    }

    addRepeatingStages(stages: IStage[]): void {
        let gameStages = this._stagesStore.getGameStages();
        gameStages.addRepeatingStages(stages);
        this._stagesStore.updateGameStages(gameStages);
    }

    addEndStages(stages: IStage[]): void {
        let gameStages = this._stagesStore.getGameStages();
        gameStages.addEndStages(stages);
        this._stagesStore.updateGameStages(gameStages);
    }
}