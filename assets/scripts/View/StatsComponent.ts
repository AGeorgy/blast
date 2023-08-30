import { _decorator, Component, Label, Node } from 'cc';
import { Binder } from '../Game/Binder';
import { IReadStatsAndAddObserver } from '../Game/Board/IReadStatsAndAddObserver';
import { IObserver } from '../Game/Board/IObserver';
const { ccclass, property } = _decorator;

@ccclass('StatsComponent')
export class StatsComponent extends Component implements IObserver {
    @property(Label)
    turns: Label = null!;
    @property(Label)
    score: Label = null!;

    private _stats: IReadStatsAndAddObserver;

    onLoad() {
        if (!this.turns) {
            throw new Error('turns is null');
        }
        if (!this.score) {
            throw new Error('score is null');
        }

        const binder = Binder.getInstance();
        this._stats = binder.resolve<IReadStatsAndAddObserver>("IReadStatsAndAddObserver");
        this._stats.addObserver(this);
    }

    notified(): void {
        this.turns.string = (this._stats.maxTurns - this._stats.currentTurns).toString();
        this.score.string = this._stats.currentScore.toString();
    }
}

