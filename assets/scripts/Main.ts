import { _decorator, CCString, Component, director, Node } from 'cc';
import { SceneSwitcher } from './Game/Scene/SceneSwitcher';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property(CCString)
    loadingScreenName: string;
    @property(CCString)
    gameScreenName: string;

    private _sceneSwitcher: ISceneSwitcher;
    private _gameController: IGameController;

    onLoad() {
        console.log("Main onLoad");
        director.addPersistRootNode(this.node);

        this._sceneSwitcher = new SceneSwitcher(this.loadingScreenName);
        this._gameController = new GameController(this.gameScreenName, this._sceneSwitcher);
    }

    start() {
        console.log("Main start");
        this._gameController.setState(GameState.Playing);
    }
}