import { _decorator, CCInteger, CCString, Color, Component, director, Node } from 'cc';
import { SceneSwitcher } from './Game/Scene/SceneSwitcher';
import { IColorPalette } from './Game/Color/IColorPalette';
import { ColorPalette } from './Game/Color/ColorPalette';
import { GameState, IGameController } from './Game/IGameController';
import { GameController } from './Game/GameController';
import { IBoardController } from './Game/Board/IBoardController';
import { BoardController } from './Game/Board/BoardController';
import { Board } from './Game/Board/Board';
import { IBoard } from './Game/Board/IBoard';
import { BoardModel } from './Game/Board/BoardModel';
import { IStageController } from './Game/Stage/IStageController';
import { StageController } from './Game/Stage/StageController';
import { FillingStage } from './Game/Stage/FillingStage';
import { AllowActionStage } from './Game/Stage/AllowActionStage';
import { WaitStage } from './Game/Stage/WaitStage';
import { NotifyViewStage } from './Game/Stage/NotifyViewStage';
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
    private _board: IBoard;
    private _boardController: BoardController;
    private _stageController: IStageController;

    onLoad() {
        console.log("Main onLoad");
        director.addPersistRootNode(this.node);

        this._colorPalette = new ColorPalette(this.tileColors);
        this._board = new Board(this.boardMaxX, this.boardMaxY, this._colorPalette)
        let boardModel = new BoardModel(this.maxTurns, this.targetScore, this.maxShuffleCount);
        this._boardController = new BoardController(this._board, boardModel, this.groupSizeForDefaultAction);

        this._sceneSwitcher = new SceneSwitcher(this.loadingScreenName);
        this._stageController = this.getStageController(this._boardController);
        this._gameController = new GameController(this.gameScreenName, this._sceneSwitcher, this._boardController);
    }

    start() {
        console.log("Main start");
        this._gameController.setStateTo(GameState.Playing);

        // this._gameController.shuffleBoard();
    }

    private getStageController(boardController: BoardController): IStageController {
        let startStages = [
            new AllowActionStage(false, boardController),
            new FillingStage(boardController),
            new NotifyViewStage(boardController),
            new WaitStage(1),
            new AllowActionStage(true, boardController),
        ];
        return new StageController(startStages, [], []);
    }
}