import { _decorator } from 'cc';
import { IAction } from '../../Game/Action/IAction';
import { BaseBoosterComponent } from './BaseBoosterComponent';
import { IInputMode } from '../../Game/InputMode/IInputMode';
import { ActionTeleport } from '../../Game/Action/ActionTeleport';
import { DoubleClickInputMode } from '../../Game/InputMode/DoubleClickInputMode';
const { ccclass } = _decorator;

@ccclass('TeleportBoosterComponent')
export class TeleportBoosterComponent extends BaseBoosterComponent {

    setUpAction() {
        this._action = new ActionTeleport();
    }

    setInputMode(action: IAction): IInputMode {
        return new DoubleClickInputMode(this._action);
    }
}