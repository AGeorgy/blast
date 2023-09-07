import { BeginGameSignal } from "../Modules/AppCycle/BeginGameSignal";
import { IBoardService } from "../Modules/Board/IBoardService";
import { IBoosterService } from "../Modules/Booster/IBoosterService";
import { IGameStatsService } from "../Modules/GameStats/IGameStatsService";
import { ISceneService } from "../Modules/Scene/ISceneService";

export class BeginGameHandler {
    static handle(sceneService: ISceneService, gameStats: IGameStatsService, board: IBoardService,
        boosterService: IBoosterService, signal: BeginGameSignal): void {
        console.log("handle beginGame");
        gameStats.resetStats();
        board.clearBoard();
        boosterService.resetBoosters();
        sceneService.switchSceneToGame();
    }
}