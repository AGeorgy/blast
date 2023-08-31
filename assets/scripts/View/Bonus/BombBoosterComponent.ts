import { _decorator, CCInteger, CCString, Component, Label, Node } from 'cc';
import { IAction } from '../../Game/Action/IAction';
import { ActioBomb } from '../../Game/Action/ActioBomb';
import { BonusComponent } from './BonusComponent';
import { Binder } from '../../Game/Binder';
import { ISetAction } from '../../Game/Action/ISetAction';
const { ccclass, property } = _decorator;

@ccclass('BombBoosterComponent')
export class BombBoosterComponent extends Component {
    @property(CCString)
    boosterName: string = '';
    @property(CCInteger)
    amount: number = 2;
    @property(CCInteger)
    radius: number = 2;
    @property(BonusComponent)
    bonusComponent: BonusComponent = null!;

    private _action: IAction;
    private _setAction: ISetAction;
    private _countLeft: number;

    onLoad() {
        if (!this.bonusComponent) {
            throw new Error('bonusComponent is null');
        }
        this.bonusComponent.setBoosterName(this.boosterName);
        this.bonusComponent.setCount(this.amount);

        const binder = Binder.getInstance();
        this._setAction = binder.resolve<ISetAction>("ISetAction");

        this._action = new ActioBomb(this.radius);
        this._countLeft = this.amount;
    }

    setBooster() {
        this._setAction.setAction(this._action);
        this._countLeft--;
        this.bonusComponent.setCount(this._countLeft);
    }
}

