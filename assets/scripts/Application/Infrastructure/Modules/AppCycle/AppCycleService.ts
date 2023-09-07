import { AppCycle } from "./AppCycle";
import { IAppCycleService } from "./IAppCycleService";
import { IAppStateStore } from "./IAppStateStore";
import { AppState } from "./Model/AppState";
import { BeginGameSignal } from "./BeginGameSignal";
import { EndGameSignal } from "./EndGameSignal";
import { ISignalTrigger } from "../../../../Signal/Signal";

export class AppCycleService implements IAppCycleService {
    private _appStateStore: IAppStateStore;
    private _beginGameDispatcher: ISignalTrigger<BeginGameSignal>;
    private _endGameDispatcher: ISignalTrigger<EndGameSignal>;

    constructor(appStateStore: IAppStateStore,
        beginGameDispatcher: ISignalTrigger<BeginGameSignal>, endGameDispatcher: ISignalTrigger<EndGameSignal>) {
        this._appStateStore = appStateStore;
        this._beginGameDispatcher = beginGameDispatcher;
        this._endGameDispatcher = endGameDispatcher;
    }

    createAppState(): void {
        this._appStateStore.addAppState(new AppState());
    }

    beginGame(): void {
        console.log("beginGame");
        AppCycle.setStateToGame(this._appStateStore);
        this._beginGameDispatcher.trigger(new BeginGameSignal());
    }

    endGame(): void {
        console.log("endGame");
        AppCycle.setStateToGameOver(this._appStateStore);
        this._endGameDispatcher.trigger(new EndGameSignal());
    }
}