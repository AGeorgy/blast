export interface ISetState {
    setStateTo(state: GameState): void;
}

export enum GameState {
    Start,
    Playing,
    Paused,
    GameOver
}
