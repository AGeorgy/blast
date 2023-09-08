import { ApplyActionSignal } from "./Infrastructure/Modules/Action/ApplyActionSignal";
import { IGameStatsService } from "./Infrastructure/Modules/GameStats/IGameStatsService";

export class ApplyActionHandler {
    static handle(gameStatsService: IGameStatsService, signal: ApplyActionSignal): void {
        console.log("handle ApplyActionSignal");
        gameStatsService.incrementTurn(signal.costTurn);
        gameStatsService.incrementScore(signal.scoreReward);
    }
}