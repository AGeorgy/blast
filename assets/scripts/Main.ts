import { _decorator, CCInteger, CCString, Color, Component, director, Node } from 'cc';
import { SceneSwitcher } from './Game/Scene/SceneSwitcher';
import { IColorPalette } from './Game/Color/IColorPalette';
import { ColorPalette } from './Game/Color/ColorPalette';
import { GameState, IGameController } from './Game/IGameController';
import { GameController } from './Game/GameController';
import { ActionPerformer } from './Game/Action/ActionPerformer';
import { Board } from './Game/Board/Board';
import { BoardStats } from './Game/Board/BoardStats';
import { StageController } from './Game/Stage/StageController';
import { FillingStage } from './Game/Stage/FillingStage';
import { AllowActionStage } from './Game/Stage/AllowActionStage';
import { WaitStage as WaitForTimeStage } from './Game/Stage/WaitForTimeStage';
import { WaitForActionStage } from './Game/Stage/WaitForActionStage';
import { IfWinStage } from './Game/Stage/IfWinStage';
import { ShuffleIfCantContinueStage } from './Game/Stage/ShuffleIfCantContinueStage';
import { Binder } from './Game/Binder';
import { ShiftDownAndFillStage } from './Game/Stage/ShiftDownAndFillStage';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property(CCString)
    loadingScreenName: string;
    @property(CCString)
    gameScreenName: string;
    @property(CCInteger)
    boardMaxX: number = 5;
    @property(CCInteger)
    boardMaxY: number = 5;
    @property([Color])
    tileColors: Color[] = [];
    @property(CCInteger)
    groupSizeForDefaultAction: number = 2;
    @property(CCInteger)
    maxShuffleCount: number = 2;
    @property(CCInteger)
    maxTurns: number = 10;
    @property(CCInteger)
    targetScore: number = 100;

    private _sceneSwitcher: ISceneSwitcher;
    private _gameController: IGameController;
    private _colorPalette: IColorPalette;
    private _board: Board;
    private _actionPerformer: ActionPerformer;
    private _stageController: StageController;

    onLoad() {
        console.log("Main onLoad");
        director.addPersistRootNode(this.node);

        this._colorPalette = new ColorPalette(this.tileColors);
        this._board = new Board(this.boardMaxX, this.boardMaxY, this._colorPalette)
        let boardStats = new BoardStats(this.maxTurns, this.targetScore, this.maxShuffleCount);
        this._actionPerformer = new ActionPerformer(this._board, boardStats, this.groupSizeForDefaultAction);

        this._sceneSwitcher = new SceneSwitcher(this.loadingScreenName);
        this._stageController = new StageController();
        this.addStages(this._stageController, this._actionPerformer, boardStats, this._board);
        this._gameController = new GameController(this.gameScreenName, this._sceneSwitcher, this._actionPerformer, this._stageController, this._stageController);

        Binder.getInstance().addBinding("IReadStatsAndAddObserver", boardStats);
        Binder.getInstance().addBinding("IBoardDataAndAddNotifier", this._board);
        Binder.getInstance().addBinding("ISetAndPerformeAction", this._actionPerformer);

    }

    start() {
        console.log("Main start");
        this._gameController.setStateTo(GameState.Playing);
    }

    update() {
        this._gameController.update();
    }

    private addStages(stageController: StageController, actionPerformer: ActionPerformer, boardStats: BoardStats, board: Board): void {
        let startStages = [
            new WaitForTimeStage(1),
            new AllowActionStage(false, actionPerformer),
            new FillingStage(board),
            new WaitForTimeStage(1),
        ];
        let repeatingStages = [
            new IfWinStage(boardStats, stageController),
            new ShuffleIfCantContinueStage(1, actionPerformer, board, boardStats, stageController),
            new AllowActionStage(true, actionPerformer),
            new WaitForActionStage(actionPerformer, actionPerformer),
            new AllowActionStage(false, actionPerformer),
            new ShiftDownAndFillStage(board, board),
            new WaitForTimeStage(1),
        ];

        stageController.addStartStages(startStages);
        stageController.addRepeatingStages(repeatingStages);
    }
}