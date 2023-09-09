import { ISignalSubscribe, ISignalTrigger } from "../Signal/Signal";
import { TileClickSignal } from "./TileClickHandler";
import { BoosterClickSignal } from "./BoosterClickHandler";
import { TilesFilledSignal } from "./FilledBoardHandler";
import { BoardReadySignal } from "./Infrastructure/Modules/Board/FilledBoardSignal";
import { TilesRemovedSignal } from "./SlotsRemovedHandler";

export interface IApplication {
    tileClickSignal: ISignalTrigger<TileClickSignal>;
    boosterClickSignal: ISignalTrigger<BoosterClickSignal>;

    tilesFilledSignal: ISignalSubscribe<TilesFilledSignal>
    boardReadySignal: ISignalSubscribe<BoardReadySignal>
    tilesRemovedSignal: ISignalSubscribe<TilesRemovedSignal>
}