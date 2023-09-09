import { ISceneStore } from "./ISceneStore";
import { SceneRegestry } from "./Model/SceneRegestry";

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