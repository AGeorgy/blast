import { GameStats } from "./Model/GameStats";

export interface IGameStatsStore {
    addStats(stats: GameStats): void
    updateStats(stats: GameStats): void;
    getStats(): GameStats;
}