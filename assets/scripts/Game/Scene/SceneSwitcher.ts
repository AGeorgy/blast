import { _decorator, CCString, Component, director, Node } from 'cc';

export class SceneSwitcher implements ISceneSwitcher {
    loadingScreenName: string;

    constructor(loadingScreenName: string) {
        this.loadingScreenName = loadingScreenName;
    }

    switchScene(sceneName: string, callback?: () => void): void {
        director.loadScene(sceneName, (err, scene) => {
            if (err) {
                console.error(err);
                return;
            }
            if (callback) {
                callback();
            }
        });
    }
}