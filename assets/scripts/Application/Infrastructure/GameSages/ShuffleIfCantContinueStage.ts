import { ICanApplyDefaultAction } from "../Modules/Action/Model/ICanApplyDefaultAction";
import { IBoardService } from "../Modules/Board/IBoardService";
import { IGameStageService } from "../Modules/GameStage/IGameStageService";
import { IStage } from "../Modules/GameStage/Model/IStage";
import { IGameStatsService } from "../Modules/GameStats/IGameStatsService";

export class ShuffleIfCantContinueStage implements IStage {
    private readonly _canApplyDefaultAction: ICanApplyDefaultAction;
    private readonly _boardService: IBoardService;
    private readonly _gameStageService: IGameStageService;
    private readonly _gameStatsService: IGameStatsService;
    private readonly _time: number;
    private _isStarted: boolean = false;
    private _isDone: boolean = false;


    constructor(time: number, canApplyDefaultAction: ICanApplyDefaultAction, boardService: IBoardService, gameStageService: IGameStageService,
        gameStatsService: IGameStatsService) {
        this._time = time;
        this._canApplyDefaultAction = canApplyDefaultAction;
        this._boardService = boardService;
        this._gameStageService = gameStageService;
        this._gameStatsService = gameStatsService;
    }

    get isStarted(): boolean {
        return this._isStarted;
    }

    get isDone(): boolean {
        return this._isDone;
    }

    reset(): void {
        this._isStarted = false;
        this._isDone = false;
    }

    execute(): void {
        console.log("ShuffleIfCantContinueStage execute");
        this._isStarted = true;
        if (!this._canApplyDefaultAction.canApplyDefaultAction()) {
            if (this._gameStatsService.canShuffle) {
                this._boardService.shuffle();
                this._gameStatsService.incrementShuffle();
                setTimeout(() => {
                    this.execute();
                }, this._time * 1000);
            }
            else {
                this._gameStageService.switchToEndStages();
                this._isDone = true;
            }
        }
        else {
            this._isDone = true;
        }
    }
}