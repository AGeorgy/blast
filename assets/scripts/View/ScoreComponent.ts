import { _decorator, Component, Label } from 'cc';
// import { Binder } from '../Game/Binder';
// import { IReadStatsAndAddObserver } from '../Game/Board/IReadStatsAndAddObserver';
// import { IObserver } from '../API/IObserver';
const { ccclass, property } = _decorator;

@ccclass('ScoreComponent')
export class ScoreComponent extends Component /* implements IObserver */ {
    @property(Label)
    score: Label = null!;

    // private _stats: IReadStatsAndAddObserver;

    onLoad() {
        if (!this.score) {
            throw new Error('score is null');
        }

        // const binder = Binder.getInstance();
        // this._stats = binder.resolve<IReadStatsAndAddObserver>("IReadStatsAndAddObserver");
        // this._stats.addObserver(this);
    }

    // notified(): void {
    //     this.score.string = this._stats.currentScore.toString();
    // }
}