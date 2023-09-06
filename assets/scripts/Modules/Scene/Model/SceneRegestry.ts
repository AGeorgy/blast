import { SceneType } from "./SceneType";

export class SceneRegestry {
    private _scenes: Map<SceneType, string>;

    constructor() {
        this._scenes = new Map<SceneType, string>();
    }

    getSceneName(sceneType: SceneType): string {
        return this._scenes.get(sceneType);
    }

    addScene(sceneType: SceneType, sceneName: string) {
        this._scenes.set(sceneType, sceneName);
    }
}