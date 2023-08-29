export interface IGameController {
    update(): unknown;
    setStateTo(state: GameState): void;
}

export enum GameState {
    Start,
    Playing,
    Paused,
    GameOver
}
