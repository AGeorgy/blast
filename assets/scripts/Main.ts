import { _decorator, Component, director } from 'cc';
// import { GameController } from './Game/GameController/GameController';
import { GameSettings } from './GameSettings';
// import { IGameController } from './Game/GameController/IGameController';
// import { GameState } from './Game/GameController/ISetState';
import { Application } from './Application/Application';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property(GameSettings)
    gameSettings: GameSettings;

    private _app: Application;

    // private _gameController: IGameController;

    onLoad() {
        console.log("Main onLoad");
        director.addPersistRootNode(this.node);

        this._app = Application.create(this.gameSettings);
        // this._gameController = new GameController(this.gameSettings);
    }

    start() {
        console.log("Main start");
        this._app.beginGame();
        // this._gameController.setStateTo(GameState.Start);
    }

    update() {
        this._app.update();
        // this._gameController.update();
    }
}