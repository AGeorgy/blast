
import { _decorator, Component } from 'cc';
import { Binder } from '../Game/Binder';
import { GameState, ISetState } from '../Game/ISetState';
const { ccclass, property } = _decorator;

@ccclass('PlayButtonComponent')
export class PlayButtonComponent extends Component {
    private _setState: ISetState;

    onLoad() {
        const binder = Binder.getInstance();
        this._setState = binder.resolve<ISetState>("ISetState");

    }

    setGameStateToPlay() {
        this._setState.setStateTo(GameState.Start);
    }
}

