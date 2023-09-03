
export interface IPerformAction {
    performActionOnCellAt(positions: { x: number, y: number }[]): void;
}