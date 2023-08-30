import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StatsComponent')
export class StatsComponent extends Component {
    @property(Label)
    turns: Label = null!;
    @property(Label)
    score: Label = null!;

    start() {

    }

    update(deltaTime: number) {

    }
}

