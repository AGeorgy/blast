import { SceneRegestry } from "./Model/SceneRegestry";

export interface ISceneStore {
    getScenes(): SceneRegestry;
    updateScenes(scenes: SceneRegestry): void;
}