import { IActionPerformer } from "./Board/IActionPerformer";
import { GameState, IGameController } from "./IGameController";
import { IOnEndGameSequence } from "./Stage/IOnEndGameSequence";
import { IStartGameSequence } from "./Stage/IStartGameSequence";

export class GameController implements IGameController {
    private _state: GameState;
    private _sceneSwitcher: ISceneSwitcher;
    private _gameScreenName: string;
    private _boardController: IActionPerformer;
    private _startGameplay: IStartGameSequence;
    private _onEndGameSequence: IOnEndGameSequence;

    constructor(gameScreenName: string, sceneSwitcher: ISceneSwitcher, boardController: IActionPerformer,
        startGameplay: IStartGameSequence, onEndGameSequence: IOnEndGameSequence) {
        this._sceneSwitcher = sceneSwitcher;
        this._gameScreenName = gameScreenName;
        this._boardController = boardController;
        this._startGameplay = startGameplay;
        this._onEndGameSequence = onEndGameSequence;
        this._onEndGameSequence.onEndGameSequence = () => { this.setStateTo(GameState.GameOver); }

        this._state = GameState.Start;
    }

    setStateTo(state: GameState): void {
        switch (state) {
            case GameState.Start:
                break;
            case GameState.Playing:
                if (this._state === GameState.Start) {
                    this._state = state;
                    console.log("Game Start");
                    this._boardController.reset();
                    this._startGameplay.startSequance();

                    // this._sceneSwitcher.switchScene(this._gameScreenName, () => {
                    //     console.log("GameScreen loaded");
                    // });
                }
                break;
            case GameState.Paused:
                break;
            case GameState.GameOver:
                if (this._state === GameState.Playing) {
                    this._state = state;
                    console.log("Game Over");
                }
                break;
        }
    }
}
