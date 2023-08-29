import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { IReadTile } from '../Game/Board/IReadTile';
const { ccclass, property } = _decorator;

@ccclass('TileComponent')
export class TileComponent extends Component {
    private static _removedTiles: TileComponent[] = [];
    private _model: IReadTile;

    static getPooledTileOrInstantiate(prefab: Prefab): TileComponent {
        let tileNode: TileComponent = null;
        if (TileComponent._removedTiles.length > 0) {
            tileNode = this._removedTiles.pop();
        }
        else {
            tileNode = instantiate(prefab).getComponent(TileComponent);
        }
        return tileNode;
    }

    start() {

    }

    init(model: IReadTile) {
        this._model = model;
    }

    pool() {
        this.node.parent = null;
        this.enabled = false;
        TileComponent._removedTiles.push(this);
    }

    moveTo(x: number, y: number) {
        throw new Error('Method not implemented.');
    }

    // update(deltaTime: number) {

    // }
}