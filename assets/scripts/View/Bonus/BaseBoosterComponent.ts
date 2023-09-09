import { _decorator, CCInteger, CCString, Component } from 'cc';
import { IAction } from '../../Game/Action/IAction';
import { BonusComponent } from './BonusComponent';
import { Binder } from '../../Game/Binder';
// import { IObserver } from '../../API/IObserver';
// import { IAddActionObserverGetCount } from '../../Game/Action/IAddActionObserverGetCount';
// import { ISetInputMode } from '../../Game/InputMode/ISetInputMode';
// import { IInputMode } from '../../Game/InputMode/IInputMode';
const { property } = _decorator;

export class BaseBoosterComponent extends Component /* implements IObserver */ {
    @property(CCString)
    boosterName: string = '';
    @property(CCInteger)
    amount: number = 2;
    @property(BonusComponent)
    bonusComponent: BonusComponent = null!;

    protected _action: IAction;
    // private _setInputMode: ISetInputMode;
    // private _actionProvider: IAddActionObserverGetCount;

    onLoad() {
        if (!this.bonusComponent) {
            throw new Error('bonusComponent is null');
        }
        this.bonusComponent.setBoosterName(this.boosterName);
        this.bonusComponent.setCount(this.amount);

        const binder = Binder.getInstance();
        // this._actionProvider = binder.resolve<IAddActionObserverGetCount>("ISetAddActionObserverGetCount");
        // this._setInputMode = binder.resolve<ISetInputMode>("ISetInputMode");
        this.setUpAction();

        // this._actionProvider.addAction(this._action, this.amount);
        // this._actionProvider.addObserver(this);
    }

    setUpAction() {

    }

    // setInputMode(action: IAction): IInputMode {
    //     return null;
    // }

    // setBooster() {
    //     this._setInputMode.setMode(this.setInputMode(this._action));
    // }

    // notified(): void {
    //     this.bonusComponent.setCount(this._actionProvider.getCount(this._action));
    // }
}

