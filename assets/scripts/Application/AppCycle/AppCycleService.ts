import { AppCycle } from "../../Modules/AppCycle/AppCycle";
import { IAppCycleService } from "../../Modules/AppCycle/IAppCycleService";
import { IAppStateStore } from "../../Modules/AppCycle/IAppStateStore";
import { AppState } from "../../Modules/AppCycle/Model/AppState";
import { IBoardService } from "../../Modules/Board/IBoardService";
import { IBoosterService } from "../../Modules/Booster/IBoosterService";
import { IGameStatsService } from "../../Modules/GameStats/IGameStatsService";
import { ISceneService } from "../../Modules/Scene/ISceneService";
import { ITileService } from "../../Modules/Tiles/ITileService";

export class AppCycleService implements IAppCycleService {
    private _appStateStore: IAppStateStore;
    private _sceneService: ISceneService;
    private _gameStats: IGameStatsService;
    private _board: IBoardService;
    private _boosterService: IBoosterService;
    private _tileService: ITileService;

    constructor(appStateStore: IAppStateStore, scene: ISceneService, gameStats: IGameStatsService, board: IBoardService,
        boosterService: IBoosterService, tileSrvice: ITileService) {
        this._appStateStore = appStateStore;
        this._sceneService = scene;
        this._gameStats = gameStats;
        this._board = board;
        this._boosterService = boosterService;
        this._tileService = tileSrvice;
    }

    createAppState(): void {
        this._appStateStore.addAppState(new AppState());
    }

    beginGame(): void {
        AppCycle.setStateToGame(this._appStateStore);
        this._gameStats.resetStats();
        this._board.resetBoard();
        this._tileService.resetTiles();
        this._boosterService.resetBoosters();

        this._sceneService.switchSceneToGame();
    }

    endGame(): void {
        AppCycle.setStateToGameOver(this._appStateStore);
        this._sceneService.switchSceneToGameOver();
    }
}