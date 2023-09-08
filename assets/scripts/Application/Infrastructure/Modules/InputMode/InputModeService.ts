import { IInputModeService } from "./IInputModeService";
import { IInputModeStore } from "./IInputModeStore";
import { IInputMode } from "./Model/IInputMode";
import { InputModeRegestry } from "./Model/InputModeRegestry";

export class InputModeService implements IInputModeService {
    private _inputModeStore: IInputModeStore;

    constructor(inputModeStore: IInputModeStore) {
        this._inputModeStore = inputModeStore;
    }

    getValidInputMode(): IInputMode {
        let currentInputMode = this._inputModeStore.getCurrentInputMode();
        if (!currentInputMode || !currentInputMode.mode.isValid) {
            return null;
        }

        return currentInputMode.mode;
    }

    trySetCurrentInputMode(inputModeId: string): boolean {
        let currentInputMode = this._inputModeStore.getCurrentInputMode();
        let newInputMode = this._inputModeStore.getInputMode(inputModeId);
        if (!currentInputMode || currentInputMode.mode.rank <= newInputMode.mode.rank) {
            this._inputModeStore.setCurrentInputMode(inputModeId);
            return true;
        }

        return false;
    }

    registerInputInCurrentMode(tileId: string): void {
        let currentInputMode = this._inputModeStore.getCurrentInputMode();
        if (!currentInputMode) {
            currentInputMode.mode.registerInput(tileId);
        }
    }

    addInputMode(modeType: IInputMode): string {
        let id = crypto.randomUUID();
        this._inputModeStore.addInputMode(new InputModeRegestry(id, modeType));
        return id;
    }
}