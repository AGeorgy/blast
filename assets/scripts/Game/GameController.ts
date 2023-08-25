class GameController implements IGameController {
    private _state: GameState;
    private _sceneSwitcher: ISceneSwitcher;
    private _gameScreenName: string;

    constructor(gameScreenName: string, sceneSwitcher: ISceneSwitcher) {
        this._sceneSwitcher = sceneSwitcher;
        this._gameScreenName = gameScreenName;

        this._state = GameState.Start;
    }

    setState(state: GameState): void {
        switch (state) {
            case GameState.Start:
                break;
            case GameState.Playing:
                if (this._state === GameState.Start) {
                    this._sceneSwitcher.switchScene(this._gameScreenName, () => {
                        console.log("GameScreen loaded");
                    });
                }
                break;
            case GameState.Paused:
                break;
            case GameState.GameOver:
                break;
        }
    }
}