import { Color } from "cc";

export interface IGameSettings {
    readonly loadingScreenName: string;
    readonly gameScreenName: string;
    readonly gameOverScreenName: string;
    readonly boardMaxX: number;
    readonly boardMaxY: number;
    readonly tileColors: Color[];
    readonly groupSizeForDefaultAction: number;
    readonly maxShuffleCount: number;
    readonly maxTurns: number;
    readonly targetScore: number;
}