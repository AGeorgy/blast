import { IEndGameSequence } from "./IEndGameSequence";
import { IOnEndGameSequence } from "./IOnEndGameSequence";
import { IStage } from "./IStage";
import { IStageController } from "./IStageController";
import { IStartGameSequence } from "./IStartGameSequence";

export class StageController implements IStageController, IEndGameSequence, IStartGameSequence, IOnEndGameSequence {
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

    public onEndGameSequence: () => void;

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
        console.log("Start Sequance");
        this._currentStage = 0;
        this.nextStartStage();
    }

    endSequance(): void {
        console.log("End Sequance");
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
        this.nextStage(this._repeatingStages, () => { this.nextEndStage(); }, () => { this._currentStage = this._currentStage++ % this._repeatingStages.length; });
    }

    private nextEndStage() {
        this.nextStage(this._endStages, () => { this.onEndGameSequence() }, () => { this._currentStage++; });
    }

    private nextStage(stages: IStage[], stageAfter: () => void, stageIncrement: () => void) {
        console.log("StageController nextStage");
        if (this._currentStage < stages.length) {
            console.log("StageController nextStage execute: " + this._currentStage + " of " + stages.length + " stages");
            stages[this._currentStage].execute();
            stageIncrement();
        }
        else {
            console.log("StageController nextStage done");
            this._currentStage = 0;
            stageAfter();
        }
    }
}