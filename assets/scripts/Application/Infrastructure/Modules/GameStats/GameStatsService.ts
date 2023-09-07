import { IGameStatsService } from "./IGameStatsService";
import { IGameStatsStore } from "./IGameStatsStore";

export class GameStatsService implements IGameStatsService {
    private _store: IGameStatsStore;

    constructor(store: IGameStatsStore) {
        this._store = store;
    }

    get canShuffle(): boolean {
        let stats = this._store.getStats();
        return stats.currentShuffle < stats.maxShuffle;
    }

    get ifLost(): boolean {
        let stats = this._store.getStats();
        return stats.currentTurns >= stats.maxTurns
            && stats.currentScore < stats.targetScore;
    }

    get ifWin(): boolean {
        let stats = this._store.getStats();
        return stats.currentScore >= stats.targetScore
            && stats.currentTurns < stats.maxTurns;
    }

    resetStats(): void {
        let stats = this._store.getStats();
        stats.resetCurrentStats();
        this._store.updateStats(stats);
    }

    incrementScore(scoreReward: number): void {
        let stats = this._store.getStats();
        stats.incrementScore(scoreReward);
        this._store.updateStats(stats);
    }

    incrementTurn(costTurn: number): void {
        let stats = this._store.getStats();
        stats.incrementTurns(costTurn);
        this._store.updateStats(stats);
    }

    incrementShuffle(): void {
        let stats = this._store.getStats();
        stats.incrementShuffle();
        this._store.updateStats(stats);
    }
}