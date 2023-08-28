import { IAddObserver } from "../Board/IAddObserver";
import { IIsActionAllowed } from "../Board/IIsActionAllowed";
import { IObserver } from "../Board/IObserver";
import { IStage } from "./IStage";

export class WaitForActionStage implements IStage, IObserver {
    private _doneCallback: () => void;
    private _observerAdder: IAddObserver;
    private _actionAllower: IIsActionAllowed;

    constructor(observerAdder: IAddObserver, actionAllower: IIsActionAllowed) {
        this._observerAdder = observerAdder;
        this._actionAllower = actionAllower;
    }

    setDoneCallback(callback: () => void): void {
        this._doneCallback = callback;
    }

    execute(): void {
        this._observerAdder.addObserver(this);
    }

    notified(): void {
        if (this._actionAllower.isActionAllowed) {
            this._doneCallback();
        }
    }
}