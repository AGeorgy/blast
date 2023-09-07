export interface IGameStatsService {
    incrementShuffle(): void;
    canShuffle: boolean;
    ifLost: boolean;
    ifWin: boolean;
    resetStats(): void;
    incrementScore(scoreReward: number): void;
    incrementTurn(costTurn: number): void;
}