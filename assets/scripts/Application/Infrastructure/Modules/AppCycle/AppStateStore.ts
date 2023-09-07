import { IAppStateStore } from "./IAppStateStore";
import { AppState } from "./Model/AppState";

export class AppStateStore implements IAppStateStore {
    private _appState: AppState;

    constructor() {
        this._appState = null;
    }

    addAppState(appState: AppState): void {
        this._appState = appState;
    }

    updateAppState(appState: AppState): void {
        this._appState = appState;
    }

    getAppState(): AppState {
        return this._appState;
    }

}