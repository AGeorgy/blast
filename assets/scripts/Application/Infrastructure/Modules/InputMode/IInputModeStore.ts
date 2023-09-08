import { InputModeRegestry } from "./Model/InputModeRegestry";

export interface IInputModeStore {
    addInputMode(inputMode: InputModeRegestry): void;
    getInputMode(id: string): InputModeRegestry;
    getCurrentInputMode(): InputModeRegestry;
    setCurrentInputMode(id: string): void
}