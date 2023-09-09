import { ISignalSubscribe } from "../../../Signal/Signal";
import { ApplyActionSignal } from "../Modules/Action/ApplyActionSignal";
import { IActionService } from "../Modules/Action/IActionService";
import { IStage } from "../Modules/GameStage/Model/IStage";

export class WaitForActionStage implements IStage {
    private readonly _actionService: IActionService;

    private _isStarted: boolean;
    private _isDone: boolean;
    private _applyActionSubscriber: ISignalSubscribe<ApplyActionSignal>;

    constructor(actionService: IActionService, applyActionSubscriber: ISignalSubscribe<ApplyActionSignal>) {
        this._actionService = actionService;
        this._applyActionSubscriber = applyActionSubscriber;
        this._applyActionSubscriber.subscribe(this.actionApplied.bind(this));
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
    }

    actionApplied(): void {
        this._isDone = true;
    }
}