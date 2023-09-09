import { IGameStatsStore } from "./IGameStatsStore";
import { GameStats } from "./Model/GameStats";

export class GameStatsStore implements IGameStatsStore {
    private _stats: GameStats;

    constructor(maxTurns: number, targetScore: number, maxShuffleCount: number) {
        this._stats = new GameStats(maxTurns, targetScore, maxShuffleCount);
    }

    addStats(stats: GameStats): void {
        this._stats = stats;
    }

    updateStats(stats: GameStats): void {
        this._stats = stats;
    }
    getStats(): GameStats {
        return this._stats;
    }
}