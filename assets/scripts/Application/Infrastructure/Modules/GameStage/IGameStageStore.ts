import { GameStages } from "./Model/GameStages";

export interface IGameStageStore {
    addGameStages(GameStages): void;
    updateGameStages(gameStages: GameStages): void;
    getGameStages(): GameStages;
}