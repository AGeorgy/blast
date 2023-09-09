import { ISignalTrigger } from "../../../../Signal/Signal";
import { IGameStageService } from "./IGameStageService";
import { IGameStageStore } from "./IGameStageStore";
import { IStage } from "./Model/IStage";
import { EndGameStageSignal } from "./EndGameStageSignal";
import { GameStages } from "./Model/GameStages";

export class GameStageService implements IGameStageService {
    private _stagesStore: IGameStageStore;
    private _endGameStagesDispatcher: ISignalTrigger<EndGameStageSignal>;

    constructor(stagesStore: IGameStageStore, endGameStagesDispatcher: ISignalTrigger<EndGameStageSignal>) {
        this._stagesStore = stagesStore;
        this._endGameStagesDispatcher = endGameStagesDispatcher;
        this._stagesStore.addGameStages(new GameStages());
    }

    switchToEndStages(): void {
        let gameStages = this._stagesStore.getGameStages();
        gameStages.switchToEndStages();
        this._stagesStore.updateGameStages(gameStages);
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
        if (currentStage == null) {
            return;
        }
        if (currentStage.isDone) {
            console.log("GameStageService update");
            currentStage.reset();
            gameStages.nextStage();
        }
        else if (currentStage.isStarted) {
            return;
        }
        else {
            currentStage.execute();
        }
    }
}