import { IInputMode } from "./IInputMode";

export class InputModeRegestry {
    private _id: string;
    private _mode: IInputMode;

    constructor(id: string, mode: IInputMode) {
        this._id = id;
        this._mode = mode;
    }

    get id(): string {
        return this._id;
    }

    get mode(): IInputMode {
        return this._mode;
    }
}