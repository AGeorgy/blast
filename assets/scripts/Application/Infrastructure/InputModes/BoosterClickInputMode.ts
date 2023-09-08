import { IInputMode } from "../Modules/InputMode/Model/IInputMode";

export class BoosterClickInputMode implements IInputMode {
    private _tileIds: string[];

    constructor() {
        this._tileIds = [];
    }

    get tileIds(): string[] {
        return this._tileIds;
    }

    get rank(): number {
        return 2;
    }

    get isValid(): boolean {
        return this._tileIds.length === 1;
    }

    registerInput(tileId: string): void {
        this._tileIds.push(tileId);
    }
}