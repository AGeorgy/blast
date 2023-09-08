import { IActionService } from "./Infrastructure/Modules/Action/IActionService";
import { IInputModeService } from "./Infrastructure/Modules/InputMode/IInputModeService";
import { ITileService } from "./Infrastructure/Modules/Tiles/ITileService";

export class TileClickHandler {
    static handle(tileService: ITileService, inputModeService: IInputModeService, actionService: IActionService, signal: TileClickSignal): void {
        console.log("handle TileClickSignal");

        let tile = tileService.getTileById(signal.tileId);
        if (inputModeService.trySetCurrentInputMode(tile.inputModeId)) {
            actionService.setCurrentActionId(tile.actionId);
        }

        inputModeService.registerInputInCurrentMode(tile.id);
        let inputMode = inputModeService.getValidInputMode();
        if (!inputMode) {
            return;
        }

        actionService.applyAction(actionService.getCurrentActionId(), inputMode.tileIds);
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