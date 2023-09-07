import { ISignalTrigger } from "../../Signal/Signal";
import { IGameStageService } from "./Modules/GameStage/IGameStageService";
import { IGameStageStore } from "./Modules/GameStage/IGameStageStore";
import { IStage } from "./Modules/GameStage/Model/IStage";
import { EndGameStageSignal } from "./Modules/GameStage/EndGameStageSignal";

export class GameStageService implements IGameStageService {
    private _stagesStore: IGameStageStore;
    private _endGameStagesDispatcher: ISignalTrigger<EndGameStageSignal>;

    constructor(stagesStore: IGameStageStore, endGameStagesDispatcher: ISignalTrigger<EndGameStageSignal>) {
        this._stagesStore = stagesStore;
        this._endGameStagesDispatcher = endGameStagesDispatcher;
    }

    resetStages(): void {
        let gameStages = this._stagesStore.getGameStages();
        gameStages.reset();
        this._stagesStore.updateGameStages(gameStages);
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

    update(): void {
        let gameStages = this._stagesStore.getGameStages();
        if (gameStages.isEnded) {
            this._endGameStagesDispatcher.trigger(new EndGameStageSignal());
            return;
        }

        let currentStage = gameStages.getStage();
        if (currentStage.isDone) {
            gameStages.nextStage();
            currentStage.reset();
        }
        else if (currentStage.isStarted) {
            return;
        }
        else {
            currentStage.execute();
        }
    }
}