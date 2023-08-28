export interface IReadStats {
    readonly maxTurns: number;
    readonly currentTurns: number;

    readonly targetScore: number;
    readonly currentScore: number;

    readonly maxShuffleCount: number;
    readonly currentShuffleCount: number;
}