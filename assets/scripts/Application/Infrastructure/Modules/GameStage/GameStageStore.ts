import { IGameStageStore } from "./Modules/GameStage/IGameStageStore";
import { GameStages } from "./Modules/GameStage/Model/GameStages";

export class GameStageStore implements IGameStageStore {
    private _gameStages: GameStages;

    updateGameStages(gameStages: GameStages): void {
        this._gameStages = gameStages;
    }
    getGameStages(): GameStages {
        return this._gameStages;
    }
}