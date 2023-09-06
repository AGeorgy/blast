export interface IGameStatsService {
    resetStats(): void;
    incrementScore(scoreReward: number): void;
    incrementTurn(costTurn: number): void;
}