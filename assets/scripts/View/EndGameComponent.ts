import { _decorator, Component, Label } from 'cc';
import { Binder } from '../Game/Binder';
import { EndGameState, IEndGame } from '../Game/Board/IEndGame';
const { ccclass, property } = _decorator;

@ccclass('EndGameComponent')
export class EndGameComponent extends Component {
    @property(Label)
    endGameState: Label = null!;

    private _endGameChecker: IEndGame;

    onLoad() {
        if (!this.endGameState) {
            throw new Error('endGameState is null');
        }

        const binder = Binder.getInstance();
        this._endGameChecker = binder.resolve<IEndGame>("IEndGame");
    }

    start() {
        switch (this._endGameChecker.endGameState) {
            case EndGameState.Lose:
                this.endGameState.string = "You lost";
                break;
            case EndGameState.Win:
                this.endGameState.string = "You win";
                break;
        }
    }
}