import { IAppCycleService } from "./Infrastructure/Modules/AppCycle/IAppCycleService";
import { EndGameStageSignal } from "./Infrastructure/Modules/GameStage/EndGameStageSignal";

export class EndGameStagesHandler {

    static handle(appCycleService: IAppCycleService, signal: EndGameStageSignal) {
        console.log("handle end Game stages");
        appCycleService.endGame();
    }
}