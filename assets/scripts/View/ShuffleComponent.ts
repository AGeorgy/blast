import { _decorator, Component, Label } from 'cc';
// import { Binder } from '../Game/Binder';
// import { IReadStatsAndAddObserver } from '../Game/Board/IReadStatsAndAddObserver';
// import { IObserver } from '../API/IObserver';
const { ccclass, property } = _decorator;

@ccclass('ShuffleComponent')
export class ShuffleComponent extends Component /* implements IObserver  */ {
    @property(Label)
    shuffles: Label = null!;

    // private _stats: IReadStatsAndAddObserver;

    onLoad() {
        if (!this.shuffles) {
            throw new Error('shuffles is null');
        }

        // const binder = Binder.getInstance();
        // this._stats = binder.resolve<IReadStatsAndAddObserver>("IReadStatsAndAddObserver");
        // this._stats.addObserver(this);
    }

    // notified(): void {
    //     this.shuffles.string = (this._stats.maxShuffleCount - this._stats.currentShuffleCount).toString();
    // }
}