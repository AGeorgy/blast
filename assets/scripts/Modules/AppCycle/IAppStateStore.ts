import { AppState } from "./Model/AppState";

export interface IAppStateStore {
    addAppState(appState: AppState): void;
    updateAppState(appState: AppState): void;
    getAppState(): AppState;
}