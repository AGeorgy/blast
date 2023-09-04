import { _decorator, CCInteger } from 'cc';
import { IAction } from '../../Game/Action/IAction';
import { ActionBomb as ActionBomb } from '../../Game/Action/ActionBomb';
import { HoldActionClickInputMode } from '../../Game/InputMode/HoldActionClickInputMode';
import { BaseBoosterComponent } from './BaseBoosterComponent';
import { IInputMode } from '../../Game/InputMode/IInputMode';
const { ccclass, property } = _decorator;

@ccclass('BombBoosterComponent')
export class BombBoosterComponent extends BaseBoosterComponent {
    @property(CCInteger)
    radius: number = 2;

    setUpAction() {
        this._action = new ActionBomb(this.radius);
    }

    setInputMode(action: IAction): IInputMode {
        return new HoldActionClickInputMode(this._action);
    }
}