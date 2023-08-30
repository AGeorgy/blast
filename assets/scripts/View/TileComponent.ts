import { _decorator, CCFloat, Component, instantiate, Node, Prefab, Sprite, tween, Vec3 } from 'cc';
import { IReadTile } from '../Game/Board/IReadTile';
import { Binder } from '../Game/Binder';
import { ISetAndPerformeAction } from '../Game/Action/ISetAndPerformeAction';
const { ccclass, property } = _decorator;

@ccclass('TileComponent')
export class TileComponent extends Component {
    @property(CCFloat)
    moveDuration: number = 0.7;

    private static _removedTiles: TileComponent[] = [];
    private _model: IReadTile;
    private _sprite: Sprite;
    private _performAction: ISetAndPerformeAction;

    static getPooledTileOrInstantiate(prefab: Prefab): TileComponent {
        let tileComponent: TileComponent = null;
        if (TileComponent._removedTiles.length > 0) {
            tileComponent = this._removedTiles.pop();
        }
        else {
            let tileNode = instantiate(prefab);
            tileComponent = tileNode.getComponent(TileComponent);
        }
        return tileComponent;
    }

    start() {
        const sprite = this.getComponent(Sprite);
        if (sprite) {
            this._sprite = sprite;
        } else {
            console.error('TileComponent init: Sprite component not found');
        }

        const binder = Binder.getInstance();
        this._performAction = binder.resolve<ISetAndPerformeAction>("ISetAndPerformeAction");
    }

    init(model: IReadTile) {
        this._model = model;

        this._sprite.color = this._model.color;
    }

    pool() {
        this.node.parent = null;
        TileComponent._removedTiles.push(this);
        this.node.active = false;
    }

    moveTo(x: number, y: number) {
        tween(this.node)
            .to(this.moveDuration, { position: new Vec3(x, y, 0) })
            .start();
    }

    onTileClicked() {
        console.log('TileComponent onTileClicked');
        this._performAction.performActionOnCellAt(this._model.x, this._model.y);
    }
}