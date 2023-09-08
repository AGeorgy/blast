import { IInputMode } from "../Modules/InputMode/Model/IInputMode";

export class TileClickInputMode implements IInputMode {
    private _tileIds: string[];
    private _actionId: string;

    constructor(actionId: string) {
        this._tileIds = [];
        this._actionId = actionId;
    }

    get tileIds(): string[] {
        return this._tileIds;
    }

    get actionId(): string {
        return this._actionId;
    }

    get rank(): number {
        return 1;
    }

    get isValid(): boolean {
        return this._tileIds.length === 1;
    }

    registerInput(tileId: string): void {
        this._tileIds.push(tileId);
    }
}