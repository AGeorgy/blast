import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BonusComponent')
export class BonusComponent extends Component {
    @property(Label)
    nameText: Label = null!;
    @property(Label)
    countText: Label = null!;

    start() {

    }

    update(deltaTime: number) {

    }

    onClick() {

    }
}

