import { IEndGameSequence } from "./IEndGameSequence";
import { IOnEndGameSequence } from "./IOnEndGameSequence";
import { IStage } from "./IStage";
import { IStageController } from "./IStageController";
import { IStartGameSequenceAndUpdate } from "./IStartGameSequenceAndUpdate";

export class StageController implements IStageController, IEndGameSequence, IStartGameSequenceAndUpdate, IOnEndGameSequence {
    private _currentStageIndex: number;
    private _repeatingStages: IStage[] = [];
    private _startStages: IStage[] = [];
    private _endStages: IStage[] = [];

    private _currentStages: IStage[];
    private _stageType: StageType;
    private _sequenceEnded: boolean;

    constructor() {
        this._stageType = StageType.None;
        this._sequenceEnded = false;
        this._currentStageIndex = 0;
        this._currentStages = this._startStages = [];
    }

    public onEndGameSequence: () => void;

    get isStarted(): boolean {
        return this._stageType != StageType.None;
    }

    update(): void {
        if (this._sequenceEnded) {
            return;
        }

        console.log("StageController update");
        let currentStages = this.getStages(this._stageType);
        if (this._currentStageIndex < currentStages.length) {
            let currentStage = this._currentStages[this._currentStageIndex];

            if (currentStage.isDone) {
                this.increaseStageCounter();
            }
            else if (currentStage.isStarted) {
                return;
            }
            else {
                currentStage.execute();
            }
        }
        else {
            this._currentStageIndex = 0;
            switch (this._stageType) {
                case StageType.Start:
                    this._stageType = StageType.Repeating;
                    break;
                case StageType.Repeating:
                    this._stageType = StageType.End;
                    break;
                case StageType.End:
                    this._sequenceEnded = true;
                    this.onEndGameSequence();
                    break;
            }
        }
    }

    private getStages(stageType: StageType): IStage[] {
        switch (stageType) {
            case StageType.Start:
                return this._startStages;
            case StageType.Repeating:
                return this._repeatingStages;
            case StageType.End:
                return this._endStages;
        }
    }

    addStartStages(stages: IStage[]): void {
        this._startStages = stages;
    }

    addRepeatingStages(stages: IStage[]): void {
        this._repeatingStages = stages;
    }

    addEndStages(stages: IStage[]): void {
        this._endStages = stages;
    }

    startSequance(): void {
        console.log("Start Sequance");
        this._currentStageIndex = 0;
        this._stageType = StageType.Start;
    }

    endSequance(): void {
        console.log("End Sequance");
        this._currentStageIndex = 0;
        this._stageType = StageType.End;
    }

    private increaseStageCounter(): void {
        if (this._stageType == StageType.Repeating) {
            this._currentStageIndex = (this._currentStageIndex + 1) % this._repeatingStages.length;
        }
        else {
            this._currentStageIndex++;
        }
    }
}

enum StageType {
    None,
    Start,
    Repeating,
    End
}