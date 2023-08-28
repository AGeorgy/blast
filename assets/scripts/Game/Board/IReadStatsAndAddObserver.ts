import { IAddObserver } from "./IAddObserver";
import { IReadStats } from "./IReadStats";

export interface IReadStatsAndAddObserver extends IReadStats, IAddObserver {
}