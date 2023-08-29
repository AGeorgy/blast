import { IAddObserver } from "../Board/IAddObserver";
import { IIsActionAllowed } from "../Board/IIsActionAllowed";
import { IObserver } from "../Board/IObserver";
import { IStage } from "./IStage";

export class WaitForActionStage implements IStage, IObserver {
    private _observerAdder: IAddObserver;
    private _actionAllower: IIsActionAllowed;

    constructor(observerAdder: IAddObserver, actionAllower: IIsActionAllowed) {
        this._observerAdder = observerAdder;
        this._actionAllower = actionAllower;
    }

    isStarted: boolean;
    isDone: boolean;

    reset(): void {
        this.isStarted = false;
        this.isDone = false;
    }

    execute(): void {
        console.log("WaitForActionStage execute");
        this.isStarted = true;
        this._observerAdder.addObserver(this);
    }

    notified(): void {
        if (this._actionAllower.isActionAllowed) {
            this.isDone = true;
        }
    }
}