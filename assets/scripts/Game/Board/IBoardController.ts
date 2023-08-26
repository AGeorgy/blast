export interface IBoardController {
    resetBoard(): void;
    // populateBoard(): void;
    performeCelAction(x: number, y: number): void;
}