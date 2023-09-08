import { IGameSettings } from "../IGameSettings";
import { ActionService } from "./Infrastructure/Modules/Action/ActionService";
import { BoardService } from "./Infrastructure/Modules/Board/BoardService";
import { BoosterService } from "./Infrastructure/Modules/Booster/BoosterService";
import { ColorPaletteService } from "./Infrastructure/Modules/Color/ColorPaletteService";
import { GameStatsService } from "./Infrastructure/Modules/GameStats/GameStatsService";
import { InputModeService } from "./Infrastructure/Modules/InputMode/InputModeService";
import { SceneService } from "./Infrastructure/Modules/Scene/SceneService";
import { TileService } from "./Infrastructure/Modules/Tiles/TileService";
import { SlotStore } from "./Infrastructure/Modules/Board/SlotStore";
import { BoardStore } from "./Infrastructure/Modules/Board/BoardStore";
import { AppCycleService } from "./Infrastructure/Modules/AppCycle/AppCycleService";
import { BeginGameSignal as BeginGameSignal } from "./Infrastructure/Modules/AppCycle/BeginGameSignal";
import { AppStateStore } from "./Infrastructure/Modules/AppCycle/AppStateStore";
import { EndGameHandler } from "./EndGameHandler";
import { BeginGameHandler } from "./BeginGameHandler";
import { Signal } from "../Signal/Signal";
import { EndGameSignal } from "./Infrastructure/Modules/AppCycle/EndGameSignal";
import { GameStageService } from "./Infrastructure/Modules/GameStage/GameStageService";
import { EndGameStageSignal } from "./Infrastructure/Modules/GameStage/EndGameStageSignal";
import { EndGameStagesHandler } from "./EndGameStagesHandler";
import { ActionStore } from "./Infrastructure/Modules/Action/ActionStore";
import { GameStatsStore } from "./Infrastructure/Modules/GameStats/GameStatsStore";
import { ApplyActionSignal } from "./Infrastructure/Modules/Action/ApplyActionSignal";
import { GameStageStore } from "./Infrastructure/Modules/GameStage/GameStageStore";
import { ColorStore } from "./Infrastructure/Modules/Color/ColorStore";
import { InputModeStore } from "./Infrastructure/Modules/InputMode/InputModeStore";
import { SceneStore } from "./Infrastructure/Modules/Scene/SceneStore";
import { BoosterStore } from "./Infrastructure/Modules/Booster/BoosterStore";
import { TileStore } from "./Infrastructure/Modules/Tiles/TileStore";
import { WaitForTimeStage } from "./Infrastructure/GameSages/WaitForTimeStage";
import { AllowActionStage } from "./Infrastructure/GameSages/AllowActionStage";
import { FillingStage } from "./Infrastructure/GameSages/FillingStage";
import { IfLostOrWonStage } from "./Infrastructure/GameSages/IfLostOrWonStage";
import { ShuffleIfCantContinueStage } from "./Infrastructure/GameSages/ShuffleIfCantContinueStage";
import { ShiftDownStage } from "./Infrastructure/GameSages/ShiftDownStage";
import { WaitForActionStage } from "./Infrastructure/GameSages/WaitForActionStage";
import { TileClickHandler, TileClickSignal } from "./TileClickHandler";
import { BoosterClickSignal } from "./BoosterClickHandler";
import { ApplyActionHandler } from "./ApplyActionHandler";
import { Tile } from "../Game/Board/Tile";

export class Application {
    static endGameSignal: Signal<EndGameSignal>;
    static tileClickSignal: Signal<TileClickSignal>;
    static boosterClickSignal: Signal<BoosterClickSignal>;

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
    private _applyActionSignal: Signal<ApplyActionSignal>;

    constructor(settings: IGameSettings) {
        console.log('Application created');
        this._settings = settings;

        this._applyActionSignal = new Signal<ApplyActionSignal>();
        this._beginGameSignal = new Signal<BeginGameSignal>();
        this._endGameStagesSignal = new Signal<EndGameStageSignal>();
        Application.endGameSignal = new Signal<EndGameSignal>();
        Application.tileClickSignal = new Signal<TileClickSignal>();
        Application.tileClickSignal.subscribe(TileClickHandler.handle.bind(this._tileService, this._inputModeService, this._actionService));
        Application.boosterClickSignal = new Signal<BoosterClickSignal>();

        this._colorService = new ColorPaletteService(new ColorStore(), this._settings.tileColors);
        this._gameStatsService = new GameStatsService(new GameStatsStore());
        let inputModeStore = new InputModeStore();
        this._inputModeService = new InputModeService(inputModeStore);

        this._applyActionSignal.subscribe(ApplyActionHandler.handle.bind(this._gameStatsService));
        this._actionService = new ActionService(new ActionStore(), this._applyActionSignal);

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
        let startStages = [
            new WaitForTimeStage(1),
            new AllowActionStage(false, this._actionService),
            new FillingStage(this._boardService),
            new WaitForTimeStage(1),
        ];
        let repeatingStages = [
            new IfLostOrWonStage(this._gameStageService, this._gameStatsService),
            new ShuffleIfCantContinueStage(1, this._actionService, this._boardService, this._gameStageService, this._gameStatsService),
            new AllowActionStage(true, this._actionService),
            new WaitForActionStage(this._actionService, this._applyActionSignal),
            new AllowActionStage(false, this._actionService),
            new ShiftDownStage(this._boardService),
            new FillingStage(this._boardService),
            new WaitForTimeStage(1),
        ];

        this._gameStageService.addStartStages(startStages);
        this._gameStageService.addRepeatingStages(repeatingStages);
        // this._gameStageService.addEndStages();
    }
}