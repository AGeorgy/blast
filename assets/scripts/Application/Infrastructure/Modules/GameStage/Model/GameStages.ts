import { IStage } from "./IStage";

export class GameStages {
    private _stages: IStage[] = [];
    private _currentStageIndex: number;
    private _startStagesLength: number;
    private _repeatingStagesLength: number;

    get isEnded(): boolean {
        return this._currentStageIndex >= this._stages.length;
    }

    reset(): void {
        this._currentStageIndex = 0;
    }

    addStartStages(stages: IStage[]) {
        this._stages = this._stages.concat(stages);
        this._startStagesLength = stages.length;
    }

    addEndStages(stages: IStage[]): void {
        this._stages = this._stages.concat(stages);
    }

    addRepeatingStages(stages: IStage[]): void {
        this._stages = this._stages.concat(stages);
        this._repeatingStagesLength = stages.length;
    }

    getStage(): IStage {
        return this._stages[this._currentStageIndex];
    }

    nextStage(): void {
        let nextStageIndex = this._currentStageIndex + 1;

        if (nextStageIndex > this._startStagesLength - 1
            && nextStageIndex < this._startStagesLength + this._repeatingStagesLength) {
            nextStageIndex = nextStageIndex % this._repeatingStagesLength;
        }
    }

    switchToEndStages(): void {
        this._currentStageIndex = this._startStagesLength + this._repeatingStagesLength;
    }
}