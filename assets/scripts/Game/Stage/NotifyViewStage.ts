import { INotifyObservers } from "../Board/INotifyObservers";
import { IStage } from "./IStage";

export class NotifyViewStage implements IStage {
    private _boardNotifier: INotifyObservers;
    private _doneCallback: () => void;

    constructor(boardNotifier: INotifyObservers) {
        this._boardNotifier = boardNotifier;
    }

    setDoneCallback(callback: () => void): void {
        this._doneCallback = callback;
    }

    execute(): void {
        this._boardNotifier.notifyObservers();
        this._doneCallback();
    }
}