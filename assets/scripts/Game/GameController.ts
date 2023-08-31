import { IActionPerformer } from "./Action/IActionPerformer";
import { IGameController } from "./IGameController";
import { GameState } from "./ISetState";
import { IOnEndGameSequence } from "./Stage/IOnEndGameSequence";
import { IStartGameSequenceAndUpdate } from "./Stage/IStartGameSequenceAndUpdate";

export class GameController implements IGameController {
    private _state: GameState;
    private readonly _sceneSwitcher: ISceneSwitcher;
    private readonly _gameScreenName: string;
    private readonly _actionPerformer: IActionPerformer;
    private readonly _startGameplay: IStartGameSequenceAndUpdate;
    private readonly _onEndGameSequence: IOnEndGameSequence;
    private readonly _gameOverScreenName: string;

    constructor(gameScreenName: string, gameOverScreenName: string, sceneSwitcher: ISceneSwitcher, actionPerformer: IActionPerformer,
        startGameplay: IStartGameSequenceAndUpdate, onEndGameSequence: IOnEndGameSequence) {
        this._sceneSwitcher = sceneSwitcher;
        this._gameScreenName = gameScreenName;
        this._gameOverScreenName = gameOverScreenName;
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
                if (this._state === GameState.Start
                    || this._state === GameState.GameOver) {
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

                    this._sceneSwitcher.switchScene(this._gameOverScreenName, () => {
                        console.log("GameOverScreen loaded");
                    });
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
