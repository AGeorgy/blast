import { _decorator, CCString, Component, director, Node } from 'cc';

export class SceneSwitcher implements ISceneSwitcher {
    private readonly _loadingScreenName: string;

    constructor(loadingScreenName: string) {
        this._loadingScreenName = loadingScreenName;
    }

    switchScene(sceneName: string, callback: () => void = () => { }): void {
        director.loadScene(sceneName, (err, scene) => {
            if (err) {
                console.error(err);
                return;
            }
            callback?.();
        });
    }
}