import { Slot } from "./Model/Slot";

export interface ISlotStore {
    createSlot(slot: Slot, x: number, y: number): void;
    getAllSlotIds(): string[];
    updateSlot(slot: Slot): string;
    updateSlotPos(slotId: string, x: number, y: number): void;
    getSlot(slotId: string): Slot;
    getSlotId(x: number, y: number): string;
}