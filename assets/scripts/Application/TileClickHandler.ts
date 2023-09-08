import { IActionService } from "./Infrastructure/Modules/Action/IActionService";
import { IInputModeService } from "./Infrastructure/Modules/InputMode/IInputModeService";
import { ITileService } from "./Infrastructure/Modules/Tiles/ITileService";

export class TileClickHandler {
    static handle(tileService: ITileService, inputModeService: IInputModeService, actionService: IActionService, signal: TileClickSignal): void {
        console.log("handle TileClickSignal");

        let tile = tileService.getTileById(signal.tileId);
        inputModeService.trySetCurrentInputMode(tile.inputModeId);
        inputModeService.registerInputInCurrentMode(tile.id);
        let inputMode = inputModeService.getValidInputMode();
        if (!inputMode) {
            return;
        }

        actionService.applyAction(inputMode.actionId, inputMode.tileIds);
    }
}

export class TileClickSignal {
    private _id: string;

    constructor(id: string) {
        this._id = id;
    }

    get tileId(): string {
        return this._id;
    }
}