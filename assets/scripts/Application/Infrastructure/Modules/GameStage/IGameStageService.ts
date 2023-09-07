import { IStage } from "./Model/IStage";

export interface IGameStageService {
    resetStages(): void;
    addStartStages(stages: IStage[]): void;
    addRepeatingStages(stages: IStage[]): void;
    addEndStages(stages: IStage[]): void;
    update(): void;
}