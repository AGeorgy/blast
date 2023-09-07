import { IStage } from "./IStage";

export class GameStages {
    private _currentStageId: number;
    private _repeatingStages: IStage[] = [];
    private _startStages: IStage[] = [];
    private _endStages: IStage[] = [];

    addStartStages(stages: IStage[]) {
        this._startStages = stages;
    }

    addEndStages(stages: IStage[]): void {
        this._endStages = stages;
    }

    addRepeatingStages(stages: IStage[]): void {
        this._repeatingStages = stages;
    }
}