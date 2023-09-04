import { _decorator, CCFloat, Component, instantiate, Node, Prefab, Sprite, tween, Vec3 } from 'cc';
import { IReadTile } from '../Game/Board/IReadTile';
import { Binder } from '../Game/Binder';
import { IReturn } from './ObjectPool/IReturn';
import { ITileClick } from '../Game/InputMode/ITileClick';
import { ISetInputMode } from '../Game/InputMode/ISetInputMode';
import { HoldActionClickInputMode } from '../Game/InputMode/HoldActionClickInputMode';
const { ccclass, property } = _decorator;

@ccclass('TileComponent')
export class TileComponent extends Component {
    @property(CCFloat)
    moveDuration: number = 0.7;
    @property(CCFloat)
    destroyDuration: number = 0.2;

    private _model: IReadTile;
    private _sprite: Sprite;
    private _tileClick: ITileClick;
    private _setInputMode: ISetInputMode;

    onLoad() {
        const sprite = this.getComponent(Sprite);
        if (sprite) {
            this._sprite = sprite;
        } else {
            console.error('TileComponent init: Sprite component not found');
        }

        const binder = Binder.getInstance();
        this._tileClick = binder.resolve<ITileClick>("ITileClick");
        this._setInputMode = binder.resolve<ISetInputMode>("ISetInputMode");
    }

    init(model: IReadTile) {
        this._model = model;
        this.node.active = true;
        this._sprite.color = this._model.color;
    }

    pool(pool: IReturn<TileComponent>) {
        tween(this.node)
            .to(this.destroyDuration, { scale: new Vec3(0, 0, 0) })
            .call(() => {
                this.node.scale = new Vec3(1, 1, 1);
                pool.return(this);
            })
            .start();
    }

    moveTo(x: number, y: number) {
        tween(this.node)
            .to(this.moveDuration, { position: new Vec3(x, y, 0) })
            .start();
    }

    appear() {
        this.node.scale = new Vec3(0, 0, 0);
        tween(this.node)
            .to(this.moveDuration, { scale: new Vec3(1, 1, 1) })
            .start();
    }

    onTileClicked() {
        console.log('TileComponent onTileClicked');
        this._setInputMode.setMode(new HoldActionClickInputMode(this._model.action));
        this._tileClick.tileClick(this._model.x, this._model.y);
    }
}