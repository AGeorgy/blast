import { _decorator, Component, Node, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ProgressComponent')
export class ProgressComponent extends Component {
    @property(ProgressBar)
    progress: ProgressBar = null!;

    start() {

    }

    update(deltaTime: number) {

    }
}

