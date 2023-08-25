interface IGameController {
    setState(state: GameState): void;
}

enum GameState {
    Start,
    Playing,
    Paused,
    GameOver
}