import { IGameSettings } from "../../IGameSettings";
import { ActionPerformer } from "../Action/ActionPerformer";
import { Binder } from "../Binder";
import { Board } from "../Board/Board";
import { BoardStats } from "../Board/BoardStats";
import { ColorPalette } from "../Color/ColorPalette";
import { IGameController } from "./IGameController";
import { GameState } from "./ISetState";
import { SceneSwitcher } from "../Scene/SceneSwitcher";
import { AllowActionStage } from "../Stage/AllowActionStage";
import { FillingStage } from "../Stage/FillingStage";
import { IfLostStage } from "../Stage/IfLostStage";
import { IfWinStage } from "../Stage/IfWinStage";
import { ShiftDownAndFillStage } from "../Stage/ShiftDownAndFillStage";
import { ShuffleIfCantContinueStage } from "../Stage/ShuffleIfCantContinueStage";
import { StageController } from "../Stage/StageController";
import { WaitForActionStage } from "../Stage/WaitForActionStage";
import { WaitForTimeStage } from "../Stage/WaitForTimeStage";

export class GameController implements IGameController {
    private _state: GameState;
    private _settings: IGameSettings;
    private _colorPalette: ColorPalette;
    private _board: Board;
    private _boardStats: BoardStats;
    private _actionPerformer: ActionPerformer;
    private _sceneSwitcher: SceneSwitcher;
    private _stageController: StageController;

    constructor(settings: IGameSettings) {
        this._settings = settings;
        this._state = GameState.None;
    }

    setStateTo(state: GameState): void {
        switch (state) {
            case GameState.Start:
                if (this._state === GameState.None
                    || this._state === GameState.GameOver) {
                    console.log("Game Init");
                    this._state = state;
                    this.init();
                    this.setStateTo(GameState.Playing);
                }
                break;
            case GameState.Playing:
                if (this._state === GameState.Start) {
                    this._state = state;
                    console.log("Game Start");

                    this._sceneSwitcher.switchScene(this._settings.gameScreenName, () => {
                        console.log("GameScreen loaded");
                        this._stageController.startSequance();
                    });
                }
                break;
            case GameState.Paused:
                break;
            case GameState.GameOver:
                if (this._state === GameState.Playing) {
                    this._state = state;
                    console.log("Game Over");

                    this._sceneSwitcher.switchScene(this._settings.gameOverScreenName, () => {
                        console.log("GameOverScreen loaded");
                    });
                }
                break;
        }
    }

    update(): void {
        if (this._state === GameState.Playing && this._stageController.isStarted) {
            this._stageController.update();
        }
    }

    private init(): void {
        this.clear();

        this._colorPalette = new ColorPalette(this._settings.tileColors);
        this._board = new Board(this._settings.boardMaxX, this._settings.boardMaxY, this._colorPalette)
        this._boardStats = new BoardStats(this._settings.maxTurns, this._settings.targetScore, this._settings.maxShuffleCount);
        this._actionPerformer = new ActionPerformer(this._board, this._boardStats, this._settings.groupSizeForDefaultAction);

        this._sceneSwitcher = new SceneSwitcher(this._settings.loadingScreenName);
        this._stageController = new StageController();
        this._stageController.onEndGameSequence = () => { this.setStateTo(GameState.GameOver); }

        this.addStages();
        this.makeBindings();
    }

    private clear(): void {
        // On second reloading of the game, ewrything is already inited
        // and 'new ()' doesn't work. It seems that typescript works this way.
        // So we need to clear it first
        this._colorPalette = null;
        this._colorPalette = null;
        this._board = null;
        this._boardStats = null;
        this._actionPerformer = null;
        this._sceneSwitcher = null;
        this._stageController = null;
        Binder.getInstance().clear();
    }

    private makeBindings(): void {
        Binder.getInstance().addBinding("IReadStatsAndAddObserver", this._boardStats);
        Binder.getInstance().addBinding("IEndGame", this._boardStats);

        Binder.getInstance().addBinding("IBoardDataAndAddNotifier", this._board);

        Binder.getInstance().addBinding("ISetAndPerformeAction", this._actionPerformer);
        Binder.getInstance().addBinding("ISetAction", this._actionPerformer);
        Binder.getInstance().addBinding("ISetAddActionObserverGetCount", this._actionPerformer);

        Binder.getInstance().addBinding("ISetState", this);
    }


    private addStages(): void {
        let startStages = [
            new WaitForTimeStage(1),
            new AllowActionStage(false, this._actionPerformer),
            new FillingStage(this._board),
            new WaitForTimeStage(1),
        ];
        let repeatingStages = [
            new IfWinStage(this._boardStats, this._stageController),
            new IfLostStage(this._boardStats, this._stageController),
            new ShuffleIfCantContinueStage(1, this._actionPerformer, this._board, this._boardStats, this._stageController),
            new AllowActionStage(true, this._actionPerformer),
            new WaitForActionStage(this._actionPerformer, this._actionPerformer),
            new AllowActionStage(false, this._actionPerformer),
            new ShiftDownAndFillStage(this._board, this._board),
            new WaitForTimeStage(1),
        ];

        this._stageController.addStartStages(startStages);
        this._stageController.addRepeatingStages(repeatingStages);
    }
}
