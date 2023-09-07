import { EndGameSignal } from "../Modules/AppCycle/EndGameSignal";
import { SceneService } from "./Scene/SceneService";

export class EndGameHandler {
    static handle(sceneService: SceneService, signal: EndGameSignal): void {
        console.log("handle endGame");
        sceneService.switchSceneToGameOver();
    }
}