export interface IBoardController {
    reset(): void;
    shuffle(): void;
    performeCelAction(x: number, y: number): void;
}