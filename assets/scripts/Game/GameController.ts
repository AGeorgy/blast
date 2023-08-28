import { IActionPerformer } from "./Board/IActionPerformer";
import { GameState, IGameController } from "./IGameController";

export class GameController implements IGameController {
    private _state: GameState;
    private _sceneSwitcher: ISceneSwitcher;
    private _gameScreenName: string;
    private _boardController: IActionPerformer;

    constructor(gameScreenName: string, sceneSwitcher: ISceneSwitcher, boardController: IActionPerformer) {
        this._sceneSwitcher = sceneSwitcher;
        this._gameScreenName = gameScreenName;
        this._boardController = boardController;

        this._state = GameState.Start;
    }

    // shuffleBoard(): void {
    //     this._boardController.shuffle();
    // }

    setStateTo(state: GameState): void {
        switch (state) {
            case GameState.Start:
                break;
            case GameState.Playing:
                if (this._state === GameState.Start) {
                    this._state = state;
                    this._boardController.reset();

                    // this._sceneSwitcher.switchScene(this._gameScreenName, () => {
                    //     console.log("GameScreen loaded");
                    // });
                }
                break;
            case GameState.Paused:
                break;
            case GameState.GameOver:
                break;
        }
    }
}
