import { Slot } from "./Model/Slot";

export interface ISlotStore {
    length: number;
    getAllSlotIds(): string[];
    getSlotIdByIndex(currentIndex: any): string;
    updateSlot(slot: Slot): string;
    getSlot(slotId: string): Slot;
    getSlotId(x: number, y: number): string;
}