import { SceneType } from "./Model/SceneType";

export interface ISceneService {
    addScene(sceneType: SceneType, sceneName: string): void;
    switchSceneTo(sceneType: SceneType, callback: () => void): void
    switchSceneToGame(): void;
    switchSceneToGameOver(): void;
}