import { ISlotStore } from "./ISlotStore";
import { Slot } from "./Model/Slot";

export class SlotStore implements ISlotStore {
    private _slots: Map<string, Slot>;
    private _posSlotIdMap: Map<string, string>;

    constructor() {
        this._slots = new Map<string, Slot>();
        this._posSlotIdMap = new Map<string, string>();
    }

    createSlot(slot: Slot, x: number, y: number): void {
        this._slots.set(slot.id, slot);
        this._posSlotIdMap.set(this.posToKey(x, y), slot.id);
    }

    getAllSlotIds(): string[] {
        return Array.from(this._slots.keys());
    }

    updateSlot(slot: Slot): string {
        this._slots.set(slot.id, slot);
        return slot.id;
    }

    getSlot(slotId: string): Slot {
        return this._slots.get(slotId);
    }

    getSlotId(x: number, y: number): string {
        return this._posSlotIdMap.get(this.posToKey(x, y));
    }

    private posToKey(x: number, y: number): string {
        return x + "_" + y;
    }
}