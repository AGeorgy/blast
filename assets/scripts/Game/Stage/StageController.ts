import { IEndGameSequence } from "./IEndGameSequence";
import { IStage } from "./IStage";
import { IStageController } from "./IStageController";

export class StageController implements IStageController, IEndGameSequence {
    private _currentStage: number;
    private _repeatingStages: IStage[];
    private _startStages: IStage[];
    private _endStages: IStage[];

    constructor() {
        this._currentStage = 0;
        this._repeatingStages = [];
        this._startStages = [];
        this._endStages = [];
    }

    addStartStages(stages: IStage[]): void {
        this.addStages(this._startStages, stages, this.nextStartStage);
    }

    addRepeatingStages(stages: IStage[]): void {
        this.addStages(this._repeatingStages, stages, this.nextRepeatingStage);
    }

    addEndStages(stages: IStage[]): void {
        this.addStages(this._endStages, stages, this.nextEndStage);
    }

    startSequance(): void {
        this._currentStage = 0;
        this.nextStartStage();
    }

    endSequance(): void {
        this._currentStage = 0;
        this.nextEndStage();
    }

    private addStages(targetStages: IStage[], stagesToAdd: IStage[], nextStage: () => void) {
        stagesToAdd.forEach(stage => {
            targetStages.push(stage);
            stage.setDoneCallback(() => {
                nextStage();
            });
        });
    }

    private nextStartStage() {
        this.nextStage(this._startStages, () => { this.nextRepeatingStage(); }, () => { this._currentStage++; });
    }

    private nextRepeatingStage() {
        this.nextStage(this._repeatingStages, () => { }, () => { this._currentStage = this._currentStage++ % this._repeatingStages.length; });
    }

    private nextEndStage() {
        this.nextStage(this._endStages, () => { }, () => { this._currentStage++; });
    }

    private nextStage(stages: IStage[], stageAfter: () => void, stageIncrement: () => void) {
        if (this._currentStage < stages.length) {
            stages[this._currentStage].execute();
            stageIncrement();
        }
        else {
            this._currentStage = 0;
            stageAfter();
        }
    }
}