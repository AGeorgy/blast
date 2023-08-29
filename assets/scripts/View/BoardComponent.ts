import { _decorator, Component, instantiate, Node, Prefab, UITransform } from 'cc';
import { TileComponent } from './TileComponent';
import { Binder } from '../Game/Binder';
import { IBoardDataAndAddNotifier } from '../Game/Board/IBoardDataAndAddNotifier';
import { IObserver } from '../Game/Board/IObserver';
import { TilesChange } from '../Game/Board/IBoardLastChanged';
import { IReadTile } from '../Game/Board/IReadTile';
const { ccclass, property } = _decorator;

@ccclass('BoardComponent')
export class BoardComponent extends Component implements IObserver {
    @property(Prefab)
    tilePrefab: Prefab = null!;

    private _board: IBoardDataAndAddNotifier;
    private _tiles: Map<number, TileComponent>;
    private _transform: UITransform;
    private _tileWidth: number;
    private _tileHeight: number;

    start() {
        this._transform = this.getComponent(UITransform);
        this._tiles = new Map<number, TileComponent>();
        this._board = Binder.getInstance().resolve<IBoardDataAndAddNotifier>("Board");
        this._board.addObserver(this);

        this._tileWidth = this._transform.contentSize.width / this._board.xMax;
        this._tileHeight = this._transform.contentSize.height / this._board.yMax;

    }

    notified(): void {
        console.log("BoardComponent notified");

        this.updateTiles();
    }

    private updateTiles() {
        let lastChanges = this._board.lastChangedTiles;

        if (lastChanges.change == TilesChange.Removed) {
            lastChanges.tiles.forEach(tileModel => {
                let tileNode = this._tiles.get(tileModel.id);
                tileNode.pool();
                this._tiles.delete(tileModel.id);
            });
        }
        else if (lastChanges.change == TilesChange.Added) {
            lastChanges.tiles.forEach(tileModel => {
                this.setTileComponent(tileModel, TileComponent.getPooledTileOrInstantiate(this.tilePrefab));
            });
        }
        else if (lastChanges.change == TilesChange.Moved) {
            lastChanges.tiles.forEach(tileModel => {
                let tileNode = this._tiles.get(tileModel.id);
                tileNode.moveTo(tileModel.x, tileModel.y)
            });
        }
    }

    private transformGridToUiPosition(x: number, y: number): { x: number, y: number } {
        let xPosition = x * this._tileWidth;
        let yPosition = y * this._tileHeight;
        return { x: xPosition, y: yPosition };
    }

    private setTileComponent(tileModel: IReadTile, tileNode: TileComponent): void {
        this._tiles[tileModel.id] = tileNode;
        tileNode.enabled = true;
        tileNode.node.parent = this.node;
        tileNode.init(tileModel)

        this.setTileSize(tileNode);

        let position = this.transformGridToUiPosition(tileModel.x, tileModel.y);
        tileNode.node.setPosition(position.x, position.y * -1);
        tileNode.moveTo(position.x, position.y);
    }

    private setTileSize(tile: TileComponent): void {
        let tileTransform = tile.getComponent(UITransform);
        tileTransform.height = this._tileHeight;
        tileTransform.width = this._tileWidth;
    }
}

