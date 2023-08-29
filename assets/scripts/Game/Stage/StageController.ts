import { IEndGameSequence } from "./IEndGameSequence";
import { IOnEndGameSequence } from "./IOnEndGameSequence";
import { IStage } from "./IStage";
import { IStageController } from "./IStageController";
import { IStartGameSequence } from "./IStartGameSequence";

export class StageController implements IStageController, IEndGameSequence, IStartGameSequence, IOnEndGameSequence {
    private _currentStage: number;
    private _repeatingStages: IStage[] = [];
    private _startStages: IStage[] = [];
    private _endStages: IStage[] = [];

    constructor() {
        this._currentStage = 0;
        this._repeatingStages = [];
        this._startStages = [];
        this._endStages = [];
    }

    public onEndGameSequence: () => void;

    addStartStages(stages: IStage[]): void {
        this.addStages(this._startStages, stages, this.nextStartStage.bind(this));
    }

    addRepeatingStages(stages: IStage[]): void {
        this.addStages(this._repeatingStages, stages, this.nextRepeatingStage.bind(this));
    }

    addEndStages(stages: IStage[]): void {
        this.addStages(this._endStages, stages, this.nextEndStage.bind(this));
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

    private addStages(targetStages: IStage[], stagesToAdd: IStage[], nextStage: () => void): void {
        stagesToAdd.forEach(stage => {
            targetStages.push(stage);
            stage.setDoneCallback(() => {
                nextStage();
            });
        });
    }

    private nextStartStage(): void {
        this.nextStage(this._startStages, this.nextRepeatingStage.bind(this), () => { this._currentStage++; });
    }

    private nextRepeatingStage(): void {
        this.nextStage(this._repeatingStages, this.nextEndStage.bind(this), () => { this._currentStage = this._currentStage++ % this._repeatingStages.length; });
    }

    private nextEndStage(): void {
        this.nextStage(this._endStages, this.onEndGameSequence.bind(this), () => { this._currentStage++; });
    }

    private nextStage(stages: IStage[], stageAfter: () => void, stageIncrement: () => void): void {
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