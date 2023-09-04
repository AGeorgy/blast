import { _decorator, CCInteger, CCString, Component, Label, Node } from 'cc';
import { IAction } from '../../Game/Action/IAction';
import { BonusComponent } from './BonusComponent';
import { Binder } from '../../Game/Binder';
import { IObserver } from '../../Game/Board/IObserver';
import { IAddActionObserverGetCount } from '../../Game/Action/IAddActionObserverGetCount';
import { ActionSuper } from '../../Game/Action/ActionSuper';
import { HoldActionClickInputMode } from '../../Game/InputMode/HoldActionClickInputMode';
import { ISetInputMode } from '../../Game/InputMode/ISetInputMode';
const { ccclass, property } = _decorator;

@ccclass('SuperBoosterComponent')
export class SuperBoosterComponent extends Component implements IObserver {
    @property(CCString)
    boosterName: string = '';
    @property(CCInteger)
    amount: number = 2;
    @property(CCInteger)
    bunchSize: number = 2;
    @property(CCInteger)
    radius: number = 2;
    @property(BonusComponent)
    bonusComponent: BonusComponent = null!;

    private _action: IAction;
    private _actionProvider: IAddActionObserverGetCount;
    private _setInputMode: ISetInputMode;

    onLoad() {
        if (!this.bonusComponent) {
            throw new Error('bonusComponent is null');
        }
        this.bonusComponent.setBoosterName(this.boosterName);
        this.bonusComponent.setCount(this.amount);

        const binder = Binder.getInstance();
        this._actionProvider = binder.resolve<IAddActionObserverGetCount>("ISetAddActionObserverGetCount");
        this._setInputMode = binder.resolve<ISetInputMode>("ISetInputMode");
        this._action = new ActionSuper(this.bunchSize, this.radius);

        this._actionProvider.addAction(this._action, this.amount);
        this._actionProvider.addObserver(this);
    }

    setBooster() {
        this._setInputMode.setMode(new HoldActionClickInputMode(this._action));
    }

    notified(): void {
        this.bonusComponent.setCount(this._actionProvider.getCount(this._action));
    }
}

