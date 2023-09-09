import { IGameStageStore } from "./IGameStageStore";
import { GameStages } from "./Model/GameStages";


export class GameStageStore implements IGameStageStore {
    private _gameStages: GameStages;

    addGameStages(gameStages: GameStages): void {
        this._gameStages = gameStages;
    }

    updateGameStages(gameStages: GameStages): void {
        this._gameStages = gameStages;
    }

    getGameStages(): GameStages {
        return this._gameStages;
    }
}