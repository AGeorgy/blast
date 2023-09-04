import { IAddObserver } from "../API/IAddObserver";
import { IReadStats } from "./IReadStats";

export interface IReadStatsAndAddObserver extends IReadStats, IAddObserver {
}