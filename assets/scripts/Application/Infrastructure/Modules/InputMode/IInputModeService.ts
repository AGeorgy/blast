import { IInputMode } from "./Model/IInputMode";

export interface IInputModeService {
    registerInputInCurrentMode(id: string): void;
    getValidInputMode(): IInputMode;
    trySetCurrentInputMode(inputModeId: string): boolean;
    addInputMode(modeType: IInputMode): string
}