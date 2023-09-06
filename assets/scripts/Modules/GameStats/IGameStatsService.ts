export interface IGameStatsService {
    incrementScore(scoreReward: number): void;
    incrementTurn(costTurn: number): void;
}