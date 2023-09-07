import { IGameStageService } from "../Modules/GameStage/IGameStageService";
import { IStage } from "../Modules/GameStage/Model/IStage";
import { IGameStatsService } from "../Modules/GameStats/IGameStatsService";


export class IfLostOrWonStage implements IStage {
    private _gameStageService: IGameStageService;
    private _gameStatsService: IGameStatsService;

    constructor(gameStageService: IGameStageService, gameStatsService: IGameStatsService) {
        this._gameStageService = gameStageService;
        this._gameStatsService = gameStatsService;
    }

    isStarted: boolean;
    isDone: boolean;

    reset(): void {
        this.isStarted = false;
        this.isDone = false;
    }

    execute(): void {
        console.log("IfLostStage execute");
        this.isStarted = true;
        if (this._gameStatsService.ifLost || this._gameStatsService.ifWin) {
            this._gameStageService.switchToEndStages();
        }
        this.isDone = true;
    }
}