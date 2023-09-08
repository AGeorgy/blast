import { Slot } from "./Model/Slot";

export interface ISlotStore {
    createSlot(slot: Slot, x: number, y: number): void;
    getAllSlotIds(): string[];
    updateSlot(slot: Slot): string;
    getSlot(slotId: string): Slot;
    getSlotId(x: number, y: number): string;
}