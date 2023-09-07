import { IInputModeStore } from "../../Modules/InputMode/IInputModeStore";
import { InputMode } from "../../Modules/InputMode/Model/InputMode";

export class InputModeStore implements IInputModeStore {
    private _currentInputModeId: string;
    private _inputModes: Map<string, InputMode>;

    constructor() {
        this._currentInputModeId = null;
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

    getCurrentInputMode(): InputMode {
        if (this._currentInputModeId) {
            return this.getInputMode(this._currentInputModeId);
        }
        return null;
    }

    setCurrentInputMode(id: string): void {
        if (this._inputModes.has(id)) {
            this._currentInputModeId = id;
        }
    }
}