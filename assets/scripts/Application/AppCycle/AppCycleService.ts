import { IAppCycleService } from "../../Modules/AppCycle/IAppCycleService";
import { IAppStateStore } from "../../Modules/AppCycle/IAppStateStore";
import { AppState } from "../../Modules/AppCycle/Model/AppState";
import { StateType } from "../../Modules/AppCycle/Model/StateType";

export class AppCycleService implements IAppCycleService {
    private _store: IAppStateStore;

    constructor(store: IAppStateStore) {
        this._store = store;
    }

    createAppState(): void {
        this._store.addAppState(new AppState());
    }

    setStateToGame(): boolean {
        let appState = this._store.getAppState();

        if (appState.state === StateType.None
            || appState.state === StateType.GameOver) {
            console.log("Game Init");
            appState.setAppState(StateType.Game);
            this._store.updateAppState(appState);
            return true;
        }

        return false;
    }

    setStateToGameOver(): boolean {
        let appState = this._store.getAppState();

        if (appState.state === StateType.Game) {
            console.log("Game Over");
            appState.setAppState(StateType.GameOver);
            this._store.updateAppState(appState);
            return true;
        }

        return false;
    }
}