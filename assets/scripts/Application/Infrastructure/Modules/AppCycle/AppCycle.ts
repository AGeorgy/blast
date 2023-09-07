import { IAppStateStore } from "./IAppStateStore";
import { StateType } from "./Model/StateType";

export class AppCycle {
    static setStateToGame(store: IAppStateStore): void {
        let appState = store.getAppState();

        if (appState.state === StateType.None
            || appState.state === StateType.GameOver) {
            console.log("Game Init");
            appState.setAppState(StateType.Game);
            store.updateAppState(appState);
        }
    }

    static setStateToGameOver(store: IAppStateStore): void {
        let appState = store.getAppState();

        if (appState.state === StateType.Game) {
            console.log("Game Over");
            appState.setAppState(StateType.GameOver);
            store.updateAppState(appState);
        }
    }
}