import { IActionService } from "../Modules/Action/IActionService";
import { IStage } from "../Modules/GameStage/Model/IStage";

export class AllowActionStage implements IStage {
    private readonly _actionService: IActionService;
    private readonly _isAllow: boolean;
    private _isStarted: boolean = false;
    private _isDone: boolean = false;

    constructor(isAllow: boolean, actionService: IActionService) {
        this._isAllow = isAllow;
        this._actionService = actionService;
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
        this._isStarted = true;
        console.log("AllowActionStage execute");
        this._actionService.allowActionAppliance(this._isAllow);
        this._isDone = true;
    }
}