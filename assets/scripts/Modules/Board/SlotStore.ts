import { ISlotStore } from "../../Modules/Board/ISlotStore";
import { Slot } from "../../Modules/Board/Model/Slot";

export class SlotStore implements ISlotStore {
    private _slots: Map<string, Slot>;

    constructor() {
        this._slots = new Map<string, Slot>();
    }

    getAllSlotIds(): string[] {
        return Array.from(this._slots.keys());
    }

    updateSlot(slot: Slot): string {
        throw new Error("Method not implemented.");
    }

    getSlot(slotId: string): Slot {
        throw new Error("Method not implemented.");
    }

    getSlotId(x: number, y: number): string {
        throw new Error("Method not implemented.");
    }

}