import { Color } from "cc";
import { FilledBoardSignal } from "./Infrastructure/Modules/Board/FilledBoardSignal";
import { IColorPaletteService } from "./Infrastructure/Modules/Color/IColorPaletteService";
import { ITileService } from "./Infrastructure/Modules/Tiles/ITileService";
import { ISignalTrigger } from "../Signal/Signal";
import { IBoardService } from "./Infrastructure/Modules/Board/IBoardService";

export class FilledBoardHandler {
    static handle(tileService: ITileService, boardService: IBoardService, colorPaletteService: IColorPaletteService,
        tileInputModeId: string, tileActionId: string,
        tilesFilledDispatcher: ISignalTrigger<TilesFilledSignal>, signal: FilledBoardSignal): void {
        console.log("handle FilledBoardSignal");

        let tilesFilled: { tileId: string, color: Color, x: number, y: number }[] = [];

        signal.slots.forEach(slotId => {
            let color = colorPaletteService.getRandomColor();
            let tileId = crypto.randomUUID();
            let slot = boardService.getSlotById(slotId);
            tileService.createTile(tileId, color.id, slotId, tileInputModeId, tileActionId);
            tilesFilled.push({ tileId: tileId, color: color.color, x: slot.x, y: slot.y });
        });

        tilesFilledDispatcher.trigger(new TilesFilledSignal(tilesFilled));
    }
}

export class TilesFilledSignal {
    private _tilesFilled: { tileId: string, color: Color, x: number, y: number }[];

    constructor(tilesFilled: { tileId: string, color: Color, x: number, y: number }[]) {
        this._tilesFilled = tilesFilled;
    }

    get tilesFilled(): { tileId: string, color: Color, x: number, y: number }[] {
        return this._tilesFilled;
    }
}