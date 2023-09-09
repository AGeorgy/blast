import { IInputMode } from "../Modules/InputMode/Model/IInputMode";

export class BoosterDoubleClickInputMode implements IInputMode {
    private _tileIds: string[];

    constructor() {
        this._tileIds = [];
    }

    get tileIds(): string[] {
        let tileIds = this._tileIds;
        this._tileIds = [];
        return tileIds;
    }

    get rank(): number {
        return 2;
    }

    get isValid(): boolean {
        return this._tileIds.length >= 2;
    }

    registerInput(tileId: string): void {
        this._tileIds.push(tileId);
    }
}