import { IActionService } from "./Infrastructure/Modules/Action/IActionService";
import { IBoosterService } from "./Infrastructure/Modules/Booster/IBoosterService";
import { IInputModeService } from "./Infrastructure/Modules/InputMode/IInputModeService";

export class BoosterClickHandler {
    static handle(boosterService: IBoosterService, inputModeService: IInputModeService, actionService: IActionService, signal: BoosterClickSignal) {
        console.log("handle BoosterClickSignal");

        let booster = boosterService.getBoosterById(signal.boosterId);

        if (inputModeService.trySetCurrentInputMode(booster.inputModeId)) {
            actionService.setCurrentActionId(booster.actionId);
        }
    }
}

export class BoosterClickSignal {
    private _id: string;

    constructor(id: string) {
        this._id = id;
    }

    get boosterId(): string {
        return this._id;
    }
}