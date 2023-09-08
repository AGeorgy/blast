import { ISignalTrigger } from "../Signal/Signal";
import { TileClickSignal } from "./TileClickHandler";
import { BoosterClickSignal } from "./BoosterClickHandler";

export interface IApplication {
    readonly instance: IApplication;
    tileClickSignal: ISignalTrigger<TileClickSignal>;
    boosterClickSignal: ISignalTrigger<BoosterClickSignal>;
}