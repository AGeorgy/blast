import { IReadTile } from "./IReadTile";

export interface IBoardLastChanged {
    readonly lastChangedTiles: { change: TilesChange, tiles: IReadTile[] };
}

export enum TilesChange {
    Added,
    Removed,
    Moved
}