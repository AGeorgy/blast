import { IStage } from "./IStage";

export interface IStageController {
    addStartStages(stages: IStage[]): void;
    addRepeatingStages(stages: IStage[]): void;
    addEndStages(stages: IStage[]): void;
    startSequance(): void;
}