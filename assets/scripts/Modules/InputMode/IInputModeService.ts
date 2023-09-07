import { IInputModeType } from "./Model/IInputModeType";

export interface IInputModeService {
    addInputMode(modeType: IInputModeType): string
}