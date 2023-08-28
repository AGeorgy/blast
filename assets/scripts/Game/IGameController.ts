export interface IGameController {
    // shuffleBoard(): void;
    setStateTo(state: GameState): void;
}

export enum GameState {
    Start,
    Playing,
    Paused,
    GameOver
}
