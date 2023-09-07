import { IInputModeService } from "../../Modules/InputMode/IInputModeService";
import { IInputModeStore } from "../../Modules/InputMode/IInputModeStore";
import { IInputModeType } from "../../Modules/InputMode/Model/IInputModeType";
import { InputMode } from "../../Modules/InputMode/Model/InputMode";

export class InputModeService implements IInputModeService {
    private _inputModeStore: IInputModeStore;

    constructor(inputModeStore: IInputModeStore) {
        this._inputModeStore = inputModeStore;
    }

    addInputMode(modeType: IInputModeType): string {
        let id = crypto.randomUUID();
        this._inputModeStore.addInputMode(new InputMode(id, modeType));
        return id;
    }
}