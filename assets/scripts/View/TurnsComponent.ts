import { _decorator, Component, Label } from 'cc';
import { Binder } from '../Game/Binder';
import { IReadStatsAndAddObserver } from '../Game/Board/IReadStatsAndAddObserver';
import { IObserver } from '../API/IObserver';
const { ccclass, property } = _decorator;

@ccclass('TurnsComponent')
export class TurnsComponent extends Component implements IObserver {
    @property(Label)
    turns: Label = null!;

    private _stats: IReadStatsAndAddObserver;

    onLoad() {
        if (!this.turns) {
            throw new Error('turns is null');
        }

        const binder = Binder.getInstance();
        this._stats = binder.resolve<IReadStatsAndAddObserver>("IReadStatsAndAddObserver");
        this._stats.addObserver(this);
    }

    notified(): void {
        this.turns.string = (this._stats.maxTurns - this._stats.currentTurns).toString();
    }
}