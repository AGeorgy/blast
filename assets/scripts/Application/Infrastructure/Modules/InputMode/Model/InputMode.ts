import { IInputModeType } from "./IInputModeType";

export class InputMode {
    private _id: string;
    private _mode: IInputModeType;

    constructor(id: string, mode: IInputModeType) {
        this._id = id;
        this._mode = mode;
    }

    get id(): string {
        return this._id;
    }

    get mode(): IInputModeType {
        return this._mode;
    }
}