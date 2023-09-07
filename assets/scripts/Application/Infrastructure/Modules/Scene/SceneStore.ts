import { ISceneStore } from "../Infrastructure/Modules/Scene/ISceneStore";
import { SceneRegestry } from "../Infrastructure/Modules/Scene/Model/SceneRegestry";

export class SceneStore implements ISceneStore {
    private _scenes: SceneRegestry;

    constructor() {
        this._scenes = new SceneRegestry();
    }

    getScenes(): SceneRegestry {
        return this._scenes;
    }

    updateScenes(scenes: SceneRegestry): void {
        this._scenes = scenes;
    }

}