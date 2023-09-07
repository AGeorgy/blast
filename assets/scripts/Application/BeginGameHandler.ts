import { BeginGameEvent } from "../Modules/AppCycle/BeginGameEvent";
import { IBoardService } from "../Modules/Board/IBoardService";
import { IBoosterService } from "../Modules/Booster/IBoosterService";
import { IGameStatsService } from "../Modules/GameStats/IGameStatsService";
import { ISceneService } from "../Modules/Scene/ISceneService";
import { ITileService } from "../Modules/Tiles/ITileService";

export class BeginGameHandler {
    static handle(sceneService: ISceneService, gameStats: IGameStatsService, board: IBoardService,
        boosterService: IBoosterService, tileSrvice: ITileService, event: BeginGameEvent): void {
        console.log("handle beginGame");
        gameStats.resetStats();
        board.resetBoard();
        tileSrvice.resetTiles();
        boosterService.resetBoosters();
        sceneService.switchSceneToGame();
    }
}