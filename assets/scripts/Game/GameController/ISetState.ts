export interface ISetState {
    setStateTo(state: GameState): void;
}

export enum GameState {
    None,
    Start,
    Playing,
    Paused,
    GameOver
}
