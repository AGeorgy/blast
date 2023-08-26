export interface IGameController {
    setState(state: GameState): void;
}

export enum GameState {
    Start,
    Playing,
    Paused,
    GameOver
}
