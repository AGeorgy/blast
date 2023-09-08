import { IInputModeStore } from "./IInputModeStore";
import { IInputMode } from "./Model/IInputMode";
import { InputModeRegestry } from "./Model/InputModeRegestry";


export class InputModeStore implements IInputModeStore {
    private _currentInputModeId: string;
    private _inputModes: Map<string, InputModeRegestry>;

    constructor() {
        this._currentInputModeId = null;
        this._inputModes = new Map<string, InputModeRegestry>();
    }

    addInputMode(inputMode: InputModeRegestry): void {
        this._inputModes.set(inputMode.id, inputMode);
    }

    getInputMode(id: string): InputModeRegestry {
        if (this._inputModes.has(id)) {
            return this._inputModes.get(id);
        }
        return null;
    }

    getCurrentInputMode(): InputModeRegestry {
        if (this._currentInputModeId) {
            return this.getInputMode(this._currentInputModeId);
        }
        return null;
    }

    setCurrentInputMode(id: string): void {
        this._currentInputModeId = id;
    }
}