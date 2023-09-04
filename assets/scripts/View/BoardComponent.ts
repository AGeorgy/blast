import { _decorator, Component, Layout, math, Node, Prefab, UITransform } from 'cc';
import { TileComponent } from './TileComponent';
import { Binder } from '../Game/Binder';
import { IBoardDataAndAddNotifier } from '../Game/Board/IBoardDataAndAddNotifier';
import { IObserver } from '../Game/Board/IObserver';
import { TilesChange } from '../Game/Board/IBoardLastChanged';
import { IReadTile } from '../Game/Board/IReadTile';
import { ObjectPool } from './ObjectPool/ObjectPool';
const { ccclass, property } = _decorator;

@ccclass('BoardComponent')
export class BoardComponent extends Component implements IObserver {
    @property(Prefab)
    tilePrefab: Prefab = null!;
    @property(Node)
    content: Node = null!;

    private _board: IBoardDataAndAddNotifier;
    private _tiles: Map<number, TileComponent> = new Map<number, TileComponent>();
    private _contentTransform: UITransform;
    private _tileWidth: number;
    private _tileHeight: number;
    private _pool: ObjectPool<TileComponent>;

    onLoad() {
        if (!this.tilePrefab) {
            throw new Error('Prefab is null');
        }

        this._contentTransform = this.content.getComponent(UITransform);
        const binder = Binder.getInstance();
        this._board = binder.resolve<IBoardDataAndAddNotifier>("IBoardDataAndAddNotifier");

        this._pool = new ObjectPool(this.tilePrefab, this.content, this._board.xMax * this._board.yMax, "TileComponent");

        this.adjustSize();

        this._board.addObserver(this);
    }

    adjustSize() {
        const squareTileSize = math.bits.min(this._contentTransform.contentSize.width / this._board.xMax, this._contentTransform.contentSize.height / this._board.yMax);
        this._contentTransform.contentSize = new math.Size(squareTileSize * this._board.xMax + 0.1, squareTileSize * this._board.yMax);

        this._tileWidth = squareTileSize;
        this._tileHeight = squareTileSize;
        this.getComponents(Layout).forEach(layout => {
            layout.updateLayout();
        });
    }

    notified(): void {
        console.log("BoardComponent notified");

        this.updateTiles();
    }

    private updateTiles() {
        const lastChanges = this._board.lastChangedTiles;

        switch (lastChanges.change) {
            case TilesChange.Removed:
                console.log("BoardComponent updateTiles: Removed");
                lastChanges.tiles.forEach(tileModel => {
                    const tileNode = this._tiles.get(tileModel.id);
                    tileNode.pool(this._pool);
                    this._tiles.delete(tileModel.id);
                });
                break;
            case TilesChange.Added:
                console.log("BoardComponent updateTiles: Added");
                lastChanges.tiles.forEach(tileModel => {
                    let tileNode = this._pool.borrow();
                    this.setTileComponent(tileModel, tileNode);

                    const position = this.transformGridToUiPosition(tileModel.x, tileModel.y);
                    console.log("BoardComponent setTileComponent: " + position.x + ", " + position.y);
                    tileNode.node.setPosition(position.x, position.y);
                    tileNode.moveTo(position.x, this.getUiYPosition(position.y));
                });
                break;
            case TilesChange.Moved:
                console.log("BoardComponent updateTiles: Moved");
                lastChanges.tiles.forEach(tileModel => {
                    const tileNode = this._tiles.get(tileModel.id);
                    const position = this.transformGridToUiPosition(tileModel.x, tileModel.y);
                    tileNode.moveTo(position.x, this.getUiYPosition(position.y));
                });
                break;
            case TilesChange.Set:
                console.log("BoardComponent updateTiles: Set");
                lastChanges.tiles.forEach(tileModel => {
                    let tileNode = this._pool.borrow();
                    this.setTileComponent(tileModel, tileNode);

                    const position = this.transformGridToUiPosition(tileModel.x, tileModel.y);
                    tileNode.node.setPosition(position.x, this.getUiYPosition(position.y));
                    tileNode.appear();
                });
                break;
        }

    }

    private setTileComponent(tileModel: IReadTile, tileNode: TileComponent): void {
        this._tiles.set(tileModel.id, tileNode);
        tileNode.node.parent = this.content;
        tileNode.init(tileModel)

        this.setTileSize(tileNode);
    }

    private transformGridToUiPosition(x: number, y: number): { x: number, y: number } {
        let xPosition = x * this._tileWidth + this._tileWidth / 2;
        let yPosition = y * this._tileHeight + this._tileHeight / 2;
        console.log("BoardComponent transformGridToUiPosition: " + xPosition + ", " + yPosition);
        return { x: xPosition, y: yPosition };
    }

    private setTileSize(tile: TileComponent): void {
        console.log("BoardComponent setTileSize: " + this._tileWidth + ", " + this._tileHeight);
        let tileTransform = tile.getComponent(UITransform);
        tileTransform.height = this._tileHeight;
        tileTransform.width = this._tileWidth;
    }

    private getUiYPosition(y: number): number {
        return y - this._board.yMax * this._tileHeight;
    }

}

