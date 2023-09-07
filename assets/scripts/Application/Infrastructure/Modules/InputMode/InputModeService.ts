import { IInputModeService } from "./IInputModeService";
import { IInputModeStore } from "./IInputModeStore";
import { IInputModeType } from "./Model/IInputModeType";
import { InputMode } from "./Model/InputMode";

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