import { Slot } from "./Model/Slot";

export interface ISlotStore {
    getAllSlotIds(): string[];
    updateSlot(slot: Slot): string;
    getSlot(slotId: string): Slot;
    getSlotId(x: number, y: number): string;
}