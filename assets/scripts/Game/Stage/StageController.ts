import { IStage } from "./IStage";
import { IStageController } from "./IStageController";

export class StageController implements IStageController {
    private _repeatingStages: IStage[];
    private _currentStage: number;
    private _startStages: IStage[];
    private _endStages: IStage[];

    constructor(startStages: IStage[], repeatingStages: IStage[], endStages: IStage[]) {
        this._startStages = startStages;
        this._repeatingStages = repeatingStages;
        this._endStages = endStages;
        this._currentStage = -1;

        this._startStages.forEach(stage => {
            stage.setDoneCallback(() => {
                this.nextStage();
            });
        });
        this._repeatingStages.forEach(stage => {
            stage.setDoneCallback(() => {
                this.nextStage();
            });
        });

        this._endStages.forEach(stage => {
            stage.setDoneCallback(() => {
                this.nextStage();
            });
        });
    }

    startSequance(): void {
        this.nextStage();
    }

    endSequance(): void {
        this._currentStage = this._startStages.length + this._repeatingStages.length - 1;
        this.nextStage();
    }

    private nextStage() {
        this._currentStage++;
        let index = this._currentStage;

        if (this._currentStage < this._startStages.length + this._repeatingStages.length) {
            index = this._currentStage - this._startStages.length;
            index = index % this._repeatingStages.length;
            this._currentStage = index + this._startStages.length;
        }
        else {
            index = this._currentStage - this._startStages.length - this._repeatingStages.length;
        }

        this._endStages[index].execute();
    }
}