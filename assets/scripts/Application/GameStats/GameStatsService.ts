import { IGameStatsService } from "../../Modules/GameStats/IGameStatsService";
import { IGameStatsStore } from "../../Modules/GameStats/IGameStatsStore";

export class GameStatsService implements IGameStatsService {
    private _store: IGameStatsStore;

    constructor(store: IGameStatsStore) {
        this._store = store;
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
}