import { IBoosterStore } from "./Modules/Booster/IBoosterStore";
import { Booster } from "./Modules/Booster/Model/Booster";

export class BoosterStore implements IBoosterStore {
    private _boosters: Map<string, Booster>

    constructor() {
        this._boosters = new Map<string, Booster>();
    }

    getBoosterById(boosterId: string): Booster {
        if (!this._boosters.has(boosterId)) {
            throw new Error(`Booster with id ${boosterId} not found`);
        }

        return this._boosters.get(boosterId);
    }
    getAllBoosterIds(): string[] {
        return Array.from(this._boosters.keys());
    }

}