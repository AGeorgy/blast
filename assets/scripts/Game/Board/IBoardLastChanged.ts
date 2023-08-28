import { IReadTile } from "./IReadTile";

export interface IBoardLastChanged {
    readonly lastChangedTiles: { change: TilesChange, tile: IReadTile }[];
}

export enum TilesChange {
    Added,
    Removed,
    Moved
}