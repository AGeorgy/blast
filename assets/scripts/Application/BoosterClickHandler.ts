import { IBoosterService } from "./Infrastructure/Modules/Booster/IBoosterService";
import { IInputModeService } from "./Infrastructure/Modules/InputMode/IInputModeService";

export class BoosterClickHandler {
    static handle(boosterService: IBoosterService, inputModeService: IInputModeService, signal: BoosterClickSignal) {
        console.log("handle BoosterClickSignal");

        let booster = boosterService.getBoosterById(signal.boosterId);

        inputModeService.trySetCurrentInputMode(booster.inputModeId);
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