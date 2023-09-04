import { _decorator, CCInteger } from 'cc';
import { IAction } from '../../Game/Action/IAction';
import { HoldActionClickInputMode } from '../../Game/InputMode/HoldActionClickInputMode';
import { BaseBoosterComponent } from './BaseBoosterComponent';
import { IInputMode } from '../../Game/InputMode/IInputMode';
import { ActionSuper } from '../../Game/Action/ActionSuper';
const { ccclass, property } = _decorator;

@ccclass('SuperBoosterComponent')
export class SuperBoosterComponent extends BaseBoosterComponent {
    @property(CCInteger)
    bunchSize: number = 2;
    @property(CCInteger)
    radius: number = 2;

    setUpAction() {
        this._action = new ActionSuper(this.bunchSize, this.radius);
    }

    setInputMode(action: IAction): IInputMode {
        return new HoldActionClickInputMode(this._action);
    }
}