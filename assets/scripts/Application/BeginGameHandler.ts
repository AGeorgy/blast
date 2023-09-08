import { BeginGameSignal } from "./Infrastructure/Modules/AppCycle/BeginGameSignal";
import { IBoardService } from "./Infrastructure/Modules/Board/IBoardService";
import { IBoosterService } from "./Infrastructure/Modules/Booster/IBoosterService";
import { IGameStatsService } from "./Infrastructure/Modules/GameStats/IGameStatsService";
import { ISceneService } from "./Infrastructure/Modules/Scene/ISceneService";
import { ITileService } from "./Infrastructure/Modules/Tiles/ITileService";

export class BeginGameHandler {
    static handle(sceneService: ISceneService, gameStats: IGameStatsService, board: IBoardService,
        boosterService: IBoosterService, tileService: ITileService, signal: BeginGameSignal): void {
        console.log("handle beginGame");
        gameStats.resetStats();
        board.clearBoard();
        tileService.clearTiles();
        boosterService.resetBoosters();
        sceneService.switchSceneToGame();
    }
}