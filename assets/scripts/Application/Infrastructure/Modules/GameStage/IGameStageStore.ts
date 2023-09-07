import { GameStages } from "./Model/GameStages";

export interface IGameStageStore {
    updateGameStages(gameStages: GameStages): void;
    getGameStages(): GameStages;
}