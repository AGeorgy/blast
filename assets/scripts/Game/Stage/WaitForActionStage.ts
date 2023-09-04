import { IAddObserver } from "../API/IAddObserver";
import { IIsActionAllowed } from "../Action/IIsActionAllowed";
import { IObserver } from "../../API/IObserver";
import { IStage } from "./IStage";

export class WaitForActionStage implements IStage, IObserver {
    private readonly _observerAdder: IAddObserver;
    private readonly _actionAllower: IIsActionAllowed;

    private _isStarted: boolean;
    private _isDone: boolean;

    constructor(observerAdder: IAddObserver, actionAllower: IIsActionAllowed) {
        this._observerAdder = observerAdder;
        this._actionAllower = actionAllower;
    }

    get isStarted(): boolean {
        return this._isStarted;
    }

    get isDone(): boolean {
        return this._isDone;
    }

    reset(): void {
        this._isStarted = false;
        this._isDone = false;
    }

    execute(): void {
        console.log("WaitForActionStage execute");
        this._isStarted = true;
        this._observerAdder.addObserver(this);
    }

    notified(): void {
        if (this._actionAllower.isActionAllowed) {
            this._isDone = true;
        }
    }
}