export interface IActionResult {
    readonly executedCells: { x: number, y: number }[];
    readonly isExecuted: boolean;
}