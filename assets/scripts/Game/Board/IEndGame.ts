export interface IEndGame {
    readonly endGameState: EndGameState;
}

export enum EndGameState {
    None,
    Win,
    Lose
}