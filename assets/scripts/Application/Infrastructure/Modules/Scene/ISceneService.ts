import { SceneType } from "./Model/SceneType";

export interface ISceneService {
    addScene(sceneType: SceneType, sceneName: string): void;
    switchSceneToGame(): void;
    switchSceneToGameOver(): void;
}