import { GameStats } from "./Model/GameStats";

export interface IGameStatsStore {
    updateStats(stats: GameStats): void;
    getStats(): GameStats;
}