import { IGameSettings } from "../IGameSettings";
import { ActionService } from "./Infrastructure/ActionService";
import { ActionStore } from "./Infrastructure/ActionStore";
import { BoardService } from "./Infrastructure/Modules/Board/BoardService";
import { BoosterService } from "./Infrastructure/BoosterService";
import { ColorPaletteService } from "./Infrastructure/ColorPaletteService";
import { GameStatsService } from "./Infrastructure/GameStatsService";
import { InputModeService } from "./Infrastructure/InputModeService";
import { InputModeStore } from "./Infrastructure/InputModeStore";
import { SceneService } from "./Infrastructure/SceneService";
import { SceneStore } from "./Infrastructure/SceneStore";
import { TileService } from "./Infrastructure/TileService";
import { TileStore } from "./Infrastructure/TileStore";
import { SlotStore } from "./Infrastructure/Modules/Board/SlotStore";
import { BoardStore } from "./Infrastructure/Modules/Board/BoardStore";
import { ColorStore } from "./Infrastructure/ColorStore";
import { GameStatsStore } from "./Infrastructure/GameStatsStore";
import { BoosterStore } from "./Infrastructure/BoosterStore";

import { AppCycleService } from "./Infrastructure/Modules/AppCycle/AppCycleService";
import { BeginGameSignal as BeginGameSignal } from "./Infrastructure/Modules/AppCycle/BeginGameSignal";
import { AppStateStore } from "./Infrastructure/Modules/AppCycle/AppStateStore";

import { EndGameHandler } from "./EndGameHandler";
import { BeginGameHandler } from "./BeginGameHandler";
import { Signal } from "../Signal/Signal";
import { EndGameSignal } from "./Infrastructure/Modules/AppCycle/EndGameSignal";
import { GameStageService } from "./Infrastructure/GameStageService";
import { GameStageStore } from "./Infrastructure/GameStageStore";
import { EndGameStageSignal } from "./Infrastructure/Modules/GameStage/EndGameStageSignal";
import { EndGameStagesHandler } from "./EndGameStagesHandler";

export class Application {
    static endGameSignal: Signal<EndGameSignal>;

    private _settings: IGameSettings;

    private _beginGameSignal: Signal<BeginGameSignal>;

    private _inputModeService: InputModeService;
    private _gameStatsService: GameStatsService;
    private _actionService: ActionService;
    private _sceneService: SceneService;
    private _appCycleService: AppCycleService;
    private _boardService: BoardService;
    private _boosterService: BoosterService;
    private _colorService: ColorPaletteService;
    private _tileService: TileService;
    private _gameStageService: GameStageService;
    private _endGameStagesSignal: Signal<EndGameStageSignal>;

    constructor(settings: IGameSettings) {
        console.log('Application created');
        this._settings = settings;

        this._beginGameSignal = new Signal<BeginGameSignal>();
        this._endGameStagesSignal = new Signal<EndGameStageSignal>();
        Application.endGameSignal = new Signal<EndGameSignal>();

        this._colorService = new ColorPaletteService(new ColorStore(), this._settings.tileColors);
        this._gameStatsService = new GameStatsService(new GameStatsStore());
        let inputModeStore = new InputModeStore();
        this._inputModeService = new InputModeService(inputModeStore);
        this._actionService = new ActionService(new ActionStore(), this._gameStatsService);
        this._sceneService = new SceneService(new SceneStore());
        let slotStore = new SlotStore();
        this._boardService = new BoardService(new BoardStore(), slotStore);
        this._boosterService = new BoosterService(new BoosterStore());
        this._tileService = new TileService(new TileStore(), this._colorService, slotStore, inputModeStore);

        this._beginGameSignal.subscribe(BeginGameHandler.handle.bind(this._sceneService, this._gameStatsService, this._boardService, this._boosterService));
        Application.endGameSignal.subscribe(EndGameHandler.handle.bind(this._sceneService));
        this._appCycleService = new AppCycleService(new AppStateStore(), this._beginGameSignal, Application.endGameSignal);

        this._endGameStagesSignal.subscribe(EndGameStagesHandler.handle.bind(this._appCycleService));
        this._gameStageService = new GameStageService(new GameStageStore(), this._endGameStagesSignal);
        this.addStages();
    }

    beginGame(): void {
        this._beginGameSignal.trigger(new BeginGameSignal());
    }

    update() {

    }

    private addStages() {
        this._gameStageService.addEndStages([]);
        this._gameStageService.addStartStages([]);
        this._gameStageService.addRepeatingStages([]);
    }
}