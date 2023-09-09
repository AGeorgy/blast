import { IAppCycleService } from "./IAppCycleService";
import { IAppStateStore } from "./IAppStateStore";
import { AppState } from "./Model/AppState";
import { BeginGameSignal } from "./BeginGameSignal";
import { EndGameSignal } from "./EndGameSignal";
import { ISignalTrigger } from "../../../../Signal/Signal";
import { StateType } from "./Model/StateType";

export class AppCycleService implements IAppCycleService {
    private _appStateStore: IAppStateStore;
    private _beginGameDispatcher: ISignalTrigger<BeginGameSignal>;
    private _endGameDispatcher: ISignalTrigger<EndGameSignal>;

    constructor(appStateStore: IAppStateStore,
        beginGameDispatcher: ISignalTrigger<BeginGameSignal>, endGameDispatcher: ISignalTrigger<EndGameSignal>) {
        this._appStateStore = appStateStore;
        this._beginGameDispatcher = beginGameDispatcher;
        this._endGameDispatcher = endGameDispatcher;
        this.createAppState();
    }

    get isInGame(): boolean {
        let appState = this._appStateStore.getAppState();
        return appState && appState.state === StateType.Game;
    }

    beginGame(): void {
        console.log("beginGame");
        let appState = this._appStateStore.getAppState();

        if (appState.state === StateType.None
            || appState.state === StateType.GameOver) {
            console.log("Game Init");
            appState.setAppState(StateType.Game);
            this._appStateStore.updateAppState(appState);
        }
        this._beginGameDispatcher.trigger(new BeginGameSignal());
    }

    endGame(): void {
        console.log("endGame");
        let appState = this._appStateStore.getAppState();

        if (appState.state === StateType.Game) {
            console.log("Game Over");
            appState.setAppState(StateType.GameOver);
            this._appStateStore.updateAppState(appState);
        }
        this._endGameDispatcher.trigger(new EndGameSignal());
    }

    private createAppState(): void {
        this._appStateStore.addAppState(new AppState());
    }
}