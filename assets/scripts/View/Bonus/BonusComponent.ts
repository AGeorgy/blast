import { _decorator, Button, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BonusComponent')
export class BonusComponent extends Component {
    @property(Button)
    button: Button = null!;
    @property(Label)
    nameText: Label = null!;
    @property(Label)
    countText: Label = null!;

    onLoad() {
        if (!this.nameText) {
            throw new Error('nameText is null');
        }
        if (!this.countText) {
            throw new Error('countText is null');
        }

    }

    setBoosterName(name: string) {
        this.nameText.string = name;
    }

    setCount(count: number) {
        this.countText.string = count.toString();
        this.button.interactable = count > 0;
    }
}

