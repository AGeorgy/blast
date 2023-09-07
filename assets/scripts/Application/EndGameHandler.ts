import { EndGameSignal } from "./Infrastructure/Modules/AppCycle/EndGameSignal";
import { SceneService } from "./Infrastructure/SceneService";

export class EndGameHandler {
    static handle(sceneService: SceneService, signal: EndGameSignal): void {
        console.log("handle endGame");
        sceneService.switchSceneToGameOver();
    }
}