import { IInputModeStore } from "../../Modules/InputMode/IInputModeStore";
import { InputMode } from "../../Modules/InputMode/Model/InputMode";

export class InputModeStore implements IInputModeStore {
    private _inputModes: Map<string, InputMode>;

    constructor() {
        this._inputModes = new Map<string, InputMode>();
    }

    addInputMode(inputMode: InputMode): void {
        this._inputModes.set(inputMode.id, inputMode);
    }
    getInputMode(id: string): InputMode {
        if (this._inputModes.has(id)) {
            return this._inputModes.get(id);
        }
        return null;
    }

}