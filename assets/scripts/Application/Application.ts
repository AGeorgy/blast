import { IGameSettings } from "../IGameSettings";
import { ActionService } from "./Action/ActionService";
import { ActionStore } from "./Action/ActionStore";
import { BoardService } from "../Modules/Board/BoardService";
import { BoosterService } from "./Booster/BoosterService";
import { BoosterStore } from "./Booster/BoosterStore";
import { ColorPaletteService } from "./Color/ColorPaletteService";
import { ColorStore } from "./Color/ColorStore";
import { GameStatsService } from "./GameStats/GameStatsService";
import { GameStatsStore } from "./GameStats/GameStatsStore";
import { InputModeService } from "./InputMode/InputModeService";
import { InputModeStore } from "./InputMode/InputModeStore";
import { SceneService } from "./Scene/SceneService";
import { SceneStore } from "./Scene/SceneStore";
import { TileService } from "./Tiles/TileService";
import { TileStore } from "./Tiles/TileStore";

import { AppCycleService } from "../Modules/AppCycle/AppCycleService";
import { BeginGameSignal as BeginGameSignal } from "../Modules/AppCycle/BeginGameSignal";
import { AppStateStore } from "../Modules/AppCycle/AppStateStore";

import { EndGameHandler } from "./EndGameHandler";
import { BeginGameHandler } from "./BeginGameHandler";
import { Signal } from "../Signal/Signal";
import { EndGameSignal } from "../Modules/AppCycle/EndGameSignal";

import { SlotStore } from "../Modules/Board/SlotStore";
import { BoardStore } from "../Modules/Board/BoardStore";

export class Application {
    private _settings: IGameSettings;

    private _beginGameSignal: Signal<BeginGameSignal>;
    private _endGameSignal: Signal<EndGameSignal>;

    private _inputModeService: InputModeService;
    private _gameStatsService: GameStatsService;
    private _actionService: ActionService;
    private _sceneService: SceneService;
    private _appCycleService: AppCycleService;
    private _boardService: BoardService;
    private _boosterService: BoosterService;
    private _colorService: ColorPaletteService;
    private _tileService: TileService;

    constructor(settings: IGameSettings) {
        console.log('Application created');
        this._settings = settings;

        this._beginGameSignal = new Signal<BeginGameSignal>();
        this._endGameSignal = new Signal<EndGameSignal>();

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
        this._endGameSignal.subscribe(EndGameHandler.handle.bind(this._sceneService));
        this._appCycleService = new AppCycleService(new AppStateStore(), this._beginGameSignal, this._endGameSignal);
    }
}