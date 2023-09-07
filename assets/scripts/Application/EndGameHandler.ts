
import { EndGameEvent } from "../../Modules/AppCycle/EndGameEvent";
import { SceneService } from "../Scene/SceneService";


export class EndGameHandler {
    static handle(sceneService: SceneService, event: EndGameEvent): void {
        console.log("handle endGame");
        sceneService.switchSceneToGameOver();
    }
}