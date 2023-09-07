import { AppCycle } from "./AppCycle";
import { IAppCycleService } from "./IAppCycleService";
import { IAppStateStore } from "./IAppStateStore";
import { AppState } from "./Model/AppState";
import { BeginGameEvent } from "./BeginGameEvent";
import { EndGameEvent } from "./EndGameEvent";

export class AppCycleService implements IAppCycleService {
    private _appStateStore: IAppStateStore;
    private _beginGameDispatcher: (event: BeginGameEvent) => void;
    private _endGameDispatcher: (event: EndGameEvent) => void;

    constructor(appStateStore: IAppStateStore,
        beginGameDispatcher: (event: BeginGameEvent) => void, endGameDispatcher: (event: EndGameEvent) => void,) {
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
        this._beginGameDispatcher(new BeginGameEvent());
    }

    endGame(): void {
        console.log("endGame");
        AppCycle.setStateToGameOver(this._appStateStore);
        this._endGameDispatcher(new EndGameEvent());
    }
}