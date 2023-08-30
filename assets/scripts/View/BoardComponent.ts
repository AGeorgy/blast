import { _decorator, Component, instantiate, math, Node, Prefab, UITransform } from 'cc';
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
    private _tiles: Map<number, TileComponent> = new Map<number, TileComponent>();
    private _transform: UITransform;
    private _tileWidth: number;
    private _tileHeight: number;

    start() {
        if (!this.tilePrefab) {
            throw new Error('Prefab is null');
        }

        this._transform = this.getComponent(UITransform);
        this._tiles = new Map<number, TileComponent>();
        const binder = Binder.getInstance();
        this._board = binder.resolve<IBoardDataAndAddNotifier>("IBoardDataAndAddNotifier");

        this.adjustSize();

        this._board.addObserver(this);
    }

    adjustSize() {
        const squareTileSize = math.bits.min(this._transform.contentSize.width / this._board.xMax, this._transform.contentSize.height / this._board.yMax);
        this._transform.contentSize = new math.Size(squareTileSize * this._board.xMax, squareTileSize * this._board.yMax);

        this._tileWidth = squareTileSize;
        this._tileHeight = squareTileSize;
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
                    tileNode.pool();
                    this._tiles.delete(tileModel.id);
                });
                break;
            case TilesChange.Added:
                console.log("BoardComponent updateTiles: Added");
                lastChanges.tiles.forEach(tileModel => {
                    const tileNode = TileComponent.getPooledTileOrInstantiate(this.tilePrefab);
                    this.setTileComponent(tileModel, tileNode);
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
        }
    }

    private setTileComponent(tileModel: IReadTile, tileNode: TileComponent): void {
        this._tiles[tileModel.id] = tileNode;
        tileNode.enabled = true;
        tileNode.node.parent = this.node;
        tileNode.init(tileModel)

        this.setTileSize(tileNode);

        const position = this.transformGridToUiPosition(tileModel.x, tileModel.y);
        console.log("BoardComponent setTileComponent: " + position.x + ", " + position.y);
        tileNode.node.setPosition(position.x, position.y);
        tileNode.moveTo(position.x, this.getUiYPosition(position.y));
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

