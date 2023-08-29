import { _decorator, CCFloat, Component, instantiate, Node, Prefab, Sprite, tween, Vec3 } from 'cc';
import { IReadTile } from '../Game/Board/IReadTile';
const { ccclass, property } = _decorator;

@ccclass('TileComponent')
export class TileComponent extends Component {
    @property(CCFloat)
    moveDuration: number = 0.7;

    private static _removedTiles: TileComponent[] = [];
    private _model: IReadTile;

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

    // start() {
    // }

    init(model: IReadTile) {
        this._model = model;

        this.getComponent(Sprite).color = this._model.color;
    }

    pool() {
        this.node.parent = null;
        this.enabled = false;
        TileComponent._removedTiles.push(this);
    }

    moveTo(x: number, y: number) {
        tween(this.node)
            .to(this.moveDuration, { position: new Vec3(x, y, 0) })
            .start();
        // let moveTween = tween(this.node)
        //     .to(this.moveDuration, { position: new Vec3(x, y, 0) })

        // tween(this.node).parallel(moveTween).start();
    }
}