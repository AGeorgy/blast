import { director } from "cc";
import { ISceneService } from "./ISceneService";
import { ISceneStore } from "./ISceneStore";
import { SceneType } from "./Model/SceneType";
import { SceneRegestry } from "./Model/SceneRegestry";

export class SceneService implements ISceneService {
    private _store: ISceneStore;

    constructor(store: ISceneStore) {
        this._store = store;
    }

    switchSceneToGame(): void {
        this.switchSceneTo(SceneType.Game);
    }

    switchSceneToGameOver(): void {
        this.switchSceneTo(SceneType.GameOver);
    }

    addScene(sceneType: SceneType, sceneName: string): void {
        let scenes = this._store.getScenes();
        scenes.addScene(sceneType, sceneName);
        this._store.updateScenes(scenes);
    }

    switchSceneTo(sceneType: SceneType, callback: () => void = () => { }): void {
        let scenes = this._store.getScenes();

        this.loadScene(SceneType.Loading, scenes, () => {
            this.loadScene(sceneType, scenes, callback);
        });
    }

    private loadScene(sceneType: SceneType, sceneRegestry: SceneRegestry, callback: () => void = () => { }): void {
        const sceneName = sceneRegestry.getSceneName(sceneType);
        director.loadScene(sceneName, (err, scene) => {
            if (err) {
                console.error(err);
                return;
            }
            callback?.();
        });
    }
}