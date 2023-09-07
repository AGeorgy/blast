export interface IBoardService {
    clearBoard(): void;
    createBoard(xMax: number, yMax: number): void;
    getSlotId(x: number, y: number): string;
    // setTile(tile: ITile): void;
    removeSlots(slotsToRemove: { x: number, y: number }[]): string[];
    fillBoard(): string[];
    exchangeTiles(slotId1: string, slotId2: string): string[];
    shuffle(): string[];
    shiftDown(): string[];
}