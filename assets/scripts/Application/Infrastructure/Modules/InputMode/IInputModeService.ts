import { IInputMode } from "./Model/IInputMode";

export interface IInputModeService {
    getValidInputMode(): IInputMode;
    registerInput(inputModeId: string, tileId: string): void;
    addInputMode(modeType: IInputMode): string
}