import { InputMode } from "./Model/InputMode";

export interface IInputModeStore {
    addInputMode(inputMode: InputMode): void;
    getInputMode(id: string): InputMode;
}