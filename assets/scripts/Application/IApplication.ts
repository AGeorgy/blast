import { ISignalSubscribe, ISignalTrigger } from "../Signal/Signal";
import { TileClickSignal } from "./TileClickHandler";
import { BoosterClickSignal } from "./BoosterClickHandler";
import { TilesFilledSignal } from "./FilledBoardHandler";
import { BoardReadySignal } from "./Infrastructure/Modules/Board/FilledBoardSignal";
import { TilesRemovedSignal } from "./SlotsRemovedHandler";
import { TilesMovedSignal } from "./SlotsMovedHandler";

export interface IApplication {
    readonly tileClickSignal: ISignalTrigger<TileClickSignal>;
    readonly boosterClickSignal: ISignalTrigger<BoosterClickSignal>;

    readonly tilesFilledSignal: ISignalSubscribe<TilesFilledSignal>
    readonly boardReadySignal: ISignalSubscribe<BoardReadySignal>
    readonly tilesRemovedSignal: ISignalSubscribe<TilesRemovedSignal>
    readonly tilesMovedSignal: ISignalSubscribe<TilesMovedSignal>
}