import { ISignalTrigger } from "../../../../Signal/Signal";
import { IGameStageService } from "./IGameStageService";
import { IGameStageStore } from "./IGameStageStore";
import { IStage } from "./Model/IStage";
import { EndGameStageSignal } from "./EndGameStageSignal";

export class GameStageService implements IGameStageService {
    private _stagesStore: IGameStageStore;
    private _endGameStagesDispatcher: ISignalTrigger<EndGameStageSignal>;

    constructor(stagesStore: IGameStageStore, endGameStagesDispatcher: ISignalTrigger<EndGameStageSignal>) {
        this._stagesStore = stagesStore;
        this._endGameStagesDispatcher = endGameStagesDispatcher;
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