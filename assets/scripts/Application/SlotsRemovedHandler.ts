import { ISignalTrigger } from "../Signal/Signal";
import { SlotsRemovedSignal } from "./Infrastructure/Modules/Board/SlotsRemovedSignal";
import { ITileService } from "./Infrastructure/Modules/Tiles/ITileService";

export class SlotsRemovedHandler {
    static handle(tileService: ITileService, tilesRemovedDispatcher: ISignalTrigger<TilesRemovedSignal>, signal: SlotsRemovedSignal): void {
        console.log("handle SlotsRemovedHandler");

        let removedTiles = signal.slotIds.map(slotId => {
            let tile = tileService.getTileBySlotId(slotId);
            return tile.id;
        });

        tilesRemovedDispatcher.trigger(new TilesRemovedSignal(removedTiles));
    }
}

export class TilesRemovedSignal {
    private _tileIds: string[];

    constructor(tileIds: string[]) {
        this._tileIds = tileIds;
    }

    get tileIds(): string[] {
        return this._tileIds;
    }
}