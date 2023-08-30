import { _decorator, Component, Node, ProgressBar } from 'cc';
import { IReadStatsAndAddObserver } from '../Game/Board/IReadStatsAndAddObserver';
import { IObserver } from '../Game/Board/IObserver';
import { Binder } from '../Game/Binder';
const { ccclass, property } = _decorator;

@ccclass('ProgressComponent')
export class ProgressComponent extends Component implements IObserver {
    @property(ProgressBar)
    progress: ProgressBar = null!;

    private _stats: IReadStatsAndAddObserver;

    onLoad() {
        if (!this.progress) {
            throw new Error('progress is null');
        }

        const binder = Binder.getInstance();
        this._stats = binder.resolve<IReadStatsAndAddObserver>("IReadStatsAndAddObserver");
        this._stats.addObserver(this);
    }

    notified(): void {
        this.progress.progress = this._stats.currentScore / this._stats.targetScore;
    }
}

