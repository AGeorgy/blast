import { IGameStatsStore } from "../../Modules/GameStats/IGameStatsStore";
import { GameStats } from "../../Modules/GameStats/Model/GameStats";

export class GameStatsStore implements IGameStatsStore {
    private _stats: GameStats;

    constructor() {
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