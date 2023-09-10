import { ISignalTrigger } from "../Signal/Signal";
import { IBoardService } from "./Infrastructure/Modules/Board/IBoardService";
import { SlotsMovedSignal } from "./Infrastructure/Modules/Board/SlotsMovedSignal";
import { ITileService } from "./Infrastructure/Modules/Tiles/ITileService";

export class SlotsMovedHandler {
    static handle(tileService: ITileService, board: IBoardService, tilesMovedDispatcher: ISignalTrigger<TilesMovedSignal>,
        signal: SlotsMovedSignal): void {
        console.log("handle SlotsMovedHandler");

        let movedTiles = signal.slotIds.map(slotId => {
            let slot = board.getSlotById(slotId);
            let tile = tileService.getTileBySlotId(slotId);
            return { tileId: tile.id, x: slot.x, y: slot.y };
        });

        tilesMovedDispatcher.trigger(new TilesMovedSignal(movedTiles));
    }
}

export class TilesMovedSignal {
    private _data: { tileId: string, x: number, y: number }[];

    constructor(data: { tileId: string, x: number, y: number }[]) {
        this._data = data;
    }

    get data(): { tileId: string, x: number, y: number }[] {
        return this._data;
    }
}