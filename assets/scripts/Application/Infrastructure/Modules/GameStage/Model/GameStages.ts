import { IStage } from "./IStage";

export class GameStages {
    private _stages: IStage[] = [];
    private _currentStageIndex: number = 0;
    private _startStagesLength: number = 0;
    private _repeatingStagesLength: number = 0;
    private _isInEndStage: boolean = false;

    get isEnded(): boolean {
        return this._currentStageIndex >= this._stages.length;
    }

    reset(): void {
        this._currentStageIndex = 0;
        this._isInEndStage = false;
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
        if (this._stages.length < 1) {
            return null;
        }
        return this._stages[this._currentStageIndex];
    }

    nextStage(): void {
        let nextStageIndex = this._currentStageIndex + 1;

        if (!this._isInEndStage && nextStageIndex >= this._startStagesLength + this._repeatingStagesLength) {
            nextStageIndex = this._startStagesLength;
        }

        this._currentStageIndex = nextStageIndex;
        console.log("GameStages nextStage", this._currentStageIndex);
    }

    switchToEndStages(): void {
        this._isInEndStage = true;
        this._currentStageIndex = this._startStagesLength + this._repeatingStagesLength;
    }
}