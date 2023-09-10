import { _decorator, Color, Component, Layout, math, Node, Prefab, UITransform } from 'cc';
import { TileComponent } from './TileComponent';
// import { Binder } from '../Game/Binder';
// import { IBoardDataAndAddNotifier } from '../Game/Board/IBoardDataAndAddNotifier';
// import { IObserver } from '../API/IObserver';
// import { TilesChange } from '../Game/Board/IBoardLastChanged';
// import { IReadTile } from '../Game/Board/IReadTile';
import { ObjectPool } from './ObjectPool/ObjectPool';
import { Application } from '../Application/Application';
import { TilesFilledSignal } from '../Application/FilledBoardHandler';
import { BoardReadySignal } from '../Application/Infrastructure/Modules/Board/FilledBoardSignal';
import { TilesRemovedSignal } from '../Application/SlotsRemovedHandler';
import { TilesMovedSignal } from '../Application/SlotsMovedHandler';
const { ccclass, property } = _decorator;

@ccclass('BoardComponent')
export class BoardComponent extends Component /* implements IObserver */ {
    @property(Prefab)
    tilePrefab: Prefab = null!;
    @property(Node)
    content: Node = null!;

    // private _board: IBoardDataAndAddNotifier;
    private _tiles: Map<string, TileComponent> = new Map<string, TileComponent>();
    private _contentTransform: UITransform;
    private _tileWidth: number;
    private _tileHeight: number;
    private _pool: ObjectPool<TileComponent>;
    private _xMax: number;
    private _yMax: number;

    onLoad() {
        if (!this.tilePrefab) {
            throw new Error('Prefab is null');
        }

        this._contentTransform = this.content.getComponent(UITransform);
        // const binder = Binder.getInstance();
        // this._board = binder.resolve<IBoardDataAndAddNotifier>("IBoardDataAndAddNotifier");

        // console.log("BoardComponent onLoad");
        Application.instance.boardReadySignal.subscribe(this.onBoardReady.bind(this));
        Application.instance.tilesFilledSignal.subscribe(this.onTilesFilled.bind(this));
        Application.instance.tilesRemovedSignal.subscribe(this.onTilesRemoved.bind(this));
        Application.instance.tilesMovedSignal.subscribe(this.onTilesMoved.bind(this));

        // this._board.addObserver(this);
    }

    private onTilesMoved(data: TilesMovedSignal): void {
        console.log("BoardComponent onTilesMoved", data);

        data.data.forEach(tileData => {
            const tileNode = this._tiles.get(tileData.tileId);
            const position = this.transformGridToUiPosition(tileData.x, tileData.y);
            tileNode.moveTo(position.x, this.getUiYPosition(position.y));
        });
    }

    private onTilesRemoved(data: TilesRemovedSignal): void {
        console.log("BoardComponent onTilesRemoved", data);

        data.tileIds.forEach(tileId => {
            const tileNode = this._tiles.get(tileId);
            tileNode.pool(this._pool);
            this._tiles.delete(tileId);
        });
    }

    private onBoardReady(data: BoardReadySignal): void {
        console.log("BoardComponent onBoardReady", data);
        this._xMax = data.xMax;
        this._yMax = data.yMax;
        this._pool = new ObjectPool(this.tilePrefab, this.content, this._xMax * this._yMax, "TileComponent");

        this.adjustSize();
    }

    private onTilesFilled(data: TilesFilledSignal): void {
        console.log("BoardComponent onTilesFilled", data);
        data.tilesFilled.forEach(tileData => {
            let tileNode = this._pool.borrow();
            this.setTileComponent(tileData.tileId, tileData.color, tileNode);

            const position = this.transformGridToUiPosition(tileData.x, tileData.y);
            // console.log("BoardComponent setTileComponent: " + position.x + ", " + position.y);
            tileNode.node.setPosition(position.x, position.y);
            tileNode.moveTo(position.x, this.getUiYPosition(position.y));
        });
    }

    private adjustSize() {
        const squareTileSize = math.bits.min(this._contentTransform.contentSize.width / this._xMax, this._contentTransform.contentSize.height / this._yMax);
        this._contentTransform.contentSize = new math.Size(squareTileSize * this._xMax + 0.1, squareTileSize * this._yMax);

        this._tileWidth = squareTileSize;
        this._tileHeight = squareTileSize;
        this.getComponents(Layout).forEach(layout => {
            layout.updateLayout();
        });
    }

    // notified(): void {
    //     console.log("BoardComponent notified");

    //     this.updateTiles();
    // }

    // private updateTiles() {
    //     const lastChanges = this._board.lastChangedTiles;

    //     switch (lastChanges.change) {
    //         case TilesChange.Removed:
    //             console.log("BoardComponent updateTiles: Removed");
    //             lastChanges.tiles.forEach(tileModel => {
    //                 const tileNode = this._tiles.get(tileModel.id);
    //                 tileNode.pool(this._pool);
    //                 this._tiles.delete(tileModel.id);
    //             });
    //             break;
    //         case TilesChange.Added:
    //             console.log("BoardComponent updateTiles: Added");
    //             lastChanges.tiles.forEach(tileModel => {
    //                 let tileNode = this._pool.borrow();
    //                 this.setTileComponent(tileModel, tileNode);

    //                 const position = this.transformGridToUiPosition(tileModel.x, tileModel.y);
    //                 console.log("BoardComponent setTileComponent: " + position.x + ", " + position.y);
    //                 tileNode.node.setPosition(position.x, position.y);
    //                 tileNode.moveTo(position.x, this.getUiYPosition(position.y));
    //             });
    //             break;
    //         case TilesChange.Moved:
    //             console.log("BoardComponent updateTiles: Moved");
    //             lastChanges.tiles.forEach(tileModel => {
    //                 const tileNode = this._tiles.get(tileModel.id);
    //                 const position = this.transformGridToUiPosition(tileModel.x, tileModel.y);
    //                 tileNode.moveTo(position.x, this.getUiYPosition(position.y));
    //             });
    //             break;
    //         case TilesChange.Set:
    //             console.log("BoardComponent updateTiles: Set");
    //             lastChanges.tiles.forEach(tileModel => {
    //                 let tileNode = this._pool.borrow();
    //                 this.setTileComponent(tileModel, tileNode);

    //                 const position = this.transformGridToUiPosition(tileModel.x, tileModel.y);
    //                 tileNode.node.setPosition(position.x, this.getUiYPosition(position.y));
    //                 tileNode.appear();
    //             });
    //             break;
    //     }

    // }

    private setTileComponent(tileId: string, color: Color, tileNode: TileComponent): void {
        this._tiles.set(tileId, tileNode);
        tileNode.node.parent = this.content;
        tileNode.init(tileId, color)

        this.setTileSize(tileNode);
    }

    private transformGridToUiPosition(x: number, y: number): { x: number, y: number } {
        let xPosition = x * this._tileWidth + this._tileWidth / 2;
        let yPosition = y * this._tileHeight + this._tileHeight / 2;
        // console.log("BoardComponent transformGridToUiPosition: " + xPosition + ", " + yPosition);
        return { x: xPosition, y: yPosition };
    }

    private setTileSize(tile: TileComponent): void {
        // console.log("BoardComponent setTileSize: " + this._tileWidth + ", " + this._tileHeight);
        let tileTransform = tile.getComponent(UITransform);
        tileTransform.height = this._tileHeight;
        tileTransform.width = this._tileWidth;
    }

    private getUiYPosition(y: number): number {
        return y - this._yMax * this._tileHeight;
    }
}

