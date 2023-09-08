import { FilledBoardSignal } from "./Infrastructure/Modules/Board/FilledBoardSignal";
import { IColorPaletteService } from "./Infrastructure/Modules/Color/IColorPaletteService";
import { ITileService } from "./Infrastructure/Modules/Tiles/ITileService";

export class FilledBoardHandler {
    static handle(tileService: ITileService, colorPaletteService: IColorPaletteService, tileInputModeId: string, tileActionId: string,
        signal: FilledBoardSignal): void {
        console.log("handle FilledBoardSignal");

        signal.slots.forEach(slotId => {
            let color = colorPaletteService.getRandomColor();
            tileService.createTile(crypto.randomUUID(), color.id, slotId, tileInputModeId, tileActionId);
        });
    }
}