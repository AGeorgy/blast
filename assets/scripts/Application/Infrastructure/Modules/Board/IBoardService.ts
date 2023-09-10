import { Board } from "./Model/Board";
import { Slot } from "./Model/Slot";

export interface IBoardService {
    removeRowSlots(slotId: string): void;
    removeColumnSlots(slotId: string): void;
    removeSlotsById(slotIdsToRemove: string[]): void;
    getSlotByPos(x: number, y: number): Slot;
    clearBoard(): void;
    getSlotById(slotId: string): Slot;
    getBoard(): Board;
    removeSlots(slotsToRemove: { x: number, y: number }[]): string[];
    fillBoard(): void;
    exchangeTiles(slotId1: string, slotId2: string): string[];
    shuffle(): string[];
    shiftDown(): void;
}