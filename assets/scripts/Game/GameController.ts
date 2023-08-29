import { IActionPerformer } from "./Board/IActionPerformer";
import { GameState, IGameController } from "./IGameController";
import { IOnEndGameSequence } from "./Stage/IOnEndGameSequence";
import { IStartGameSequenceAndUpdate } from "./Stage/IStartGameSequenceAndUpdate";

export class GameController implements IGameController {
    private _state: GameState;
    private _sceneSwitcher: ISceneSwitcher;
    private _gameScreenName: string;
    private _actionPerformer: IActionPerformer;
    private _startGameplay: IStartGameSequenceAndUpdate;
    private _onEndGameSequence: IOnEndGameSequence;

    constructor(gameScreenName: string, sceneSwitcher: ISceneSwitcher, actionPerformer: IActionPerformer,
        startGameplay: IStartGameSequenceAndUpdate, onEndGameSequence: IOnEndGameSequence) {
        this._sceneSwitcher = sceneSwitcher;
        this._gameScreenName = gameScreenName;
        this._actionPerformer = actionPerformer;
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
                    this._actionPerformer.reset();

                    this._sceneSwitcher.switchScene(this._gameScreenName, () => {
                        console.log("GameScreen loaded");
                        this._startGameplay.startSequance();
                    });
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

    update(): void {
        if (this._state === GameState.Playing && this._startGameplay.isStarted) {
            this._startGameplay.update();
        }
    }
}
